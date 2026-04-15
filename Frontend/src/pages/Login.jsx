import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { loginWithEmail, registerWithEmail } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { dispatch } = useApp()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = isRegister
        ? await registerWithEmail(form)
        : await loginWithEmail(form)
      // 2) guarda sesión en contexto + localStorage (vía reducer)
      dispatch({ type: 'LOGIN', payload: user })

      // Redirige a la ruta previa si el usuario intentaba abrir una ruta protegida.
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Usa el acceso de prueba: `admin@avicola.com` / `123456`.
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
                onChange={event => setForm(prev => ({ ...prev, nombre: event.target.value }))}
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
              onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
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
              onChange={event => setForm(prev => ({ ...prev, password: event.target.value }))}
              placeholder="******"
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Validando...' : isRegister ? 'Registrarme' : 'Entrar'}
          </button>
          <button
            type="button"
            className="w-full text-sm text-gray-600 hover:text-gray-900"
            onClick={() => {
              setIsRegister(!isRegister)
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
