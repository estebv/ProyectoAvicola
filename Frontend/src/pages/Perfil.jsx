import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useApp } from '../context/AppContext'
import { updateUserProfile } from '../services/authService'

export default function Perfil() {
  const { state, dispatch } = useApp()
  const [nombre, setNombre] = useState(state.user?.nombre ?? '')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMensaje('')
    setError('')
    setLoading(true)

    try {
      const updatedProfile = await updateUserProfile({
        email: state.user.email,
        nombre,
        password,
      })
      dispatch({ type: 'UPDATE_USER', payload: updatedProfile })
      setMensaje('Perfil actualizado correctamente')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout titulo="👤 Mi perfil">
      <div className="card p-6 max-w-xl">
        <p className="text-sm text-gray-500 mb-4">Actualiza tus datos de acceso y nombre visible.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">Rol</label>
            <input className="input-field bg-gray-50" value={state.user?.rol ?? ''} disabled />
          </div>
          <div>
            <label className="label">Correo</label>
            <input className="input-field bg-gray-50" value={state.user?.email ?? ''} disabled />
          </div>
          <div>
            <label className="label">Nombre</label>
            <input className="input-field" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div>
            <label className="label">Nueva contraseña (opcional)</label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </Layout>
  )
}
