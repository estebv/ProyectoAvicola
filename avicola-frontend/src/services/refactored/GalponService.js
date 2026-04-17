import { BaseService } from '../core/BaseService.js'
import { API_ENDPOINTS, CACHE_CONFIG } from '../types/index.js'
import { compositeValidators } from '../utils/validators.js'
import { domainFormatters } from '../utils/formatters.js'

/**
 * Servicio de Galpones - Refactorizado con arquitectura limpia
 * Hereda de BaseService para eliminar redundancias
 */
export class GalponService extends BaseService {
  constructor() {
    super('galpones', {
      defaultTTL: CACHE_CONFIG.DEFAULT_TTL,
      maxSize: 50 // Menos caché para galpones que cambian frecuentemente
    })
  }

  // ==================== MÉTODOS ESPECIALIZADOS ====================

  /**
   * Obtener galpones con capacidad disponible
   */
  async getWithCapacity(minCapacity = 1) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('disponibles', { minCapacity })),
      `galpones_disponibles_${minCapacity}`
    )
  }

  /**
   * Actualizar número de aves en galpón
   */
  async updateBirdCount(id, birdCount) {
    // Validar antes de enviar
    const validation = compositeValidators.galponForm({ numero_aves: birdCount })
    if (validation.numero_aves) {
      throw new Error(`Validación: ${validation.numero_aves}`)
    }

    return this._handleApiCall(
      this.api.patch(this._buildUrl(`${id}/aves`), { numero_aves: birdCount })
    )
  }

  /**
   * Obtener estadísticas de ocupación
   */
  async getOccupancyStats() {
    return this._handleApiCall(
      this.api.get(this._buildUrl('estadisticas/ocupacion')),
      'galpones_ocupacion_stats',
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  /**
   * Obtener galpones por rango de capacidad
   */
  async getByCapacityRange(minCapacity, maxCapacity) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('', { 
        minCapacity, 
        maxCapacity 
      })),
      `galpones_capacity_${minCapacity}_${maxCapacity}`
    )
  }

  // ==================== VALIDACIÓN ====================

  /**
   * Validar datos de galpón
   */
  validateGalponData(data) {
    return compositeValidators.galponForm(data)
  }

  /**
   * Verificar si un galpón puede recibir más aves
   */
  async canAcceptBirds(id, additionalBirds) {
    try {
      const galpon = await this.getById(id)
      if (!galpon) return { canAccept: false, reason: 'Galpón no encontrado' }
      
      const maxCapacity = 50000 // Máximo definido en reglas
      const currentBirds = galpon.numero_aves || 0
      const projectedBirds = currentBirds + additionalBirds
      
      return {
        canAccept: projectedBirds <= maxCapacity,
        current: currentBirds,
        projected: projectedBirds,
        maxCapacity,
        available: maxCapacity - currentBirds
      }
    } catch (error) {
      return { canAccept: false, reason: error.message }
    }
  }

  // ==================== UTILIDADES ====================

  /**
   * Formatear información de galpón para display
   */
  formatGalponDisplay(galpon) {
    if (!galpon) return null
    
    return {
      ...galpon,
      ocupacion: domainFormatters.birdDensity(
        galpon.numero_aves, 
        this._estimateGalponArea(galpon.numero_Galpon)
      ),
      estado: this._getGalponStatus(galpon.numero_aves),
      capacidadFormateada: `${galpon.numero_aves || 0} aves`
    }
  }

  /**
   * Estimar área del galpón (basado en número)
   */
  _estimateGalponArea(galponNumber) {
    // Lógica de negocio: galpones más grandes tienen números más altos
    const baseArea = 100 // m² base
    const increment = galponNumber * 20 // 20m² por galpón
    return baseArea + increment
  }

  /**
   * Determinar estado del galpón
   */
  _getGalponStatus(birdCount) {
    if (!birdCount || birdCount === 0) return 'vacío'
    if (birdCount < 100) return 'baja ocupación'
    if (birdCount < 1000) return 'ocupación normal'
    return 'alta ocupación'
  }

  // ==================== MÉTODOS DE LÓGICA DE NEGOCIO ====================

  /**
   * Transferir aves entre galpones
   */
  async transferBirds(fromId, toId, birdCount) {
    try {
      // Validar transferencia
      const [fromGalpon, toGalpon] = await Promise.all([
        this.getById(fromId),
        this.getById(toId)
      ])

      if (!fromGalpon || !toGalpon) {
        throw new Error('Uno o ambos galpones no existen')
      }

      if (fromGalpon.numero_aves < birdCount) {
        throw new Error('No hay suficientes aves en el galpón origen')
      }

      const canAccept = await this.canAcceptBirds(toId, birdCount)
      if (!canAccept.canAccept) {
        throw new Error(`Galpón destino no puede aceptar más aves: ${canAccept.reason}`)
      }

      // Ejecutar transferencia
      const transferData = {
        from: fromId,
        to: toId,
        birdCount,
        timestamp: new Date().toISOString()
      }

      return this._handleApiCall(
        this.api.post(this._buildUrl('transferir'), transferData)
      )
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error en transferencia de aves',
        'TRANSFER_BIRDS',
        { fromId, toId, birdCount }
      )
    }
  }

  /**
   * Obtener historial de ocupación de un galpón
   */
  async getOccupancyHistory(id, days = 30) {
    return this._handleApiCall(
      this.api.get(this._buildUrl(`${id}/historial`, { days })),
      `galpon_${id}_history_${days}`,
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  /**
   * Generar reporte de galpones
   */
  async generateReport(filters = {}) {
    try {
      const [galpones, stats] = await Promise.all([
        this.getAll(filters),
        this.getOccupancyStats()
      ])

      return {
        resumen: {
          total: galpones.length,
          ocupados: galpones.filter(g => g.numero_aves > 0).length,
          vacios: galpones.filter(g => !g.numero_aves || g.numero_aves === 0).length,
          totalAves: galpones.reduce((sum, g) => sum + (g.numero_aves || 0), 0)
        },
        estadisticas: stats,
        galpones: galpones.map(g => this.formatGalponDisplay(g)),
        fechaGeneracion: new Date().toISOString()
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error generando reporte de galpones',
        'GENERATE_REPORT',
        { filters }
      )
    }
  }
}

// Exportar instancia única para uso en toda la aplicación
export const galponService = new GalponService()
