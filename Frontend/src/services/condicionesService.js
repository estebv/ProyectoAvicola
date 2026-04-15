import { api } from './api.js'

/**
 * Servicio para gestionar condiciones ambientales
 * Tabla: CondicionesAmbientales (id_CondicionesAmbientales, fecha, temperatura, humedad, ventilacion, iluminacion, id_galpon)
 */
export const condicionesService = {
  // Obtener todas las condiciones ambientales
  async getAll() {
    try {
      const response = await api.get('/condiciones-ambientales')
      return response.condiciones || response
    } catch (error) {
      console.error('Error obteniendo condiciones ambientales:', error)
      throw error
    }
  },

  // Obtener condiciones por galpón
  async getByGalpon(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/condiciones-ambientales/galpon/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.condiciones || response
    } catch (error) {
      console.error(`Error obteniendo condiciones del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener condiciones por fecha
  async getByFecha(fecha) {
    try {
      const response = await api.get(`/condiciones-ambientales/fecha/${fecha}`)
      return response.condiciones || response
    } catch (error) {
      console.error(`Error obteniendo condiciones de la fecha ${fecha}:`, error)
      throw error
    }
  },

  // Crear nuevas condiciones ambientales
  async create(condicionesData) {
    try {
      const response = await api.post('/condiciones-ambientales', condicionesData)
      return response.condiciones || response
    } catch (error) {
      console.error('Error creando condiciones ambientales:', error)
      throw error
    }
  },

  // Actualizar condiciones existentes
  async update(id, condicionesData) {
    try {
      const response = await api.put(`/condiciones-ambientales/${id}`, condicionesData)
      return response.condiciones || response
    } catch (error) {
      console.error(`Error actualizando condiciones ${id}:`, error)
      throw error
    }
  },

  // Eliminar condiciones
  async delete(id) {
    try {
      await api.delete(`/condiciones-ambientales/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando condiciones ${id}:`, error)
      throw error
    }
  },

  // Obtener últimas condiciones de todos los galpones
  async getLatest() {
    try {
      const response = await api.get('/condiciones-ambientales/latest')
      return response.condiciones || response
    } catch (error) {
      console.error('Error obteniendo últimas condiciones:', error)
      throw error
    }
  },

  // Obtener estadísticas de condiciones
  async getEstadisticas(idGalpon, dias = 7) {
    try {
      const response = await api.get(`/condiciones-ambientales/estadisticas/${idGalpon}?dias=${dias}`)
      return response.estadisticas || response
    } catch (error) {
      console.error(`Error obteniendo estadísticas del galpón ${idGalpon}:`, error)
      throw error
    }
  }
}
