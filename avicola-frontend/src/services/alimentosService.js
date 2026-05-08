import { api } from './api.js'

/**
 * Servicio para gestionar alimentos
 * Tabla: alimentos (alimento_id, marca_Alimento, etapa_alimento, fecha_consumo, cantidad_kg, id_galpon)
 */
export const alimentosService = {
  // Obtener todos los registros de alimentos
  async getAll() {
    try {
      const response = await api.get('/alimentos')
      return response.alimentos || response
    } catch (error) {
      console.error('Error obteniendo registros de alimentos:', error)
      throw error
    }
  },

  // Obtener alimentos por galpón
  async getByGalpon(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/alimentos/galpon/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.alimentos || response
    } catch (error) {
      console.error(`Error obteniendo alimentos del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener registro por ID
  async getbyId(id) {
    try {
      const response = await api.get(`/alimentos/${id}`)
      return response.alimento || response
    } catch (error) {
      console.error(`Error obteniendo registro de alimento ${id}:`, error)
      throw error
    }
  },

  // Crear nuevo registro de consumo de alimento
  async create(alimentosData) {
    try {
      const response = await api.post('/alimentos', alimentosData)
      return response.alimento || response
    } catch (error) {
      console.error('Error creando registro de alimento:', error)
      throw error
    }
  },

  // Actualizar registro de alimento
  async update(id, alimentosData) {
    try {
      const response = await api.put(`/alimentos/${id}`, alimentosData)
      return response.alimento || response
    } catch (error) {
      console.error(`Error actualizando registro de alimento ${id}:`, error)
      throw error
    }
  },

  // Eliminar registro de alimento
  async delete(id) {
    try {
      await api.delete(`/alimentos/${id}`)
      return true
    } catch (error) {
      console.error(`Error eliminando registro de alimento ${id}:`, error)
      throw error
    }
  },

  // Obtener alimentos por marca
  async getByMarca(marca) {
    try {
      const response = await api.get(`/alimentos/marca/${marca}`)
      return response.alimentos || response
    } catch (error) {
      console.error(`Error obteniendo alimentos de marca ${marca}:`, error)
      throw error
    }
  },

  // Obtener alimentos por etapa
  async getByEtapa(etapa) {
    try {
      const response = await api.get(`/alimentos/etapa/${etapa}`)
      return response.alimentos || response
    } catch (error) {
      console.error(`Error obteniendo alimentos de etapa ${etapa}:`, error)
      throw error
    }
  },

  // Obtener consumo total por período
  async getConsumoTotal(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/alimentos/consumo-total/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.consumo || response
    } catch (error) {
      console.error(`Error obteniendo consumo total del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener consumo diario promedio
  async getConsumoDiarioPromedio(idGalpon, dias = 7) {
    try {
      const response = await api.get(`/alimentos/consumo-promedio/${idGalpon}?dias=${dias}`)
      return response.promedio || response
    } catch (error) {
      console.error(`Error obteniendo consumo promedio del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener conversión alimenticia (kg alimento / kg huevo)
  async getConversionAlimenticia(idGalpon, dias = 30) {
    try {
      const response = await api.get(`/alimentos/conversion/${idGalpon}?dias=${dias}`)
      return response.conversion || response
    } catch (error) {
      console.error(`Error obteniendo conversión alimenticia del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener costo de alimentación
  async getCostoAlimentacion(idGalpon, fechaInicio, fechaFin) {
    try {
      let url = `/alimentos/costo/${idGalpon}`
      const params = new URLSearchParams()
      
      if (fechaInicio) params.append('fechaInicio', fechaInicio)
      if (fechaFin) params.append('fechaFin', fechaFin)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await api.get(url)
      return response.costo || response
    } catch (error) {
      console.error(`Error obteniendo costo de alimentación del galpón ${idGalpon}:`, error)
      throw error
    }
  },

  // Obtener inventario de alimentos
  async getInventario() {
    try {
      const response = await api.get('/alimentos/inventario')
      return response.inventario || response
    } catch (error) {
      console.error('Error obteniendo inventario de alimentos:', error)
      throw error
    }
  },

  // Obtener alimentos próximos a vencer
  async getProximosVencer(dias = 30) {
    try {
      const response = await api.get(`/alimentos/proximos-vencer?dias=${dias}`)
      return response.alimentos || response
    } catch (error) {
      console.error('Error obteniendo alimentos próximos a vencer:', error)
      throw error
    }
  }
}
