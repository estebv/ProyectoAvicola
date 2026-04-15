import { api } from './api.js'

/**
 * Servicio para gestionar mortalidad de aves
 * Tabla: mortalidad (mortalidad_id, numero_galpon, estado_salud, fecha_muerte, causa_muerte, numero_aves, id_galpon)
 */
export const mortalidadService = {
  // Obtener todos los registros de mortalidad
  async getAll() {
    try {
      const response = await api.get('/mortalidad')
      return response.mortalidad || response
    } catch (error) {
      console.error('Error obteniendo registros de mortalidad:', error)
      throw error
    }
  },

  // Obtener mortalidad por galpón
  async getByGalpon(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/mortalidad/galpon/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.mortalidad || response
    } catch (error) {
      console.error(`Error obteniendo mortalidad del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener mortalidad por fecha
  async getByFecha(fecha) {
    try {
      const response = await api.get(`/mortalidad/fecha/${fecha}`)
      return response.mortalidad || response
    } catch (error) {
      console.error(`Error obteniendo mortalidad de la fecha ${fecha}:`, error)
      throw error
    }
  },

  // Obtener mortalidad por causa
  async getByCausa(causa) {
    try {
      const response = await api.get(`/mortalidad/causa/${causa}`)
      return response.mortalidad || response
    } catch (error) {
      console.error(`Error obteniendo mortalidad por causa ${causa}:`, error)
      throw error
    }
  },

  // Crear nuevo registro de mortalidad
  async create(mortalidadData) {
    try {
      const response = await api.post('/mortalidad', mortalidadData)
      return response.mortalidad || response
    } catch (error) {
      console.error('Error creando registro de mortalidad:', error)
      throw error
    }
  },

  // Actualizar registro de mortalidad
  async update(id, mortalidadData) {
    try {
      const response = await api.put(`/mortalidad/${id}`, mortalidadData)
      return response.mortalidad || response
    } catch (error) {
      console.error(`Error actualizando registro de mortalidad ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro de mortalidad
  async delete(id) {
    try {
      await api.delete(`/mortalidad/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando registro de mortalidad ${id}:`, error)
      throw error
    }
  },

  // Obtener estadísticas de mortalidad
  async getEstadisticas(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/mortalidad/estadisticas/${idGalpon}?dias=${dias}`)
      return response.estadisticas || response
    } catch (error) {
      console.error(`Error obteniendo estadísticas de mortalidad del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener tasa de mortalidad por período
  async getTasaMortalidad(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/mortalidad/tasa/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.tasa || response
    } catch (error) {
      console.error(`Error obteniendo tasa de mortalidad del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Registrar muerte masiva
  async registrarMuerteMasiva(idGalpon, datosMuerte) {
    try {
      const response = await api.post(`/mortalidad/masiva/${idGalpon}`, datosMuerte)
      return response.mortalidad || response
    } catch (error) {
      console.error(`Error registrando muerte masiva en galpón ${idGalpon}:`, error)
      throw error
    }
  }
}
