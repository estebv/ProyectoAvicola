import { api } from './api.js'

/**
 * Servicio para gestionar aves
 * Tabla: aves (ave_id, raza, fecha_nacimiento, fecha_llegada, origen, total_aves, id_galpon)
 */
export const avesService = {
  // Obtener todos los lotes de aves
  async getAll() {
    try {
      const response = await api.get('/aves')
      return response.aves || response
    } catch (error) {
      console.error('Error obteniendo aves:', error)
      throw error
    }
  },

  // Obtener aves por galpón
  async getByGalpon(idGalpon) {
    try {
      const response = await api.get(`/aves/galpon/${idGalpon}`)
      return response.aves || response
    } catch (error) {
      console.error(`Error obteniendo aves del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener un lote de aves por ID
  async getById(id) {
    try {
      const response = await api.get(`/aves/${id}`)
      return response.aves || response
    } catch (error) {
      console.error(`Error obteniendo lote de aves ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo lote de aves
  async create(avesData) {
    try {
      const response = await api.post('/aves', avesData)
      return response.aves || response
    } catch (error) {
      console.error('Error creando lote de aves:', error)
      throw error
    }
  },

  // Actualizar lote de aves
  async update(id, avesData) {
    try {
      const response = await api.put(`/aves/${id}`, avesData)
      return response.aves || response
    } catch (error) {
      console.error(`Error actualizando lote de aves ${id}:`, error)
      throw error
    }
  },

  // Eliminar lote de aves
  async delete(id) {
    try {
      await api.delete(`/aves/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando lote de aves ${id}:`, error)
      throw error
    }
  },

  // Actualizar conteo de aves (muertes, ventas, etc.)
  async updateCount(id, nuevoTotal) {
    try {
      const response = await api.patch(`/aves/${id}/conteo`, { total_aves: nuevoTotal })
      return response.aves || response
    } catch (error) {
      console.error(`Error actualizando conteo de aves ${id}:`, error)
      throw error
    }
  },

  // Obtener aves por raza
  async getByRaza(raza) {
    try {
      const response = await api.get(`/aves/raza/${raza}`)
      return response.aves || response
    } catch (error) {
      console.error(`Error obteniendo aves de raza ${raza}:`, error)
      throw error
    }
  },

  // Obtener aves por rango de fechas de llegada
  async getByFechaLlegada(fechaInicio, fechaFin) {
    try {
      let url = '/aves/fecha-llegada'
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.aves || response
    } catch (error) {
      console.error('Error obteniendo aves por fecha de llegada:', error)
      throw error
    }
  },

  // Obtener estadísticas de aves
  async getEstadisticas() {
    try {
      const response = await api.get('/aves/estadisticas')
      return response.estadisticas || response
    } catch (error) {
      console.error('Error obteniendo estadísticas de aves:', error)
      throw error
    }
  }
}
