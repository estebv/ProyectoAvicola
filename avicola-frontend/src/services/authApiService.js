import { api } from './api.js'

// Servicio de autenticación que conecta con el backend Spring Boot
export const authApiService = {
  // Iniciar sesión
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      
      // Guardar token en localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token)
      }
      
      // Guardar información del usuario
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return response.user
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  },

  // Registrar nuevo usuario
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      
      // Si el registro incluye login automático
      if (response.token) {
        localStorage.setItem('authToken', response.token)
      }
      
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return response.user
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      // Llamar al endpoint de logout si existe
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  },

  // Obtener perfil del usuario actual
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me')
      return response.user
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error)
      throw error
    }
  },

  // Actualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData)
      
      // Actualizar usuario en localStorage
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      return response.user
    } catch (error) {
      console.error('Error actualizando perfil:', error)
      throw error
    }
  },

  // Cambiar contraseña
  async changePassword(passwordData) {
    try {
      await api.put('/auth/password', passwordData)
    } catch (error) {
      console.error('Error cambiando contraseña:', error)
      throw error
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    return !!(token && user)
  },

  // Obtener usuario del localStorage
  getUserFromStorage() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Obtener token del localStorage
  getToken() {
    return localStorage.getItem('authToken')
  }
}
