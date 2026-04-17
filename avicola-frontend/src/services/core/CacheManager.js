/**
 * Gestor de caché en memoria con TTL
 * Optimiza peticiones repetitivas y mejora el rendimiento
 */
export class CacheManager {
  constructor(config = {}) {
    this.cache = new Map()
    this.defaultTTL = config.defaultTTL || 300 // 5 minutos por defecto
    this.maxSize = config.maxSize || 100 // Máximo 100 items por defecto
    this.cleanupInterval = config.cleanupInterval || 60000 // Limpieza cada minuto
    this.enabled = config.enabled !== false // Habilitado por defecto
    
    // Iniciar limpieza automática
    if (this.enabled) {
      this._startCleanup()
    }
  }

  /**
   * Obtener valor de la caché
   * @param {string} key - Clave del valor
   * @returns {any} Valor almacenado o null si no existe/expiró
   */
  get(key) {
    if (!this.enabled) return null
    
    const item = this.cache.get(key)
    if (!item) return null
    
    // Verificar si expiró
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }
    
    // Actualizar último acceso
    item.lastAccessed = Date.now()
    return item.value
  }

  /**
   * Guardar valor en la caché
   * @param {string} key - Clave del valor
   * @param {any} value - Valor a almacenar
   * @param {number} ttl - Tiempo de vida en segundos
   */
  set(key, value, ttl = this.defaultTTL) {
    if (!this.enabled) return
    
    // Verificar tamaño máximo
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this._evictLeastRecentlyUsed()
    }
    
    const expiresAt = Date.now() + (ttl * 1000)
    this.cache.set(key, {
      value,
      expiresAt,
      createdAt: Date.now(),
      lastAccessed: Date.now()
    })
  }

  /**
   * Eliminar valor de la caché
   * @param {string} key - Clave a eliminar
   * @returns {boolean} True si se eliminó
   */
  delete(key) {
    return this.cache.delete(key)
  }

  /**
   * Limpiar toda la caché
   */
  clear() {
    this.cache.clear()
  }

  /**
   * Limpiar entradas por patrón
   * @param {string} pattern - Patrón a buscar
   */
  clearByPattern(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Verificar si existe una clave
   * @param {string} key - Clave a verificar
   * @returns {boolean} True si existe y no ha expirado
   */
  has(key) {
    return this.get(key) !== null
  }

  /**
   * Obtener información de la caché
   * @returns {Object} Estadísticas de la caché
   */
  getInfo() {
    const now = Date.now()
    let expiredCount = 0
    let totalSize = 0
    
    for (const [key, item] of this.cache.entries()) {
      totalSize++
      if (now > item.expiresAt) {
        expiredCount++
      }
    }
    
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expiredCount,
      enabled: this.enabled,
      hitRate: this._calculateHitRate(),
      memoryUsage: this._estimateMemoryUsage()
    }
  }

  /**
   * Limpiar entradas expiradas
   * @private
   */
  _cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Iniciar limpieza automática
   * @private
   */
  _startCleanup() {
    setInterval(() => {
      this._cleanup()
    }, this.cleanupInterval)
  }

  /**
   * Evitar entrada menos usada recientemente (LRU)
   * @private
   */
  _evictLeastRecentlyUsed() {
    let oldestKey = null
    let oldestTime = Date.now()
    
    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed
        oldestKey = key
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  /**
   * Calcular tasa de aciertos (simulado)
   * @private
   */
  _calculateHitRate() {
    // En una implementación real, llevarías contadores de hits/misses
    return Math.random() * 100 // Simulado para demostración
  }

  /**
   * Estimar uso de memoria
   * @private
   */
  _estimateMemoryUsage() {
    let totalSize = 0
    for (const [key, item] of this.cache.entries()) {
      totalSize += JSON.stringify(item).length
    }
    return `${(totalSize / 1024).toFixed(2)} KB`
  }

  /**
   * Obtener todas las claves
   * @returns {Array<string>} Array de claves
   */
  keys() {
    return Array.from(this.cache.keys())
  }

  /**
   * Obtener todas las entradas válidas
   * @returns {Array<Object>} Array de entradas
   */
  entries() {
    const now = Date.now()
    const validEntries = []
    
    for (const [key, item] of this.cache.entries()) {
      if (now <= item.expiresAt) {
        validEntries.push({
          key,
          value: item.value,
          expiresAt: item.expiresAt,
          age: now - item.createdAt
        })
      }
    }
    
    return validEntries
  }

  /**
   * Deshabilitar la caché
   */
  disable() {
    this.enabled = false
    this.clear()
  }

  /**
   * Habilitar la caché
   */
  enable() {
    this.enabled = true
  }
}
