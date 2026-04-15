/**
 * Tipos y constantes centralizadas para toda la aplicación
 * Proporciona consistencia y previene errores de tipeo
 */

// ==================== ESTADOS Y ROLES ====================
export const USER_ROLES = {
  ADMIN: 'admin',
  OPERARIO: 'operario',
  SUPERVISOR: 'supervisor',
  VETERINARIO: 'veterinario'
}

export const ESTADOS_SALUD = {
  SALUDABLE: 'saludable',
  ENFERMO: 'enfermo',
  CUARENTENA: 'cuarentena',
  TRATAMIENTO: 'tratamiento',
  RECUPERADO: 'recuperado'
}

export const ESTADOS_VACUNACION = {
  PENDIENTE: 'pendiente',
  COMPLETADA: 'completada',
  ATRASADA: 'atrasada',
  CANCELADA: 'cancelada'
}

// ==================== CALIDADES Y CATEGORÍAS ====================
export const CALIDADES_HUEVO = {
  EXTRA: 1,
  PRIMERA: 2,
  SEGUNDA: 3,
  TERCERA: 4,
  INDUSTRIAL: 5
}

export const ETAPAS_ALIMENTO = {
  INICIO: 'inicio',
  CRECIMIENTO: 'crecimiento',
  ENGORDE: 'engorde',
  POSTURA: 'postura',
  RECRIA: 'recría'
}

export const TIPOS_VENTILACION = {
  NATURAL: 'natural',
  MECANICA: 'mecanica',
  MIXTA: 'mixta',
  CLIMATIZADA: 'climatizada'
}

export const TIPOS_ILUMINACION = {
  NATURAL: 'natural',
  ARTIFICIAL: 'artificial',
  MIXTA: 'mixta',
  LED: 'led',
  INCANDESCENTE: 'incandescente'
}

// ==================== UNIDADES Y MEDIDAS ====================
export const UNIDADES_MEDIDA = {
  KG: 'kg',
  GR: 'gr',
  LITROS: 'litros',
  ML: 'ml',
  UNIDADES: 'unidades',
  DOCENAS: 'docenas',
  CAJAS: 'cajas'
}

export const TEMPERATURA_RANGES = {
  IDEAL_AVES: { min: 18, max: 24, unit: '°C' },
  CRITICA_BAJA: { min: 10, max: 15, unit: '°C' },
  CRITICA_ALTA: { min: 30, max: 35, unit: '°C' }
}

export const HUMEDAD_RANGES = {
  IDEAL: { min: 50, max: 70, unit: '%' },
  BAJA: { min: 30, max: 45, unit: '%' },
  ALTA: { min: 75, max: 90, unit: '%' }
}

// ==================== PERIODOS DE TIEMPO ====================
export const PERIODOS_TIEMPO = {
  DIARIO: 'diario',
  SEMANAL: 'semanal',
  MENSUAL: 'mensual',
  TRIMESTRAL: 'trimestral',
  SEMESTRAL: 'semestral',
  ANUAL: 'anual'
}

export const RANGOS_DIAS = {
  ULTIMA_SEMANA: 7,
  ULTIMO_MES: 30,
  ULTIMO_TRIMESTRE: 90,
  ULTIMO_SEMESTRE: 180,
  ULTIMO_ANO: 365
}

// ==================== CÓDIGOS DE ERROR ====================
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT: 'RATE_LIMIT'
}

// ==================== MENSAJES DE ÉXITO ====================
export const SUCCESS_MESSAGES = {
  CREATE: 'Recurso creado exitosamente',
  UPDATE: 'Recurso actualizado exitosamente',
  DELETE: 'Recurso eliminado exitosamente',
  LOGIN: 'Inicio de sesión exitoso',
  LOGOUT: 'Sesión cerrada exitosamente',
  REGISTER: 'Registro exitoso',
  UPLOAD: 'Archivo subido exitosamente',
  SAVE: 'Datos guardados exitosamente'
}

// ==================== VALIDACIONES ====================
export const VALIDATION_RULES = {
  GALPON: {
    NUMERO_MIN: 1,
    NUMERO_MAX: 999,
    AVES_MIN: 0,
    AVES_MAX: 50000
  },
  AVE: {
    PESO_MIN: 0.1,
    PESO_MAX: 10.0,
    EDAD_MIN: 0,
    EDAD_MAX: 365
  },
  HUEVO: {
    PESO_MIN: 30,
    PESO_MAX: 100,
    CALIDAD_MIN: 1,
    CALIDAD_MAX: 5
  },
  ALIMENTO: {
    CANTIDAD_MIN: 0.1,
    CANTIDAD_MAX: 10000
  }
}

// ==================== ENDPOINTS CONFIG ====================
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    PASSWORD: '/auth/password'
  },
  GALPONES: '/galpones',
  CONDICIONES: '/condiciones-ambientales',
  AVES: '/aves',
  MORTALIDAD: '/mortalidad',
  PESAJE: '/pesaje',
  VACUNACION: '/vacunacion',
  HUEVOS: '/huevos',
  ALIMENTOS: '/alimentos',
  CLIMA: '/clima'
}

// ==================== CONFIGURACIÓN DE CACHE ====================
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300, // 5 minutos
  STATISTICS_TTL: 600, // 10 minutos
  DASHBOARD_TTL: 180, // 3 minutos
  MAX_SIZE: 100,
  CLEANUP_INTERVAL: 60000 // 1 minuto
}

// ==================== UTILIDADES ====================
export const DATE_FORMATS = {
  API: 'YYYY-MM-DD',
  DISPLAY: 'DD/MM/YYYY',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
}

export const EXPORT_FORMATS = {
  CSV: 'csv',
  EXCEL: 'excel',
  PDF: 'pdf',
  JSON: 'json'
}

// ==================== TIPOS GENÉRICOS ====================
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100
}

export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc'
}

// ==================== COLORES TEMÁTICOS ====================
export const STATUS_COLORS = {
  SALUDABLE: '#10b981', // green-500
  ENFERMO: '#ef4444',   // red-500
  CUARENTENA: '#f59e0b', // amber-500
  TRATAMIENTO: '#3b82f6', // blue-500
  RECUPERADO: '#8b5cf6', // violet-500
  PENDIENTE: '#6b7280',  // gray-500
  COMPLETADA: '#10b981', // green-500
  ATRASADA: '#ef4444',   // red-500
  CANCELADA: '#6b7280'   // gray-500
}

// Exportar todo por defecto para fácil acceso
export default {
  USER_ROLES,
  ESTADOS_SALUD,
  ESTADOS_VACUNACION,
  CALIDADES_HUEVO,
  ETAPAS_ALIMENTO,
  TIPOS_VENTILACION,
  TIPOS_ILUMINACION,
  UNIDADES_MEDIDA,
  TEMPERATURA_RANGES,
  HUMEDAD_RANGES,
  PERIODOS_TIEMPO,
  RANGOS_DIAS,
  ERROR_CODES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  API_ENDPOINTS,
  CACHE_CONFIG,
  DATE_FORMATS,
  EXPORT_FORMATS,
  PAGINATION_DEFAULTS,
  SORT_OPTIONS,
  STATUS_COLORS
}
