import { BaseService } from '../core/BaseService.js'
import { API_ENDPOINTS, CACHE_CONFIG, USER_ROLES } from '../types/index.js'
import { validators, compositeValidators } from '../utils/validators.js'
import { textFormatters } from '../utils/formatters.js'

/**
 * Servicio de Autenticación - Refactorizado con arquitectura limpia
 * Manejo seguro de tokens y sesiones
 */
export class AuthService extends BaseService {
  constructor() {
    super('auth', {
      defaultTTL: CACHE_CONFIG.DEFAULT_TTL,
      maxSize: 20 // Poca caché para datos de autenticación
    })
    this.tokenKey = 'authToken'
    this.userKey = 'user'
  }

  // ==================== MÉTODOS DE AUTENTICACIÓN ====================

  /**
   * Iniciar sesión
   */
  async login(credentials) {
    try {
      // Validar credenciales
      const validation = this._validateLoginCredentials(credentials)
      if (Object.keys(validation).length > 0) {
        throw new Error(`Validación: ${Object.values(validation).join(', ')}`)
      }

      const response = await this._handleApiCall(
        this.api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
        null, // No cachear login
        0
      )

      // Guardar token y usuario
      this._saveAuthData(response)

      return response.user || response
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error en inicio de sesión',
        'LOGIN_ERROR',
        { email: credentials.email }
      )
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(userData) {
    try {
      // Validar datos de registro
      const validation = this._validateRegisterData(userData)
      if (Object.keys(validation).length > 0) {
        throw new Error(`Validación: ${Object.values(validation).join(', ')}`)
      }

      const response = await this._handleApiCall(
        this.api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
        null, // No cachear registro
        0
      )

      // Si el registro incluye login automático
      this._saveAuthData(response)

      return response.user || response
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error en registro',
        'REGISTER_ERROR',
        { email: userData.email }
      )
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      // Notificar al backend
      await this._handleApiCall(
        this.api.post(API_ENDPOINTS.AUTH.LOGOUT),
        null,
        0
      )
    } catch (error) {
      console.warn('Error notificando logout al servidor:', error.message)
    } finally {
      // Siempre limpiar datos locales
      this._clearAuthData()
    }
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    try {
      const response = await this._handleApiCall(
        this.api.get(API_ENDPOINTS.AUTH.ME),
        'current_user',
        300 // 5 minutos para datos de usuario
      )

      // Actualizar usuario en localStorage
      if (response.user) {
        localStorage.setItem(this.userKey, JSON.stringify(response.user))
      }

      return response.user || response
    } catch (error) {
      // Si falla, limpiar datos posiblemente corruptos
      this._clearAuthData()
      throw error
    }
  }

  /**
   * Actualizar perfil
   */
  async updateProfile(profileData) {
    try {
      // Validar datos de perfil
      const validation = this._validateProfileData(profileData)
      if (Object.keys(validation).length > 0) {
        throw new Error(`Validación: ${Object.values(validation).join(', ')}`)
      }

      const response = await this._handleApiCall(
        this.api.put(API_ENDPOINTS.AUTH.PROFILE, profileData)
      )

      // Actualizar usuario en localStorage
      if (response.user) {
        localStorage.setItem(this.userKey, JSON.stringify(response.user))
      }

      // Invalidar caché de usuario actual
      this.cache.delete('current_user')

      return response.user || response
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error actualizando perfil',
        'UPDATE_PROFILE_ERROR',
        profileData
      )
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(passwordData) {
    try {
      // Validar datos de contraseña
      const validation = this._validatePasswordData(passwordData)
      if (Object.keys(validation).length > 0) {
        throw new Error(`Validación: ${Object.values(validation).join(', ')}`)
      }

      await this._handleApiCall(
        this.api.put(API_ENDPOINTS.AUTH.PASSWORD, passwordData),
        null,
        0
      )

      return { success: true, message: 'Contraseña actualizada exitosamente' }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error cambiando contraseña',
        'CHANGE_PASSWORD_ERROR',
        { hasCurrentPassword: !!passwordData.currentPassword }
      )
    }
  }

  // ==================== MÉTODOS DE VERIFICACIÓN ====================

  /**
   * Verificar si está autenticado
   */
  isAuthenticated() {
    const token = this.getToken()
    const user = this.getUserFromStorage()
    return !!(token && user)
  }

  /**
   * Verificar si el token está expirado
   */
  isTokenExpired() {
    const token = this.getToken()
    if (!token) return true

    try {
      // Decodificar token JWT (implementación básica)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      return payload.exp < now
    } catch (error) {
      return true // Si no se puede decodificar, considerar expirado
    }
  }

  /**
   * Verificar rol del usuario
   */
  hasRole(requiredRole) {
    const user = this.getUserFromStorage()
    return user && user.rol === requiredRole
  }

