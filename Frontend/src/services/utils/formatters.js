import { DATE_FORMATS, UNIDADES_MEDIDA, CALIDADES_HUEVO, ESTADOS_SALUD } from '../types/index.js'

/**
 * Utilidades de formateo centralizadas
 * Proporciona formateo consistente para toda la aplicación
 */

// ==================== FORMATEO DE FECHAS ====================
export const dateFormatters = {
  /**
   * Formatear fecha para API (YYYY-MM-DD)
   */
  forAPI: (date) => {
    if (!date) return null
    const d = new Date(date)
    if (isNaN(d.getTime())) return null
    return d.toISOString().split('T')[0]
  },

  /**
   * Formatear fecha para visualización (DD/MM/YYYY)
   */
  forDisplay: (date) => {
    if (!date) return ''
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  },

  /**
   * Formatear fecha y hora (DD/MM/YYYY HH:mm)
   */
  forDateTime: (date) => {
    if (!date) return ''
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  /**
   * Formatear hora (HH:mm)
   */
  forTime: (date) => {
    if (!date) return ''
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  /**
   * Formatear fecha relativa (hace 2 días, etc.)
   */
  forRelative: (date) => {
    if (!date) return ''
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    
    const now = new Date()
    const diffMs = now - d
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
    return `Hace ${Math.floor(diffDays / 365)} años`
  }
}

// ==================== FORMATEO DE NÚMEROS ====================
export const numberFormatters = {
  /**
   * Formatear número con decimales
   */
  decimal: (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) return '0'
    return Number(value).toFixed(decimals)
  },

  /**
   * Formatear número con separadores de miles
   */
  thousands: (value, decimals = 0) => {
    if (value === null || value === undefined || isNaN(value)) return '0'
    return Number(value).toLocaleString('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  },

  /**
   * Formatear peso con unidad
   */
  weight: (value, unit = UNIDADES_MEDIDA.KG) => {
    if (value === null || value === undefined || isNaN(value)) return `0 ${unit}`
    const formatted = numberFormatters.decimal(value, 2)
    return `${formatted} ${unit}`
  },

  /**
   * Formatear temperatura
   */
  temperature: (value) => {
    if (value === null || value === undefined || isNaN(value)) return '0°C'
    return `${numberFormatters.decimal(value, 1)}°C`
  },

  /**
   * Formatear porcentaje
   */
  percentage: (value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) return '0%'
    return `${numberFormatters.decimal(value, decimals)}%`
  },

  /**
   * Formatear moneda
   */
  currency: (value, currency = 'USD') => {
    if (value === null || value === undefined || isNaN(value)) return '$0'
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(value)
  }
}

// ==================== FORMATEO DE TEXTO ====================
export const textFormatters = {
  /**
   * Capitalizar primera letra
   */
  capitalize: (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  /**
   * Capitalizar cada palabra
   */
  titleCase: (text) => {
    if (!text) return ''
    return text.replace(/\w\S*/g, txt => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  },

  /**
   * Convertir a mayúsculas
   */
  uppercase: (text) => {
    if (!text) return ''
    return text.toUpperCase()
  },

  /**
   * Convertir a minúsculas
   */
  lowercase: (text) => {
    if (!text) return ''
    return text.toLowerCase()
  },

  /**
   * Truncar texto con elipsis
   */
  truncate: (text, maxLength = 50) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  },

  /**
   * remover espacios extras
   */
  trim: (text) => {
    if (!text) return ''
    return text.trim().replace(/\s+/g, ' ')
  }
}

// ==================== FORMATEO ESPECÍFICO DEL DOMINIO ====================
export const domainFormatters = {
  /**
   * Formatear calidad de huevo
   */
  eggQuality: (value) => {
    const qualities = {
      [CALIDADES_HUEVO.EXTRA]: 'Extra',
      [CALIDADES_HUEVO.PRIMERA]: 'Primera',
      [CALIDADES_HUEVO.SEGUNDA]: 'Segunda',
      [CALIDADES_HUEVO.TERCERA]: 'Tercera',
      [CALIDADES_HUEVO.INDUSTRIAL]: 'Industrial'
    }
    return qualities[value] || 'Desconocida'
  },

  /**
   * Formatear estado de salud
   */
  healthStatus: (value) => {
    const statuses = {
      [ESTADOS_SALUD.SALUDABLE]: 'Saludable',
      [ESTADOS_SALUD.ENFERMO]: 'Enfermo',
      [ESTADOS_SALUD.CUARENTENA]: 'Cuarentena',
      [ESTADOS_SALUD.TRATAMIENTO]: 'En Tratamiento',
      [ESTADOS_SALUD.RECUPERADO]: 'Recuperado'
    }
    return statuses[value] || 'Desconocido'
  },

  /**
   * Formatear producción de huevos
   */
  eggProduction: (total, birds) => {
    if (!total || !birds) return '0%'
    const rate = (total / birds) * 100
    return numberFormatters.percentage(rate, 1)
  },

  /**
   * Formatear tasa de mortalidad
   */
  mortalityRate: (deaths, total) => {
    if (!deaths || !total) return '0%'
    const rate = (deaths / total) * 100
    return numberFormatters.percentage(rate, 2)
  },

  /**
   * Formatear conversión alimenticia
   */
  feedConversion: (feedKg, eggKg) => {
    if (!feedKg || !eggKg) return '0:1'
    const ratio = feedKg / eggKg
    return `${numberFormatters.decimal(ratio, 2)}:1`
  },

  /**
   * Formatear densidad de aves
   */
  birdDensity: (birds, area) => {
    if (!birds || !area) return '0 aves/m²'
    const density = birds / area
    return `${numberFormatters.decimal(density, 1)} aves/m²`
  },

  /**
   * Formatear edad de las aves
   */
  birdAge: (birthDate) => {
    if (!birthDate) return 'Desconocida'
    const birth = new Date(birthDate)
    const now = new Date()
    const diffDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) return `${diffDays} días`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`
    return `${Math.floor(diffDays / 365)} años`
  }
}

// ==================== FORMATEO DE TABLAS Y LISTAS ====================
export const tableFormatters = {
  /**
   * Formatear celda de tabla
   */
  cell: (value, formatter = null) => {
    if (value === null || value === undefined) return '-'
    if (formatter) return formatter(value)
    return value
  },

  /**
   * Formatear fila de tabla completa
   */
  row: (data, formatters = {}) => {
    const formatted = {}
    Object.entries(data).forEach(([key, value]) => {
      const formatter = formatters[key]
      formatted[key] = tableFormatters.cell(value, formatter)
    })
    return formatted
  },

  /**
   * Formatear estado con color
   */
  statusWithColor: (status, colorMap = {}) => {
    const text = domainFormatters.healthStatus(status) || status
    const color = colorMap[status] || '#6b7280'
    return { text, color }
  }
}

// ==================== UTILIDADES DE EXPORTACIÓN ====================
export const exportFormatters = {
  /**
   * Formatear datos para CSV
   */
  forCSV: (data) => {
    if (Array.isArray(data)) {
      return data.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value
        ).join(',')
      ).join('\n')
    }
    return data
  },

  /**
   * Formatear datos para JSON
   */
  forJSON: (data) => {
    return JSON.stringify(data, null, 2)
  }
}

export default {
  dateFormatters,
  numberFormatters,
  textFormatters,
  domainFormatters,
  tableFormatters,
  exportFormatters
}
