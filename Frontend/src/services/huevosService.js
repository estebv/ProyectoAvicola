import { api } from './api.js'

/**
 * Servicio para gestionar producción de huevos
 * Tabla: huevos (huevo_id, fecha_puesta, peso_huevo, calidad_huevo, total_huevo, id_galpon)
 */
export const huevosService = {
  // Obtener todos los registros de huevos
  async getAll() {
    try {
      const response = await api.get('/huevos')
      return response.huevos || response
    } catch (error) {
      console.error('Error obteniendo registros de huevos:', error)
      throw error
    }
  },

  // Obtener producción por galpón
  async getByGalpon(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/huevos/galpon/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.huevos || response
    } catch (error) {
      console.error(`Error obteniendo producción del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener producción por fecha
  async getByFecha(fecha) {
    try {
      const response = await api.get(`/huevos/fecha/${fecha}`)
      return response.huevos || response
    } catch (error) {
      console.error(`Error obteniendo producción de la fecha ${fecha}:`, error)
      throw error
    }
  },

  // Obtener registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/huevos/${id}`)
      return response.huevo || response
    } catch (error) {
      console.error(`Error obteniendo registro de huevo ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo registro de producción
  async create(huevosData) {
    try {
      const response = await api.post('/huevos', huevosData)
      return response.huevo || response
    } catch (error) {
      console.error('Error creando registro de huevos:', error)
      throw error
    }
  },

  // Actualizar registro de producción
  async update(id, huevosData) {
    try {
      const response = await api.put(`/huevos/${id}`, huevosData)
      return response.huevo || response
    } catch (error) {
      console.error(`Error actualizando registro de huevo ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro de producción
  async delete(id) {
    try {
      await api.delete(`/huevos/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando registro de huevo ${id}:`, error)
      throw error
    }
  },

  // Obtener producción diaria
  async getProduccionDiaria(dias = 7) {
    try {
      const response = await api.get(`/huevos/produccion-diaria?dias=${dias}`)
      return response.produccion || response
    } catch (error) {
      console.error('Error obteniendo producción diaria:', error)
      throw error
    }
  },

  // Obtener producción mensual
  async getProduccionMensual(meses = 12) {
    try {
      const response = await api.get(`/huevos/produccion-mensual?meses=${meses}`)
      return response.produccion || response
    } catch (error) {
      console.error('Error obteniendo producción mensual:', error)
      throw error
    }
  },

  // Obtener estadísticas de calidad
  async getEstadisticasCalidad(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/huevos/calidad/${idGalpon}?dias=${dias}`)
      return response.estadisticas || response
    } catch (error) {
      console.error(`Error obteniendo estadísticas de calidad del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener promedio de peso por galpón
  async getPesoPromedio(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/huevos/peso-promedio/${idGalpon}?dias=${dias}`)
      return response.promedio || response
    } catch (error) {
      console.error(`Error obteniendo peso promedio del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener tasa de producción (huevos/ave)
  async getTasaProduccion(idGalpon, dias = 7) {
    try {
      const response = await api.get(`/huevos/tasa-produccion/${idGalpon}?dias=${dias}`)
      return response.tasa || response
    } catch (error) {
      console.error(`Error obteniendo tasa de producción del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener producción por calidad
  async getProduccionPorCalidad(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/huevos/por-calidad/${idGalpon}?dias=${dias}`)
      return response.distribucion || response
    } catch (error) {
      console.error(`Error obteniendo producción por calidad del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener resumen de producción
  async getResumen(fechaInicio, fechaFin) {
    try {
      let url = '/huevos/resumen'
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.resumen || response
    } catch (error) {
      console.error('Error obteniendo resumen de producción:', error)
      throw error
    }
  }
}