  /**
   * Verificar si tiene permisos de administrador
   */
  isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN)
  }

  /**
   * Obtener token de autenticación
   */
  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  /**
   * Obtener usuario del localStorage
   */
  getUserFromStorage() {
    try {
      const userStr = localStorage.getItem(this.userKey)
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error('Error parseando usuario desde localStorage:', error)
      return null
    }
  }

  // ==================== MÉTODOS DE SEGURIDAD ====================

  /**
   * Refrescar token automáticamente
   */
  async refreshToken() {
    try {
      const response = await this._handleApiCall(
        this.api.post('/auth/refresh'),
        null,
        0
      )

      if (response.token) {
        localStorage.setItem(this.tokenKey, response.token)
      }

      return response.token
    } catch (error) {
      // Si no se puede refrescar, limpiar sesión
      this._clearAuthData()
      throw error
    }
  }

  /**
   * Verificar y refrescar token si es necesario
   */
  async ensureValidToken() {
    if (!this.isAuthenticated()) {
      throw new Error('No hay sesión activa')
    }

    if (this.isTokenExpired()) {
      await this.refreshToken()
    }

    return true
  }

  /**
   * Iniciar sesión automática con token guardado
   */
  async autoLogin() {
    if (!this.getToken()) {
      return null
    }

    try {
      if (this.isTokenExpired()) {
        await this.refreshToken()
      }

      return await this.getCurrentUser()
    } catch (error) {
      this._clearAuthData()
      return null
    }
  }

  // ==================== VALIDACIÓN ====================

  /**
   * Validar credenciales de login
   */
  _validateLoginCredentials(credentials) {
    const errors = {}

    if (validators.isRequired(credentials.email)) {
      errors.email = validators.isRequired(credentials.email)
    } else if (validators.email(credentials.email)) {
      errors.email = validators.email(credentials.email)
    }

    if (validators.isRequired(credentials.password)) {
      errors.password = validators.isRequired(credentials.password)
    } else if (validators.minLength(6)(credentials.password)) {
      errors.password = validators.minLength(6)(credentials.password)
    }

    return errors
  }

  /**
   * Validar datos de registro
   */
  _validateRegisterData(userData) {
    const errors = {}

    // Validar email
    if (validators.isRequired(userData.email)) {
      errors.email = validators.isRequired(userData.email)
    } else if (validators.email(userData.email)) {
      errors.email = validators.email(userData.email)
    }

    // Validar contraseña
    if (validators.isRequired(userData.password)) {
      errors.password = validators.isRequired(userData.password)
    } else if (validators.minLength(8)(userData.password)) {
      errors.password = validators.minLength(8)(userData.password)
    }

    // Validar confirmación de contraseña
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden'
    }

    // Validar nombre
    if (validators.isRequired(userData.nombre)) {
      errors.nombre = validators.isRequired(userData.nombre)
    } else if (validators.minLength(2)(userData.nombre)) {
      errors.nombre = validators.minLength(2)(userData.nombre)
    }

    return errors
  }

  /**
   * Validar datos de perfil
   */
  _validateProfileData(profileData) {
    const errors = {}

    if (profileData.nombre && validators.minLength(2)(profileData.nombre)) {
      errors.nombre = validators.minLength(2)(profileData.nombre)
    }

    if (profileData.email && validators.email(profileData.email)) {
      errors.email = validators.email(profileData.email)
    }

    return errors
  }

  /**
   * Validar datos de cambio de contraseña
   */
  _validatePasswordData(passwordData) {
    const errors = {}

    if (validators.isRequired(passwordData.currentPassword)) {
      errors.currentPassword = validators.isRequired(passwordData.currentPassword)
    }

    if (validators.isRequired(passwordData.newPassword)) {
      errors.newPassword = validators.isRequired(passwordData.newPassword)
    } else if (validators.minLength(8)(passwordData.newPassword)) {
      errors.newPassword = validators.minLength(8)(passwordData.newPassword)
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas nuevas no coinciden'
    }

    return errors
  }

  // ==================== MÉTODOS PRIVADOS ====================

  /**
   * Guardar datos de autenticación
   */
  _saveAuthData(response) {
    if (response.token) {
      localStorage.setItem(this.tokenKey, response.token)
    }

    if (response.user) {
      localStorage.setItem(this.userKey, JSON.stringify(response.user))
    }
  }

  /**
   * Limpiar datos de autenticación
   */
  _clearAuthData() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
    this.cache.clear()
  }

  /**
   * Formatear datos de usuario para display
   */
  formatUserDisplay(user) {
    if (!user) return null

    return {
      ...user,
      nombreCompleto: textFormatters.titleCase(user.nombre),
      rolFormateado: this._formatRole(user.rol),
      emailFormateado: user.email.toLowerCase(),
      inicial: user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'
    }
  }

  /**
   * Formatear rol para display
   */
  _formatRole(role) {
    const roles = {
      [USER_ROLES.ADMIN]: 'Administrador',
      [USER_ROLES.OPERARIO]: 'Operario',
      [USER_ROLES.SUPERVISOR]: 'Supervisor',
      [USER_ROLES.VETERINARIO]: 'Veterinario'
    }
    return roles[role] || 'Desconocido'
  }

  /**
   * Generar reporte de actividad del usuario
   */
  async generarReporteActividad(userId, dias = 30) {
    try {
      const response = await this._handleApiCall(
        this.api.get(`/auth/actividad/${userId}`, { dias }),
        `actividad_${userId}_${dias}`,
        CACHE_CONFIG.STATISTICS_TTL
      )

      return {
        resumen: {
          totalAcciones: response.totalAcciones || 0,
          ultimaSesion: response.ultimaSesion,
          promedioDiario: response.promedioDiario || 0
        },
        actividades: response.actividades || [],
        periodo: `${dias} días`,
        fechaGeneracion: new Date().toISOString()
      }
    } catch (error) {
      throw this.errorHandler.createCustomError(
        'Error generando reporte de actividad',
        'GENERATE_ACTIVITY_REPORT',
        { userId, dias }
      )
    }
  }
}

// Exportar instancia única para uso en toda la aplicación
export const authService = new AuthService()
