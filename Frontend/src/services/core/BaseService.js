import { api } from '../api.js'
import { ErrorHandler } from './ErrorHandler.js'
import { CacheManager } from './CacheManager.js'

/**
 * Clase base abstracta para todos los servicios
 * Implementa patrón Template Method para eliminar redundancias
 * Proporciona funcionalidades comunes: CRUD, caché, manejo de errores
 */
export class BaseService {
  constructor(resourceName, cacheConfig = {}) {
    this.resourceName = resourceName
    this.cache = new CacheManager(cacheConfig)
    this.errorHandler = new ErrorHandler(resourceName)
  }

  /**
   * Método template para construir URLs
   * @param {string} path - Path adicional
   * @param {Object} params - Parámetros query
   * @returns {string} URL completa
   */
  _buildUrl(path = '', params = {}) {
    let url = `/${this.resourceName}`
    if (path) url += `/${path}`
    
    const queryString = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value)
      }
    })
    
    return queryString.toString() ? `${url}?${queryString.toString()}` : url
  }

  /**
   * Método template para manejo de respuestas
   * @param {Promise} apiCall - Llamada a la API
   * @param {string} cacheKey - Clave de caché (opcional)
   * @param {number} cacheTTL - Tiempo de vida en caché (opcional)
   * @returns {Promise} Respuesta procesada
   */
  async _handleApiCall(apiCall, cacheKey = null, cacheTTL = 300) {
    try {
      // Verificar caché primero
      if (cacheKey) {
        const cached = this.cache.get(cacheKey)
        if (cached) return cached
      }

      const response = await apiCall
      const data = this._extractData(response)
      
      // Guardar en caché
      if (cacheKey && data) {
        this.cache.set(cacheKey, data, cacheTTL)
      }
      
      return data
    } catch (error) {
      throw this.errorHandler.handle(error)
    }
  }

  /**
   * Extrae datos de la respuesta del API
   * @param {Object} response - Respuesta del API
   * @returns {any} Datos extraídos
   */
  _extractData(response) {
    // Prioridad: resource plural -> resource singular -> response
    const pluralKey = `${this.resourceName}s`
    const singularKey = this.resourceName
    
    return response[pluralKey] || response[singularKey] || response
  }

  // ==================== CRUD BÁSICO ====================

  /**
   * Obtener todos los recursos
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Array>} Lista de recursos
   */
  async getAll(filters = {}) {
    const cacheKey = `${this.resourceName}_all_${JSON.stringify(filters)}`
    return this._handleApiCall(
      api.get(this._buildUrl('', filters)),
      cacheKey
    )
  }

  /**
   * Obtener recurso por ID
   * @param {number|string} id - ID del recurso
   * @returns {Promise<Object>} Recurso encontrado
   */
  async getById(id) {
    const cacheKey = `${this.resourceName}_${id}`
    return this._handleApiCall(
      api.get(this._buildUrl(id)),
      cacheKey
    )
  }

  /**
   * Crear nuevo recurso
   * @param {Object} data - Datos del recurso
   * @param {boolean} invalidateCache - Invalidar caché existente
   * @returns {Promise<Object>} Recurso creado
   */
  async create(data, invalidateCache = true) {
    const result = await this._handleApiCall(
      api.post(this._buildUrl(), data)
    )
    
    if (invalidateCache) {
      this._invalidateResourceCache()
    }
    
    return result
  }

  /**
   * Actualizar recurso existente
   * @param {number|string} id - ID del recurso
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Recurso actualizado
   */
  async update(id, data) {
    const result = await this._handleApiCall(
      api.put(this._buildUrl(id), data)
    )
    
    // Invalidar caché específico y general
    this.cache.delete(`${this.resourceName}_${id}`)
    this._invalidateResourceCache()
    
    return result
  }

  /**
   * Eliminar recurso
   * @param {number|string} id - ID del recurso
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async delete(id) {
    await this._handleApiCall(
      api.delete(this._buildUrl(id))
    )
    
    // Invalidar caché
    this.cache.delete(`${this.resourceName}_${id}`)
    this._invalidateResourceCache()
    
    return true
  }

  // ==================== MÉTODOS ESPECIALIZADOS ====================

  /**
   * Obtener recursos por campo específico
   * @param {string} field - Nombre del campo
   * @param {any} value - Valor del campo
   * @param {Object} additionalParams - Parámetros adicionales
   * @returns {Promise<Array>} Recursos filtrados
   */
  async getByField(field, value, additionalParams = {}) {
    const cacheKey = `${this.resourceName}_${field}_${value}_${JSON.stringify(additionalParams)}`
    return this._handleApiCall(
      api.get(this._buildUrl(`${field}/${value}`, additionalParams)),
      cacheKey
    )
  }

  /**
   * Obtener recursos por rango de fechas
   * @param {string} fechaInicio - Fecha de inicio
   * @param {string} fechaFin - Fecha de fin
   * @param {Object} additionalParams - Parámetros adicionales
   * @returns {Promise<Array>} Recursos en rango de fechas
   */
  async getByDateRange(fechaInicio, fechaFin, additionalParams = {}) {
    const params = { fechaInicio, fechaFin, ...additionalParams }
    const cacheKey = `${this.resourceName}_range_${fechaInicio}_${fechaFin}_${JSON.stringify(additionalParams)}`
    return this._handleApiCall(
      api.get(this._buildUrl('rango', params)),
      cacheKey
    )
  }

  /**
   * Obtener estadísticas del recurso
   * @param {Object} params - Parámetros para estadísticas
   * @returns {Promise<Object>} Estadísticas
   */
  async getStatistics(params = {}) {
    const cacheKey = `${this.resourceName}_stats_${JSON.stringify(params)}`
    return this._handleApiCall(
      api.get(this._buildUrl('estadisticas', params)),
      cacheKey,
      600 // 10 minutos para estadísticas
    )
  }

  // ==================== UTILIDADES ====================

  /**
   * Invalidar caché general del recurso
   * @private
   */
  _invalidateResourceCache() {
    this.cache.clearByPattern(`${this.resourceName}_`)
  }

  /**
   * Limpiar toda la caché del servicio
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Obtener información de la caché
   * @returns {Object} Información de caché
   */
  getCacheInfo() {
    return this.cache.getInfo()
  }
}
