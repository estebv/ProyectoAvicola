import { api } from './api.js'

/**
 * Servicio para gestionar datos climáticos
 * Tabla: Clima (id, fecha, temperatura, precipitacion)
 */
export const climaService = {
  // Obtener todos los registros climáticos
  async getAll() {
    try {
      const response = await api.get('/clima')
      return response.clima || response
    } catch (error) {
      console.error('Error obteniendo datos climáticos:', error)
      throw error
    }
  },

  // Obtener datos climáticos por fecha
  async getByFecha(fecha) {
    try {
      const response = await api.get(`/clima/fecha/${fecha}`)
      return response.clima || response
    } catch (error) {
      console.error(`Error obteniendo clima de la fecha ${fecha}:`, error)
      throw error
    }
  },

  // Obtener datos por rango de fechas
  async getByRangoFechas(fechaInicio, fechaFin) {
    try {
      let url = '/clima/rango'
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.clima || response
    } catch (error) {
      console.error('Error obteniendo clima por rango de fechas:', error)
      throw error
    }
  },

  // Obtener registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/clima/${id}`)
      return response.clima || response
    } catch (error) {
      console.error(`Error obteniendo registro climático ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo registro climático
  async create(climaData) {
    try {
      const response = await api.post('/clima', climaData)
      return response.clima || response
    } catch (error) {
      console.error('Error creando registro climático:', error)
      throw error
    }
  },

  // Actualizar registro climático
  async update(id, climaData) {
    try {
      const response = await api.put(`/clima/${id}`, climaData)
      return response.clima || response
    } catch (error) {
      console.error(`Error actualizando registro climático ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro climático
  async delete(id) {
    try {
      await api.delete(`/clima/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando registro climático ${id}:`, error)
      throw error
    }
  },

  // Obtener clima actual (último registro)
  async getActual() {
    try {
      const response = await api.get('/clima/actual')
      return response.clima || response
    } catch (error) {
      console.error('Error obteniendo clima actual:', error)
      throw error
    }
  },

  // Obtener promedios climáticos del mes
  async getPromediosMes(mes, anio) {
    try {
      const response = await api.get(`/clima/promedios/${mes}/${anio}`)
      return response.promedios || response
    } catch (error) {
      console.error(`Error obteniendo promedios del mes ${mes}/${anio}:`, error)
      throw error
    }
  },

  // Obtener estadísticas climáticas
  async getEstadisticas(dias = 30) {
    try {
      const response = await api.get(`/clima/estadisticas?dias=${dias}`)
      return response.estadisticas || response
    } catch (error) {
      console.error('Error obteniendo estadísticas climáticas:', error)
      throw error
    }
  },

  // Obtener temperaturas extremas
  async getTemperaturasExtremas(dias = 30) {
    try {
      const response = await api.get(`/clima/temperaturas-extremas?dias=${dias}`)
      return response.extremos || response
    } catch (error) {
      console.error('Error obteniendo temperaturas extremas:', error)
      throw error
    }
  },

  // Obtener total precipitación por período
  async getPrecipitacionTotal(fechaInicio, fechaFin) {
    try {
      let url = '/clima/precipitacion-total'
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.total || response
    } catch (error) {
      console.error('Error obteniendo total de precipitación:', error)
      throw error
    }
  },

  // Importar datos climáticos masivamente
  async importarDatos(datosClima) {
    try {
      const response = await api.post('/clima/importar', { datos: datosClima })
      return response.resultado || response
    } catch (error) {
      console.error('Error importando datos climáticos:', error)
      throw error
    }
  }
}
