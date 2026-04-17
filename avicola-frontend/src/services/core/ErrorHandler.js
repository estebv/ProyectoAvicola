/**
 * Gestor centralizado de errores
 * Proporciona manejo consistente de errores en toda la aplicación
 */
export class ErrorHandler {
  constructor(serviceName = 'API') {
    this.serviceName = serviceName
  }

  /**
   * Manejar errores de API de manera centralizada
   * @param {Error} error - Error original
   * @returns {Error} Error procesado con mensaje contextualizado
   */
  handle(error) {
    // Log del error original para debugging
    console.error(`[${this.serviceName}] Error original:`, error)

    // Errores de red/conexión
    if (this._isNetworkError(error)) {
      return new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.')
    }

    // Errores de timeout
    if (this._isTimeoutError(error)) {
      return new Error('La operación tardó demasiado tiempo. Intenta nuevamente.')
    }

    // Errores HTTP del servidor
    if (error.response) {
      return this._handleHttpError(error)
    }

    // Errores de validación
    if (this._isValidationError(error)) {
      return new Error(`Datos inválidos: ${error.message}`)
    }

    // Error ya procesado (con mensaje personalizado)
    if (error.message && !error.response) {
      return error
    }

    // Error genérico
    return new Error(`Ocurrió un error inesperado en ${this.serviceName}. Intenta nuevamente.`)
  }

  /**
   * Manejar errores HTTP específicos
   * @param {Error} error - Error con respuesta HTTP
   * @returns {Error} Error procesado
   * @private
   */
  _handleHttpError(error) {
    const status = error.response.status
    const data = error.response.data || {}

    switch (status) {
      case 400:
        return new Error(data.message || 'Solicitud inválida. Verifica los datos enviados.')
      
      case 401:
        return new Error('No autorizado. Inicia sesión nuevamente.')
      
      case 403:
        return new Error('No tienes permisos para realizar esta acción.')
      
      case 404:
        return new Error('El recurso solicitado no existe.')
      
      case 409:
        return new Error(data.message || 'Conflicto de datos. El recurso ya existe.')
      
      case 422:
        return this._handleValidationError(data)
      
      case 429:
        return new Error('Demasiadas solicitudes. Espera unos minutos e intenta nuevamente.')
      
      case 500:
        return new Error('Error interno del servidor. Contacta al administrador.')
      
      case 502:
      case 503:
        return new Error('Servicio no disponible. Intenta nuevamente en unos minutos.')
      
      default:
        return new Error(data.message || `Error ${status}: ${error.response.statusText}`)
    }
  }

  /**
   * Manejar errores de validación (422)
   * @param {Object} data - Datos del error
   * @returns {Error} Error procesado
   * @private
   */
  _handleValidationError(data) {
    if (data.errors && Array.isArray(data.errors)) {
      const errors = data.errors.map(err => err.message || err).join(', ')
      return new Error(`Error de validación: ${errors}`)
    }
    
    if (data.message) {
      return new Error(`Error de validación: ${data.message}`)
    }
    
    return new Error('Los datos proporcionados no son válidos.')
  }

  /**
   * Verificar si es un error de red
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de red
   * @private
   */
  _isNetworkError(error) {
    return (
      error.name === 'TypeError' &&
      (error.message.includes('fetch') || 
       error.message.includes('NetworkError') ||
       error.message.includes('Failed to fetch'))
    )
  }

  /**
   * Verificar si es un error de timeout
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de timeout
   * @private
   */
  _isTimeoutError(error) {
    return (
      error.name === 'AbortError' ||
      error.message.includes('timeout') ||
      error.message.includes('aborted')
    )
  }

  /**
   * Verificar si es un error de validación
   * @param {Error} error - Error a verificar
   * @returns {boolean} True si es error de validación
   * @private
   */
  _isValidationError(error) {
    return (
      error.name === 'ValidationError' ||
      (error.message && error.message.includes('validation'))
    )
  }

  /**
   * Crear error personalizado con contexto
   * @param {string} message - Mensaje del error
   * @param {string} context - Contexto adicional
   * @param {Object} details - Detalles adicionales
   * @returns {Error} Error personalizado
   */
  createCustomError(message, context = '', details = {}) {
    const fullMessage = context ? `[${context}] ${message}` : message
    const error = new Error(fullMessage)
    error.context = context
    error.details = details
    error.service = this.serviceName
    return error
  }
}
