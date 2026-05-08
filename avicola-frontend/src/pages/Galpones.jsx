import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useApp } from '../components/ui/context/AppContext'
import { Campo, Toast, Badge, ModalConfirm, Modal } from '../components/ui'
import { Plus, Save, Trash2, Edit3 } from 'lucide-react'
import { api } from '../services/api'
import { isAdmin } from '../helpers/permissions'

// ─────────────────────────────────────────────────────────────────
//  ✅ CORRECCIÓN BUG 2 (Galpones):
//  Antes: guardar() solo hacía dispatch(ADD_GALPON) → datos en RAM.
//  Ahora: primero llama a api.post('/galpones') para guardar en MySQL,
//         y solo si el backend responde OK, hace dispatch con el objeto
//         real que devolvió el backend (con el ID real de la BD).
// ─────────────────────────────────────────────────────────────────

const formVacio = { numero: '', numero_aves: '', raza: '', estado: 'activo' }
const razas = ['Lohmann', 'Hy-Line', 'Shaver', 'ISA Brown', 'Novogen', 'Otra']

export default function Galpones() {
  const { state, dispatch } = useApp()
  const admin = isAdmin(state.user)
  const [form, setForm]           = useState(formVacio)
  const [errores, setErrores]     = useState({})
  const [toast, setToast]         = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [registroEdit, setRegistroEdit] = useState(null)
  const [registroElim, setRegistroElim] = useState(null)

  function validar() {
    const e = {}
    if (!form.numero    || form.numero    <= 0) e.numero     = 'Ingresa el número del galpón'
    if (!form.numero_aves || form.numero_aves <= 0) e.numero_aves = 'Ingresa el número de aves'
    if (!form.raza) e.raza = 'Selecciona la raza'
    return e
  }

  async function guardar(e) {
    e.preventDefault()
    const e2 = validar()
    setErrores(e2)
    if (Object.keys(e2).length > 0) return

    setGuardando(true)
    try {
      // ✅ 1. Guarda en MySQL a través del backend
      // El backend espera: { numero, numero_aves, raza, estado }
      // y devuelve el galpón con su ID real asignado por la BD
      const galponGuardado = await api.post('/galpones', {
        numero:     Number(form.numero),
        numero_aves: Number(form.numero_aves),
        raza:       form.raza,
        estado:     form.estado,
      })

      // ✅ 2. Actualiza el estado local con el objeto real del backend
      dispatch({ type: 'ADD_GALPON', payload: galponGuardado })

      setToast({ tipo: 'exito', mensaje: '✅ Galpón registrado correctamente' })
      setForm(formVacio)
      setMostrarForm(false)
    } catch (err) {
      setToast({ tipo: 'error', mensaje: `❌ ${err.message}` })
    } finally {
      setGuardando(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  async function handleUpdate() {
    setGuardando(true)
    try {
      const actualizado = await api.put(`/galpones/${registroEdit.id}`, {
        numero:     Number(registroEdit.numero),
        numero_aves: Number(registroEdit.numero_aves),
        raza:       registroEdit.raza,
        estado:     registroEdit.estado,
      })
      dispatch({ type: 'UPDATE_GALPON', payload: actualizado })
      setToast({ tipo: 'exito', mensaje: '✅ Galpón actualizado' })
      setRegistroEdit(null)
    } catch (err) {
      setToast({ tipo: 'error', mensaje: `❌ ${err.message}` })
    } finally {
      setGuardando(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  async function handleEliminar() {
    setGuardando(true)
    try {
      await api.delete(`/galpones/${registroElim}`)
      dispatch({ type: 'DELETE_GALPON', payload: { id: registroElim } })
      setToast({ tipo: 'exito', mensaje: '✅ Galpón eliminado' })
      setRegistroElim(null)
    } catch (err) {
      setToast({ tipo: 'error', mensaje: `❌ ${err.message}` })
    } finally {
      setGuardando(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const totalAves = state.galpones.reduce((s, g) => s + g.numero_aves, 0)

  return (
    <Layout titulo="🏠 Galpones">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="card p-4 border-2 border-amber-100 flex items-center gap-3">
          <span className="text-3xl">🏠</span>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Total galpones</p>
            <p className="text-3xl font-bold text-amber-700">{state.galpones.length}</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <span className="text-3xl">🐔</span>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Total aves</p>
            <p className="text-3xl font-bold text-gray-800">{totalAves.toLocaleString()}</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">En alerta</p>
            <p className="text-3xl font-bold text-amber-600">
              {state.galpones.filter(g => g.estado === 'alerta').length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <p className="text-gray-500 text-sm">Administra tus galpones y el número de aves</p>
        <button onClick={() => setMostrarForm(!mostrarForm)} className="btn-primary">
          <Plus size={18} /> Nuevo galpón
        </button>
      </div>

      {mostrarForm && (
        <div className="card p-6 mb-6 border-2 border-brand-100">
          <h2 className="section-title mb-5">📋 Registrar galpón</h2>
          <form onSubmit={guardar} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Campo label="Número del galpón" requerido error={errores.numero}>
                <input type="number" min="1" placeholder="Ej: 6" className="input-field text-xl font-bold"
                  value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} />
              </Campo>
              <Campo label="Número de aves" requerido error={errores.numero_aves}>
                <input type="number" min="1" placeholder="Ej: 4500" className="input-field"
                  value={form.numero_aves} onChange={e => setForm({ ...form, numero_aves: e.target.value })} />
              </Campo>
            </div>

            <Campo label="Raza de las aves" requerido error={errores.raza}>
              <div className="grid grid-cols-3 gap-2">
                {razas.map(r => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, raza: r })}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all
                      ${form.raza === r ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </Campo>

            <Campo label="Estado">
              <div className="flex gap-3">
                {['activo', 'alerta', 'critico'].map(est => (
                  <button key={est} type="button" onClick={() => setForm({ ...form, estado: est })}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold capitalize transition-all
                      ${form.estado === est
                        ? est === 'activo'  ? 'border-green-400 bg-green-50 text-green-800'
                        : est === 'alerta'  ? 'border-amber-400 bg-amber-50 text-amber-800'
                        : 'border-red-400 bg-red-50 text-red-800'
                        : 'border-gray-200 text-gray-600'}`}>
                    {est === 'activo' ? '✓ Activo' : est === 'alerta' ? '⚠ Alerta' : '✕ Crítico'}
                  </button>
                ))}
              </div>
            </Campo>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setMostrarForm(false)} className="btn-secondary">Cancelar</button>
              <button type="submit" disabled={guardando} className="btn-primary flex-1 justify-center">
                <Save size={18} /> {guardando ? 'Guardando...' : 'Guardar galpón'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.galpones.map(g => {
          const huevosHoy = state.huevos
            .filter(h => h.id_galpon === g.id && h.fecha_puesta === new Date().toISOString().split('T')[0])
            .reduce((s, h) => s + Number(h.total_huevo), 0)

          return (
            <div key={g.id} className={`card p-5 border-2 transition-all
              ${g.estado === 'alerta' ? 'border-amber-200' : g.estado === 'critico' ? 'border-red-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold
                  ${g.estado === 'alerta' ? 'bg-amber-100 text-amber-700' : g.estado === 'critico' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  G{g.numero}
                </div>
                <div className="flex items-center gap-2">
                  <Badge estado={g.estado} />
                  {admin && (
                    <div className="flex gap-1">
                      <button onClick={() => setRegistroEdit({...g})} className="p-1.5 text-gray-400 hover:text-brand-200 transition-colors" title="Editar">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => setRegistroElim(g.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Galpón {g.numero}</h3>
              <p className="text-sm text-gray-500 mb-4">Raza: <span className="font-semibold text-gray-700">{g.raza}</span></p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Aves activas</p>
                  <p className="text-2xl font-bold text-gray-800">{g.numero_aves.toLocaleString()}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs text-amber-600 font-semibold uppercase mb-1">Huevos hoy</p>
                  <p className="text-2xl font-bold text-amber-700">{huevosHoy.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Edición */}
      {registroEdit && (
        <Modal 
          titulo={`Editar Galpón ${registroEdit.numero}`}
          onClose={() => setRegistroEdit(null)}
          onConfirm={handleUpdate}
          loading={guardando}
          icon={Edit3}
          color="brand"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Campo label="Número del galpón">
                <input type="number" className="input-field text-xl font-bold"
                  value={registroEdit.numero} onChange={e => setRegistroEdit({ ...registroEdit, numero: e.target.value })} />
              </Campo>
              <Campo label="Número de aves">
                <input type="number" className="input-field"
                  value={registroEdit.numero_aves} onChange={e => setRegistroEdit({ ...registroEdit, numero_aves: e.target.value })} />
              </Campo>
            </div>
            <Campo label="Raza de las aves">
              <select className="input-field" value={registroEdit.raza}
                onChange={e => setRegistroEdit({ ...registroEdit, raza: e.target.value })}>
                {razas.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </Campo>
            <Campo label="Estado">
              <div className="flex gap-2">
                {['activo', 'alerta', 'critico'].map(est => (
                  <button key={est} type="button" onClick={() => setRegistroEdit({ ...registroEdit, estado: est })}
                    className={`flex-1 py-2 rounded-xl border-2 text-xs font-bold capitalize transition-all
                      ${registroEdit.estado === est
                        ? est === 'activo'  ? 'border-green-400 bg-green-50 text-green-800'
                        : est === 'alerta'  ? 'border-amber-400 bg-amber-50 text-amber-800'
                        : 'border-red-400 bg-red-50 text-red-800'
                        : 'border-gray-100 text-gray-400'}`}>
                    {est}
                  </button>
                ))}
              </div>
            </Campo>
          </div>
        </Modal>
      )}

      {/* Modal de Eliminación */}
      {registroElim && (
        <ModalConfirm 
          titulo="¿Eliminar galpón?"
          mensaje="Esta acción es irreversible. Se perderán todos los datos asociados a este galpón (producción, mortalidad, clima)."
          onConfirm={handleEliminar}
          onCancel={() => setRegistroElim(null)}
          loading={guardando}
        />
      )}
    </Layout>
  )
}
