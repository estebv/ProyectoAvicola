import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../components/ui/context/AppContext'
import { api } from '../services/api'
import { CheckboxGroup } from '../components/ui/Checkbox'

// ─────────────────────────────────────────────────────────────────
//  ✅ CORRECCIÓN BUG 1:
//  Antes: llamaba a loginWithEmail() de authService.js, que era
//         un mock que solo buscaba en localStorage. NUNCA llamaba
//         al backend Spring Boot.
//  Ahora: llama directamente a api.post('/auth/login') y
//         api.post('/auth/register') que sí van al backend real.
// ─────────────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { dispatch } = useApp()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'usuario' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Sincronizar el modo registro con el parámetro de la URL
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'register') {
      setIsRegister(true)
    } else {
      setIsRegister(false)
    }
  }, [searchParams])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      let user

      if (isRegister) {
        // ✅ POST /api/auth/register → crea usuario en MySQL
        user = await api.post('/auth/register', {
          nombre:   form.nombre.trim(),
          email:    form.email.trim().toLowerCase(),
          password: form.password,
          rol:      form.rol,
        })
      } else {
        // ✅ POST /api/auth/login → valida credenciales en MySQL
        user = await api.post('/auth/login', {
          email:    form.email.trim().toLowerCase(),
          password: form.password,
        })
      }

      // Guarda la sesión en contexto + localStorage
      dispatch({ type: 'LOGIN', payload: user })

      const redirectTo = location.state?.from || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Acceso de prueba: <code>admin@avicola.com</code> / <code>123456</code>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="label">Nombre</label>
              <input
                type="text"
                required
                className="input-field"
                value={form.nombre}
                onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Tu nombre completo"
              />
            </div>
          )}

          <div>
            <label className="label">Correo</label>
            <input
              type="email"
              required
              className="input-field"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@avicola.com"
            />
          </div>

          <div>
            <label className="label">Contraseña</label>
            <input
              type="password"
              required
              className="input-field"
              value={form.password}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="******"
            />
          </div>

          {isRegister && (
            <div>
              <label className="label">Tipo de usuario</label>
              <CheckboxGroup
                options={[
                  { value: 'admin',   label: 'Administrador', description: 'Acceso completo al sistema' },
                  { value: 'usuario', label: 'Usuario',       description: 'Acceso básico operativo' },
                ]}
                value={form.rol}
                onChange={v => setForm(prev => ({ ...prev, rol: v }))}
                name="tipo-usuario"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Validando...' : isRegister ? 'Registrarme' : 'Entrar'}
          </button>

          <button
            type="button"
            className="w-full text-sm text-gray-600 hover:text-gray-900"
            onClick={() => { 
              const newMode = isRegister ? 'login' : 'register'
              navigate(`/login?mode=${newMode}`)
              setError('') 
            }}
          >
            {isRegister ? 'Ya tengo cuenta' : 'No tengo cuenta, registrarme'}
          </button>
        </form>
      </div>
    </div>
  )
}
