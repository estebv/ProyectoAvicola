import { api } from './api.js'

/**
 * Servicio para gestionar vacunación de aves
 * Tabla: vacunacion (vacunacion_id, nombre_Vacuna, fecha, id_galpon)
 */
export const vacunacionService = {
  // Obtener todos los registros de vacunación
  async getAll() {
    try {
      const response = await api.get('/vacunacion')
      return response.vacunaciones || response
    } catch (error) {
      console.error('Error obteniendo registros de vacunación:', error)
      throw error
    }
  },

  // Obtener vacunaciones por galpón
  async getByGalpon(idGalpon) {
    try {
      const response = await api.get(`/vacunacion/galpon/${idGalpon}`)
      return response.vacunaciones || response
    } catch (error) {
      console.error(`Error obteniendo vacunaciones del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener vacunación por ID
  async getById(id) {
    try {
      const response = await api.get(`/vacunacion/${id}`)
      return response.vacunacion || response
    } catch (error) {
      console.error(`Error obteniendo vacunación ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo registro de vacunación
  async create(vacunacionData) {
    try {
      const response = await api.post('/vacunacion', vacunacionData)
      return response.vacunacion || response
    } catch (error) {
      console.error('Error creando registro de vacunación:', error)
      throw error
    }
  },

  // Actualizar registro de vacunación
  async update(id, vacunacionData) {
    try {
      const response = await api.put(`/vacunacion/${id}`, vacunacionData)
      return response.vacunacion || response
    } catch (error) {
      console.error(`Error actualizando vacunación ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro de vacunación
  async delete(id) {
    try {
      await api.delete(`/vacunacion/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando vacunación ${id}:`, error)
      throw error
    }
  },

  // Obtener vacunaciones por tipo de vacuna
  async getByVacuna(nombreVacuna) {
    try {
      const response = await api.get(`/vacunacion/vacuna/${nombreVacuna}`)
      return response.vacunaciones || response
    } catch (error) {
      console.error(`Error obteniendo vacunaciones de ${nombreVacuna}:`, error)
      throw error
    }
  },

  // Obtener vacunaciones por rango de fechas
  async getByFechas(fechaInicio, fechaFin) {
    try {
      let url = '/vacunacion/fechas'
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.vacunaciones || response
    } catch (error) {
      console.error('Error obteniendo vacunaciones por fechas:', error)
      throw error
    }
  },

  // Obtener próximas vacunaciones pendientes
  async getProximas() {
    try {
      const response = await api.get('/vacunacion/proximas')
      return response.vacunaciones || response
    } catch (error) {
      console.error('Error obteniendo próximas vacunaciones:', error)
      throw error
    }
  },

  // Obtener calendario de vacunación
  async getCalendario(idGalpon, meses = 6) {
    try {
      const response = await api.get(`/vacunacion/calendario/${idGalpon}?meses=${meses}`)
      return response.calendario || response
    } catch (error) {
      console.error(`Error obteniendo calendario de vacunación del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Marcar vacunación como completada
  async marcarCompletada(id) {
    try {
      const response = await api.patch(`/vacunacion/${id}/completar`)
      return response.vacunacion || response
    } catch (error) {
      console.error(`Error marcando vacunación ${id} como completada:`, error)
      throw error
    }
  },

  // Obtener historial completo de vacunación de un galpón
  async getHistorialCompleto(idGalpon) {
    try {
      const response = await api.get(`/vacunacion/historial/${idGalpon}`)
      return response.historial || response
    } catch (error) {
      console.error(`Error obteniendo historial de vacunación del galpón ${idGalpon}:`, error)
      throw error
    }
  }
}
