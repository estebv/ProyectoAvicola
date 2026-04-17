import { api } from './api.js'

/**
 * Servicio para gestionar galpones
 * Tabla: galpon (id_galpon, numero_Galpon, numero_aves)
 */
export const galponService = {
  // Obtener todos los galpones
  async getAll() {
    try {
      const response = await api.get('/galpones')
      return response.galpones || response
    } catch (error) {
      console.error('Error obteniendo galpones:', error)
      throw error
    }
  },

  // Obtener un galpon por ID
  async getById(id) {
    try {
      const response = await api.get(`/galpones/${id}`)
      return response.galpon || response
    } catch (error) {
      console.error(`Error obteniendo galpón ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo galpón
  async create(galponData) {
    try {
      const response = await api.post('/galpones', galponData)
      return response.galpon || response
    } catch (error) {
      console.error('Error creando galpón:', error)
      throw error
    }
  },

  // Actualizar galpón existente
  async update(id, galponData) {
    try {
      const response = await api.put(`/galpones/${id}`, galponData)
      return response.galpon || response
    } catch (error) {
      console.error(`Error actualizando galpón ${id}:`, error)
      throw error
    }
  },

  // Eliminar galpón
  async delete(id) {
    try {
      await api.delete(`/galpones/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando galpón ${id}:`, error)
      throw error
    }
  },

  // Obtener galpones con capacidad disponible
  async getWithCapacity() {
    try {
      const response = await api.get('/galpones/disponibles')
      return response.galpones || response
    } catch (error) {
      console.error('Error obteniendo galpones disponibles:', error)
      throw error
    }
  },

  // Actualizar número de aves en galpón
  async updateBirdCount(id, numeroAves) {
    try {
      const response = await api.patch(`/galpones/${id}/aves`, { numero_aves: numeroAves })
      return response.galpon || response
    } catch (error) {
      console.error(`Error actualizando conteo de aves en galpón ${id}:`, error)
      throw error
    }
  }
}
