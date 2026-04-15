import { VALIDATION_RULES, ESTADOS_SALUD, CALIDADES_HUEVO, ETAPAS_ALIMENTO } from '../types/index.js'

/**
 * Utilidades de validación centralizadas
 * Proporciona validaciones consistentes para toda la aplicación
 */

// ==================== VALIDACIONES GENÉRICAS ====================
export const validators = {
  /**
   * Validar que un valor no sea nulo o undefined
   */
  isRequired: (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Este campo es requerido'
    }
    return null
  },

  /**
   * Validar longitud mínima de texto
   */
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Debe tener al menos ${min} caracteres`
    }
    return null
  },

  /**
   * Validar longitud máxima de texto
   */
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `No puede tener más de ${max} caracteres`
    }
    return null
  },

  /**
   * Validar rango numérico
   */
  numberRange: (min, max) => (value) => {
    const num = Number(value)
    if (isNaN(num)) return 'Debe ser un número válido'
    if (num < min || num > max) {
      return `Debe estar entre ${min} y ${max}`
    }
    return null
  },

  /**
   * Validar email
   */
  email: (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Debe ser un email válido'
    }
    return null
  },

  /**
   * Validar fecha
   */
  date: (value) => {
    if (!value) return null
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return 'Debe ser una fecha válida'
    }
    return null
  },

  /**
   * Validar que una fecha no sea futura
   */
  dateNotFuture: (value) => {
    if (!value) return null
    const date = new Date(value)
    const now = new Date()
    if (date > now) {
      return 'La fecha no puede ser futura'
    }
    return null
  },

  /**
   * Validar que una fecha no sea pasada
   */
  dateNotPast: (value) => {
    if (!value) return null
    const date = new Date(value)
    const now = new Date()
    if (date < now) {
      return 'La fecha no puede ser pasada'
    }
    return null
  }
}

// ==================== VALIDACIONES ESPECÍFICAS ====================
export const specificValidators = {
  /**
   * Validar número de galpón
   */
  galponNumber: (value) => {
    const rules = VALIDATION_RULES.GALPON
    return validators.numberRange(rules.NUMERO_MIN, rules.NUMERO_MAX)(value)
  },

  /**
   * Validar número de aves
   */
  birdCount: (value) => {
    const rules = VALIDATION_RULES.GALPON
    return validators.numberRange(rules.AVES_MIN, rules.AVES_MAX)(value)
  },

  /**
   * Validar peso de ave
   */
  birdWeight: (value) => {
    const rules = VALIDATION_RULES.AVE
    return validators.numberRange(rules.PESO_MIN, rules.PESO_MAX)(value)
  },

  /**
   * Validar peso de huevo
   */
  eggWeight: (value) => {
    const rules = VALIDATION_RULES.HUEVO
    return validators.numberRange(rules.PESO_MIN, rules.PESO_MAX)(value)
  },

  /**
   * Validar calidad de huevo
   */
  eggQuality: (value) => {
    const rules = VALIDATION_RULES.HUEVO
    const result = validators.numberRange(rules.CALIDAD_MIN, rules.CALIDAD_MAX)(value)
    if (result) return result
    
    if (!Object.values(CALIDADES_HUEVO).includes(Number(value))) {
      return 'Calidad de huevo no válida'
    }
    return null
  },

  /**
   * Validar cantidad de alimento
   */
  foodAmount: (value) => {
    const rules = VALIDATION_RULES.ALIMENTO
    return validators.numberRange(rules.CANTIDAD_MIN, rules.CANTIDAD_MAX)(value)
  },

  /**
   * Validar estado de salud
   */
  healthStatus: (value) => {
    if (!Object.values(ESTADOS_SALUD).includes(value)) {
      return 'Estado de salud no válido'
    }
    return null
  },

  /**
   * Validar etapa de alimento
   */
  foodStage: (value) => {
    if (!Object.values(ETAPAS_ALIMENTO).includes(value)) {
      return 'Etapa de alimento no válida'
    }
    return null
  },

  /**
   * Validar temperatura
   */
  temperature: (value) => {
    const temp = Number(value)
    if (isNaN(temp)) return 'Debe ser un número válido'
    if (temp < -50 || temp > 60) {
      return 'Temperatura fuera de rango válido (-50°C a 60°C)'
    }
    return null
  },

  /**
   * Validar humedad
   */
  humidity: (value) => {
    const humidity = Number(value)
    if (isNaN(humidity)) return 'Debe ser un número válido'
    if (humidity < 0 || humidity > 100) {
      return 'Humedad debe estar entre 0% y 100%'
    }
    return null
  }
}

// ==================== VALIDADORES COMPUESTOS ====================
export const compositeValidators = {
  /**
   * Validar formulario completo de galpón
   */
  galponForm: (data) => {
    const errors = {}
    
    if (validators.isRequired(data.numero_Galpon)) {
      errors.numero_Galpon = validators.isRequired(data.numero_Galpon)
    } else if (specificValidators.galponNumber(data.numero_Galpon)) {
      errors.numero_Galpon = specificValidators.galponNumber(data.numero_Galpon)
    }
    
    if (validators.isRequired(data.numero_aves)) {
      errors.numero_aves = validators.isRequired(data.numero_aves)
    } else if (specificValidators.birdCount(data.numero_aves)) {
      errors.numero_aves = specificValidators.birdCount(data.numero_aves)
    }
    
    return errors
  },

  /**
   * Validar formulario completo de ave
   */
  aveForm: (data) => {
    const errors = {}
    
    if (validators.isRequired(data.raza)) {
      errors.raza = validators.isRequired(data.raza)
    } else if (validators.minLength(2)(data.raza)) {
      errors.raza = validators.minLength(2)(data.raza)
    }
    
    if (validators.isRequired(data.fecha_nacimiento)) {
      errors.fecha_nacimiento = validators.isRequired(data.fecha_nacimiento)
    } else if (validators.date(data.fecha_nacimiento)) {
      errors.fecha_nacimiento = validators.date(data.fecha_nacimiento)
    }
    
    if (validators.isRequired(data.fecha_llegada)) {
      errors.fecha_llegada = validators.isRequired(data.fecha_llegada)
    } else if (validators.date(data.fecha_llegada)) {
      errors.fecha_llegada = validators.date(data.fecha_llegada)
    }
    
    if (validators.isRequired(data.origen)) {
      errors.origen = validators.isRequired(data.origen)
    }
    
    if (validators.isRequired(data.total_aves)) {
      errors.total_aves = validators.isRequired(data.total_aves)
    } else if (specificValidators.birdCount(data.total_aves)) {
      errors.total_aves = specificValidators.birdCount(data.total_aves)
    }
    
    return errors
  },

  /**
   * Validar formulario de condiciones ambientales
   */
  condicionesForm: (data) => {
    const errors = {}
    
    if (validators.isRequired(data.fecha)) {
      errors.fecha = validators.isRequired(data.fecha)
    } else if (validators.date(data.fecha)) {
      errors.fecha = validators.date(data.fecha)
    }
    
    if (data.temperatura && specificValidators.temperature(data.temperatura)) {
      errors.temperatura = specificValidators.temperature(data.temperatura)
    }
    
    if (data.humedad && specificValidators.humidity(data.humedad)) {
      errors.humedad = specificValidators.humidity(data.humedad)
    }
    
    if (validators.isRequired(data.id_galpon)) {
      errors.id_galpon = validators.isRequired(data.id_galpon)
    }
    
    return errors
  },

  /**
   * Validar formulario de mortalidad
   */
  mortalidadForm: (data) => {
    const errors = {}
    
    if (validators.isRequired(data.fecha_muerte)) {
      errors.fecha_muerte = validators.isRequired(data.fecha_muerte)
    } else if (validators.dateNotFuture(data.fecha_muerte)) {
      errors.fecha_muerte = validators.dateNotFuture(data.fecha_muerte)
    }
    
    if (validators.isRequired(data.estado_salud)) {
      errors.estado_salud = validators.isRequired(data.estado_salud)
    } else if (specificValidators.healthStatus(data.estado_salud)) {
      errors.estado_salud = specificValidators.healthStatus(data.estado_salud)
    }
    
    if (validators.isRequired(data.numero_aves)) {
      errors.numero_aves = validators.isRequired(data.numero_aves)
    } else if (specificValidators.birdCount(data.numero_aves)) {
      errors.numero_aves = specificValidators.birdCount(data.numero_aves)
    }
    
    if (validators.isRequired(data.id_galpon)) {
      errors.id_galpon = validators.isRequired(data.id_galpon)
    }
    
    return errors
  }
}

// ==================== UTILIDADES DE VALIDACIÓN ====================
export const validationUtils = {
  /**
   * Verificar si un objeto de errores tiene algún error
   */
  hasErrors: (errors) => {
    return Object.values(errors).some(error => error !== null && error !== undefined)
  },

  /**
   * Obtener primer mensaje de error
   */
  getFirstError: (errors) => {
    const errorValues = Object.values(errors).filter(error => error)
    return errorValues.length > 0 ? errorValues[0] : null
  },

  /**
   * Limpiar objeto de errores (eliminar valores nulos/undefined)
   */
  cleanErrors: (errors) => {
    const cleaned = {}
    Object.entries(errors).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key] = value
      }
    })
    return cleaned
  },

  /**
   * Validar campo específico con múltiples reglas
   */
  validateField: (value, rules) => {
    for (const rule of rules) {
      const error = rule(value)
      if (error) return error
    }
    return null
  }
}

export default {
  validators,
  specificValidators,
  compositeValidators,
  validationUtils
}
