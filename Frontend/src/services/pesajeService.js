import { api } from './api.js'

/**
 * Servicio para gestionar pesaje de aves
 * Tabla: pesaje (pesaje_id, numero_ave, estado_salud, peso, fecha_Pesaje, id_galpon)
 */
export const pesajeService = {
  // Obtener todos los registros de pesaje
  async getAll() {
    try {
      const response = await api.get('/pesaje')
      return response.pesajes || response
    } catch (error) {
      console.error('Error obteniendo registros de pesaje:', error)
      throw error
    }
  },

  // Obtener pesajes por galpón
  async getByGalpon(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/pesaje/galpon/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.pesajes || response
    } catch (error) {
      console.error(`Error obteniendo pesajes del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener pesaje por ID
  async getById(id) {
    try {
      const response = await api.get(`/pesaje/${id}`)
      return response.pesaje || response
    } catch (error) {
      console.error(`Error obteniendo pesaje ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo registro de pesaje
  async create(pesajeData) {
    try {
      const response = await api.post('/pesaje', pesajeData)
      return response.pesaje || response
    } catch (error) {
      console.error('Error creando registro de pesaje:', error)
      throw error
    }
  },

  // Crear pesaje masivo (múltiples aves)
  async createMasivo(pesajesData) {
    try {
      const response = await api.post('/pesaje/masivo', { pesajes: pesajesData })
      return response.pesajes || response
    } catch (error) {
      console.error('Error creando pesaje masivo:', error)
      throw error
    }
  },

  // Actualizar registro de pesaje
  async update(id, pesajeData) {
    try {
      const response = await api.put(`/pesaje/${id}`, pesajeData)
      return response.pesaje || response
    } catch (error) {
      console.error(`Error actualizando pesaje ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro de pesaje
  async delete(id) {
    try {
      await api.delete(`/pesaje/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando pesaje ${id}:`, error)
      throw error
    }
  },

  // Obtener peso promedio por galpón
  async getPesoPromedio(idGalpon, dias = 7) {
    try {
      const response = await api.get(`/pesaje/promedio/${idGalpon}?dias=${dias}`)
      return response.promedio || response
    } catch (error) {
      console.error(`Error obteniendo peso promedio del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener tendencia de peso
  async getTendenciaPeso(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/pesaje/tendencia/${idGalpon}?dias=${dias}`)
      return response.tendencia || response
    } catch (error) {
      console.error(`Error obteniendo tendencia de peso del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener aves bajo peso
  async getAvesBajoPeso(idGalpon, pesoMinimo) {
    try {
      const response = await api.get(`/pesaje/bajo-peso/${idGalpon}?pesoMinimo=${pesoMinimo}`)
      return response.aves || response
    } catch (error) {
      console.error(`Error obteniendo aves bajo peso del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener distribución de pesos
  async getDistribucionPesos(idGalpon) {
    try {
      const response = await api.get(`/pesaje/distribucion/${idGalpon}`)
      return response.distribucion || response
    } catch (error) {
      console.error(`Error obteniendo distribución de pesos del galpón ${idGalpon}:`, error)
      throw error
    }
  }
}
