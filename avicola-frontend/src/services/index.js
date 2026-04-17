/**
 * Índice central de servicios - Nueva arquitectura limpia
 * Exporta todos los servicios con una interfaz unificada
 */

// ==================== SERVICIOS REFACTORIZADOS (NUEVA ARQUITECTURA) ====================
export { authService } from './refactored/AuthService.js'
export { galponService } from './refactored/GalponService.js'
export { huevosService } from './refactored/HuevosService.js'

// ==================== SERVICIOS LEGADOS (MANTENER TEMPORALMENTE) ====================
export { authApiService } from './authApiService.js'
export { galponService as legacyGalponService } from './galponService.js'
export { condicionesService } from './condicionesService.js'
export { avesService } from './avesService.js'
export { mortalidadService } from './mortalidadService.js'
export { pesajeService } from './pesajeService.js'
export { vacunacionService } from './vacunacionService.js'
export { huevosService as legacyHuevosService } from './huevosService.js'
export { alimentosService } from './alimentosService.js'
export { climaService } from './climaService.js'

// ==================== CORE Y UTILIDADES ====================
export { BaseService } from './core/BaseService.js'
export { ErrorHandler } from './core/ErrorHandler.js'
export { CacheManager } from './core/CacheManager.js'
export { api, API_BASE_URL } from './api.js'

// ==================== TIPOS Y CONSTANTES ====================
export * from './types/index.js'

// ==================== VALIDADORES Y FORMATEADORES ====================
export { validators, specificValidators, compositeValidators, validationUtils } from './utils/validators.js'
export { dateFormatters, numberFormatters, textFormatters, domainFormatters, tableFormatters, exportFormatters } from './utils/formatters.js'

// ==================== OBJETO UNIFICADO DE SERVICIOS ====================
export const services = {
  // Servicios refactorizados (prioritarios)
  auth: authService,
  galpones: galponService,
  huevos: huevosService,
  
  // Servicios legados (en transición)
  authLegacy: authApiService,
  galponesLegacy: legacyGalponService,
  condiciones: condicionesService,
  aves: avesService,
  mortalidad: mortalidadService,
  pesaje: pesajeService,
  vacunacion: vacunacionService,
  huevosLegacy: legacyHuevosService,
  alimentos: alimentosService,
  clima: climaService,
  
  // Utilidades
  api: api,
  validators: { validators, specificValidators, compositeValidators, validationUtils },
  formatters: { dateFormatters, numberFormatters, textFormatters, domainFormatters, tableFormatters, exportFormatters },
  cache: new CacheManager(),
  errorHandler: new ErrorHandler()
}

// ==================== CONFIGURACIÓN Y METADATOS ====================
export const serviceConfig = {
  version: '2.0.0',
  architecture: 'clean',
  patterns: ['BaseService', 'Dependency Injection', 'Cache Management', 'Error Handling'],
  migration: {
    from: 'legacy',
    to: 'refactored',
    status: 'in-progress'
  },
  features: {
    caching: true,
    errorHandling: true,
    validation: true,
    formatting: true,
    typeSafety: true
  }
}

// ==================== UTILIDADES DE MIGRACIÓN ====================
export const migrationUtils = {
  /**
   * Verificar si un servicio está migrado
   */
  isMigrated(serviceName) {
    const migratedServices = ['auth', 'galpones', 'huevos']
    return migratedServices.includes(serviceName)
  },

  /**
   * Obtener servicio preferido (migrado si existe, si no legado)
   */
  getPreferredService(serviceName) {
    if (this.isMigrated(serviceName)) {
      return services[serviceName]
    }
    return services[`${serviceName}Legacy`] || services[serviceName]
  },

  /**
   * Lista de servicios pendientes de migración
   */
  getPendingMigration() {
    const allServices = ['condiciones', 'aves', 'mortalidad', 'pesaje', 'vacunacion', 'alimentos', 'clima']
    return allServices.filter(service => !this.isMigrated(service))
  }
}

/**
 * Ejemplos de uso de la nueva arquitectura:
 * 
 * // Importación individual
 * import { authService, galponService } from '../services'
 * 
 * // Importación completa
 * import { services } from '../services'
 * const user = await services.auth.login({ email, password })
 * const galpones = await services.galpones.getAll()
 * 
 * // Con validación
 * import { validators, galponService } from '../services'
 * const errors = validators.galponForm(data)
 * if (!validationUtils.hasErrors(errors)) {
 *   await galponService.create(data)
 * }
 * 
 * // Con formateo
 * import { domainFormatters, services } from '../services'
 * const produccion = await services.huevos.getProduccionDiaria()
 * const tasaFormateada = domainFormatters.eggProduction(total, aves)
 * 
 * // Con caché
 * import { services } from '../services'
 * const cacheInfo = services.cache.getInfo()
 * services.cache.clear()
 * 
 * // Migración automática
 * import { migrationUtils, services } from '../services'
 * const servicio = migrationUtils.getPreferredService('galpones')
 * const pendientes = migrationUtils.getPendingMigration()
 */
