import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useApp } from '../components/ui/context/AppContext'
import { updateUserProfile } from '../services/authService'
import { Toast } from '../components/ui'
import { User, Mail, Shield, Save, Loader2 } from 'lucide-react'

export default function Perfil() {
  const { state, dispatch } = useApp()
  const [nombre, setNombre] = useState(state.user?.nombre ?? '')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setToast(null)
    setLoading(true)

    try {
      const updatedProfile = await updateUserProfile({
        email: state.user.email,
        nombre,
        password,
      })
      dispatch({ type: 'UPDATE_USER', payload: updatedProfile })
      setToast({ tipo: 'exito', mensaje: 'Perfil actualizado correctamente' })
      setPassword('')
    } catch (err) {
      setToast({ tipo: 'error', mensaje: err.message || 'Error al actualizar el perfil' })
    } finally {
      setLoading(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <Layout titulo="👤 Mi perfil">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar de Perfil */}
          <div className="md:col-span-1">
            <div className="card p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-50 rounded-[2rem] flex items-center justify-center text-3xl font-black text-brand-200 mb-4 border-2 border-brand-100">
                {state.user?.nombre?.[0] || 'U'}
              </div>
              <h2 className="text-xl font-black text-gray-900">{state.user?.nombre}</h2>
              <p className="text-sm font-bold text-brand-200 uppercase tracking-widest mt-1">{state.user?.rol}</p>
              
              <div className="w-full h-px bg-gray-100 my-6"></div>
              
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 text-gray-500">
                  <Mail size={18} className="shrink-0" />
                  <span className="text-sm truncate font-medium">{state.user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Shield size={18} className="shrink-0" />
                  <span className="text-sm font-medium capitalize">{state.user?.rol}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Edición */}
          <div className="md:col-span-2">
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Configuración</h3>
                  <p className="text-sm text-gray-400 font-medium">Actualiza tu información personal</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Rol del sistema</label>
                    <input className="input-field bg-gray-50 cursor-not-allowed opacity-60" value={state.user?.rol ?? ''} disabled />
                  </div>
                  <div>
                    <label className="label">Correo electrónico</label>
                    <input className="input-field bg-gray-50 cursor-not-allowed opacity-60" value={state.user?.email ?? ''} disabled />
                  </div>
                </div>

                <div>
                  <label className="label">Nombre completo</label>
                  <input 
                    className="input-field" 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)} 
                    required 
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="label">Cambiar contraseña</label>
                  <input
                    className="input-field"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Dejar vacío para mantener la actual"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Seguridad: Mínimo 6 caracteres</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button className="btn-primary w-full sm:w-auto px-10 justify-center gap-3" type="submit" disabled={loading}>
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Save size={20} />
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
