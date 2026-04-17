import { BaseService } from '../core/BaseService.js'
import { API_ENDPOINTS, CACHE_CONFIG, RANGOS_DIAS } from '../types/index.js'
import { specificValidators } from '../utils/validators.js'
import { domainFormatters, numberFormatters } from '../utils/formatters.js'

/**
 * Servicio de Huevos - Refactorizado con arquitectura limpia
 * Optimizado para análisis de producción y estadísticas
 */
export class HuevosService extends BaseService {
  constructor() {
    super('huevos', {
      defaultTTL: CACHE_CONFIG.DEFAULT_TTL,
      maxSize: 100 // Más caché para datos de producción
    })
  }

  // ==================== MÉTODOS ESPECIALIZADOS ====================

  /**
   * Obtener producción diaria
   */
  async getProduccionDiaria(dias = RANGOS_DIAS.ULTIMA_SEMANA) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('produccion-diaria', { dias })),
      `huevos_produccion_diaria_${dias}`,
      CACHE_CONFIG.DASHBOARD_TTL
    )
  }

  /**
   * Obtener producción mensual
   */
  async getProduccionMensual(meses = 12) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('produccion-mensual', { meses })),
      `huevos_produccion_mensual_${meses}`,
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  /**
   * Obtener estadísticas de calidad
   */
  async getEstadisticasCalidad(idGalpon, dias = RANGOS_DIAS.ULTIMO_MES) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('calidad', { idGalpon, dias })),
      `huevos_calidad_${idGalpon}_${dias}`,
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  /**
   * Obtener tasa de producción (huevos/ave)
   */
  async getTasaProduccion(idGalpon, dias = RANGOS_DIAS.ULTIMA_SEMANA) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('tasa-produccion', { idGalpon, dias })),
      `huevos_tasa_${idGalpon}_${dias}`,
      CACHE_CONFIG.DASHBOARD_TTL
    )
  }

  /**
   * Obtener producción por calidad
   */
  async getProduccionPorCalidad(idGalpon, dias = RANGOS_DIAS.ULTIMO_MES) {
    return this._handleApiCall(
      this.api.get(this._buildUrl('por-calidad', { idGalpon, dias })),
      `huevos_por_calidad_${idGalpon}_${dias}`,
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  /**
   * Obtener resumen de producción
   */
  async getResumen(fechaInicio, fechaFin) {
    const cacheKey = `huevos_resumen_${fechaInicio}_${fechaFin}`
    return this._handleApiCall(
      this.api.get(this._buildUrl('resumen', { fechaInicio, fechaFin })),
      cacheKey,
      CACHE_CONFIG.STATISTICS_TTL
    )
  }

  // ==================== ANÁLISIS Y ESTADÍSTICAS ====================

  /**
   * Analizar tendencia de producción
   */
  async analizarTendencia(idGalpon, dias = RANGOS_DIAS.ULTIMO_TRIMESTRE) {
    try {
      const [produccion, tasa] = await Promise.all([
        this.getProduccionDiaria(dias),
        this.getTasaProduccion(idGalpon, dias)
      ])

      return {
        tendencia: this._calcularTendencia(produccion),
        tasaPromedio: this._calcularPromedio(tasa),
        proyeccion: this._proyectarProduccion(produccion),
        recomendaciones: this._generarRecomendaciones(produccion, tasa)
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error analizando tendencia de producción',
        'ANALYZE_TREND',
        { idGalpon, dias }
      )
    }
  }

  /**
   * Comparar producción entre galpones
   */
  async compararGalpones(idsGalpones, dias = RANGOS_DIAS.ULTIMA_SEMANA) {
    try {
      const promesas = idsGalpones.map(id => 
        this.getProduccionDiaria(dias).then(data => ({ idGalpon: id, data }))
      )
      
      const resultados = await Promise.all(promesas)
      
      return {
        comparativo: resultados.map(r => ({
          idGalpon: r.idGalpon,
          total: r.data.reduce((sum, d) => sum + (d.total_huevo || 0), 0),
          promedio: this._calcularPromedio(r.data.map(d => d.total_huevo || 0)),
          calidad: this._calcularCalidadPromedio(r.data)
        })),
        mejor: this._encontrarMejorGalpon(resultados),
        peor: this._encontrarPeorGalpon(resultados)
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error comparando producción de galpones',
        'COMPARE_GALPONES',
        { idsGalpones, dias }
      )
    }
  }

  /**
   * Optimizar recolección de huevos
   */
  async optimizarRecoleccion(idGalpon) {
    try {
      const [produccion, calidad] = await Promise.all([
        this.getProduccionDiaria(7), // Última semana
        this.getEstadisticasCalidad(idGalpon, 7)
      ])

      return {
        horarioRecomendado: this._determinarMejorHorario(produccion),
        frecuenciaOptima: this._calcularFrecuencia(produccion),
        calidadEsperada: calidad,
        estimacionDiaria: this._estimarRecoleccionDiaria(produccion)
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error optimizando recolección',
        'OPTIMIZE_COLLECTION',
        { idGalpon }
      )
    }
  }

  // ==================== VALIDACIÓN ====================

  /**
   * Validar datos de producción de huevos
   */
  validateHuevosData(data) {
    const errors = {}

    if (specificValidators.eggWeight(data.peso_huevo)) {
      errors.peso_huevo = specificValidators.eggWeight(data.peso_huevo)
    }

    if (specificValidators.eggQuality(data.calidad_huevo)) {
      errors.calidad_huevo = specificValidators.eggQuality(data.calidad_huevo)
    }

    if (!data.total_huevo || data.total_huevo < 0) {
      errors.total_huevo = 'El total de huevos debe ser un número positivo'
    }

    if (!data.fecha_puesta) {
      errors.fecha_puesta = 'La fecha de puesta es requerida'
    }

    return errors
  }

  // ==================== UTILIDADES DE LÓGICA DE NEGOCIO ====================

  /**
   * Calcular ingresos estimados
   */
  async calcularIngresos(idGalpon, dias = RANGOS_DIAS.ULTIMO_MES, preciosPorCalidad = {}) {
    try {
      const produccion = await this.getProduccionPorCalidad(idGalpon, dias)
      
      const precios = {
        1: preciosPorCalidad.extra || 0.50, // Extra
        2: preciosPorCalidad.primera || 0.40, // Primera
        3: preciosPorCalidad.segunda || 0.30, // Segunda
        4: preciosPorCalidad.tercera || 0.20, // Tercera
        5: preciosPorCalidad.industrial || 0.10 // Industrial
      }

      let ingresosTotales = 0
      const detallePorCalidad = {}

      Object.entries(produccion).forEach(([calidad, cantidad]) => {
        const precio = precios[calidad] || 0
        const ingresos = cantidad * precio
        ingresosTotales += ingresos
        
        detallePorCalidad[calidad] = {
          cantidad,
          precio,
          ingresos,
          calidad: domainFormatters.eggQuality(calidad)
        }
      })

      return {
        ingresosTotales: numberFormatters.currency(ingresosTotales),
        detallePorCalidad,
        periodo: `${dias} días`,
        promedioDiario: numberFormatters.currency(ingresosTotales / dias)
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error calculando ingresos',
        'CALCULATE_INCOME',
        { idGalpon, dias, preciosPorCalidad }
      )
    }
  }

  /**
   * Generar reporte de producción completo
   */
  async generarReporteCompleto(idGalpon, dias = RANGOS_DIAS.ULTIMO_MES) {
    try {
      const [
        produccionDiaria,
        produccionMensual,
        estadisticasCalidad,
        tasaProduccion,
        ingresos
      ] = await Promise.all([
        this.getProduccionDiaria(dias),
        this.getProduccionMensual(3),
        this.getEstadisticasCalidad(idGalpon, dias),
        this.getTasaProduccion(idGalpon, dias),
        this.calcularIngresos(idGalpon, dias)
      ])

      return {
        resumenEjecutivo: {
          periodoAnalizado: `${dias} días`,
          totalHuevos: produccionDiaria.reduce((sum, d) => sum + (d.total_huevo || 0), 0),
          calidadPromedio: this._calcularCalidadPromedio(produccionDiaria),
          tasaProduccionPromedio: this._calcularPromedio(tasaProduccion),
          ingresosEstimados: ingresos.ingresosTotales
        },
        tendencias: {
          produccion: this._calcularTendencia(produccionDiaria),
          calidad: this._analizarTendenciaCalidad(estadisticasCalidad),
          eficiencia: this._analizarEficiencia(tasaProduccion)
        },
        detalles: {
          produccionDiaria,
          estadisticasCalidad,
          distribucionCalidad: estadisticasCalidad,
          proyecciones: this._proyectarProduccion(produccionDiaria)
        },
        recomendaciones: this._generarRecomendacionesProduccion(
          produccionDiaria, 
          estadisticasCalidad, 
          tasaProduccion
        ),
        fechaGeneracion: new Date().toISOString()
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error generando reporte completo',
        'GENERATE_FULL_REPORT',
        { idGalpon, dias }
      )
    }
  }

  // ==================== MÉTODOS PRIVADOS ====================

  _calcularTendencia(datos) {
    if (!datos || datos.length < 2) return 'insuficiente'
    
    const valores = datos.map(d => d.total_huevo || 0)
    const tendencia = valores[valores.length - 1] - valores[0]
    
    if (tendencia > 0.1) return 'alcista'
    if (tendencia < -0.1) return 'bajista'
    return 'estable'
  }

  _calcularPromedio(valores) {
    if (!valores || valores.length === 0) return 0
    const suma = valores.reduce((sum, val) => sum + (val || 0), 0)
    return suma / valores.length
  }

  _calcularCalidadPromedio(datos) {
    if (!datos || datos.length === 0) return 0
    
    const totalHuevos = datos.reduce((sum, d) => sum + (d.total_huevo || 0), 0)
    const sumaCalidad = datos.reduce((sum, d) => 
      sum + ((d.calidad_huevo || 0) * (d.total_huevo || 0)), 0
    )
    
    return totalHuevos > 0 ? sumaCalidad / totalHuevos : 0
  }

  _proyectarProduccion(datos) {
    if (!datos || datos.length < 7) return null
    
    const ultimos7Dias = datos.slice(-7)
    const promedio = this._calcularPromedio(ultimos7Dias.map(d => d.total_huevo || 0))
    
    return {
        proximaSemana: promedio * 7,
        proximoMes: promedio * 30,
        confianza: this._calcularConfianza(ultimos7Dias)
    }
  }

  _calcularConfianza(datos) {
    const valores = datos.map(d => d.total_huevo || 0)
    const promedio = this._calcularPromedio(valores)
    const varianza = valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length
    const desviacion = Math.sqrt(varianza)
    const coeficienteVariacion = promedio > 0 ? desviacion / promedio : 0
    
    if (coeficienteVariacion < 0.1) return 'alta'
    if (coeficienteVariacion < 0.2) return 'media'
    return 'baja'
  }

  _generarRecomendaciones(produccion, tasa) {
    const recomendaciones = []
    
    const tendenciaProduccion = this._calcularTendencia(produccion)
    if (tendenciaProduccion === 'bajista') {
      recomendaciones.push('Revisar condiciones ambientales y alimentación')
    }
    
    const tasaPromedio = this._calcularPromedio(tasa)
    if (tasaPromedio < 70) {
      recomendaciones.push('La tasa de producción es baja, considerar revisión sanitaria')
    }
    
    return recomendaciones
  }

  _determinarMejorHorario(produccion) {
    // Lógica simplificada - en realidad analizaría patrones temporales
    return { hora: '08:00', razon: 'Mayor producción histórica' }
  }

  _calcularFrecuencia(produccion) {
    const promedio = this._calcularPromedio(produccion.map(d => d.total_huevo || 0))
    if (promedio > 1000) return '3 veces al día'
    if (promedio > 500) return '2 veces al día'
    return '1 vez al día'
  }

  _estimarRecoleccionDiaria(produccion) {
    return this._calcularPromedio(produccion.map(d => d.total_huevo || 0))
  }

  _encontrarMejorGalpon(resultados) {
    return resultados.reduce((mejor, actual) => 
      actual.total > mejor.total ? actual : mejor
    )
  }

  _encontrarPeorGalpon(resultados) {
    return resultados.reduce((peor, actual) => 
      actual.total < peor.total ? actual : peor
    )
  }

  _analizarTendenciaCalidad(calidad) {
    // Implementación simplificada
    return 'estable'
  }

  _analizarEficiencia(tasa) {
    const promedio = this._calcularPromedio(tasa)
    if (promedio > 85) return 'excelente'
    if (promedio > 75) return 'buena'
    if (promedio > 65) return 'regular'
    return 'mejorable'
  }

  _generarRecomendacionesProduccion(produccion, calidad, tasa) {
    const recomendaciones = []
    
    if (this._calcularTendencia(produccion) === 'bajista') {
      recomendaciones.push('Analizar causas de la disminución en producción')
    }
    
    if (this._calcularPromedio(tasa) < 75) {
      recomendaciones.push('Optimizar alimentación y condiciones ambientales')
    }
    
    const calidadPromedio = this._calcularCalidadPromedio(produccion)
    if (calidadPromedio > 3) {
      recomendaciones.push('Revisar calidad de alimento y salud de las aves')
    }
    
    return recomendaciones
  }
}

// Exportar instancia única para uso en toda la aplicación
export const huevosService = new HuevosService()
