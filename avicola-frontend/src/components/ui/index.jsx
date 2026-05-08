import { CheckCircle, XCircle, AlertTriangle, X, Info, Loader2, Edit3 } from 'lucide-react'
export { Checkbox, CheckboxGroup } from './Checkbox'

// Toast de éxito/error mejorado para 2026
export function Toast({ mensaje, tipo = 'exito', onClose }) {
  const config = {
    exito: { 
      bg: 'bg-white/80 backdrop-blur-xl border-green-100', 
      icon: <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><CheckCircle className="text-green-600" size={20} /></div>, 
      text: 'text-gray-900',
      shadow: 'shadow-green-900/5'
    },
    error: { 
      bg: 'bg-white/80 backdrop-blur-xl border-red-100', 
      icon: <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><XCircle className="text-red-600" size={20} /></div>, 
      text: 'text-gray-900',
      shadow: 'shadow-red-900/5'
    },
    aviso: { 
      bg: 'bg-white/80 backdrop-blur-xl border-amber-100', 
      icon: <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><AlertTriangle className="text-amber-600" size={20} /></div>, 
      text: 'text-gray-900',
      shadow: 'shadow-amber-900/5'
    },
    info: { 
      bg: 'bg-white/80 backdrop-blur-xl border-blue-100', 
      icon: <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><Info className="text-blue-600" size={20} /></div>, 
      text: 'text-gray-900',
      shadow: 'shadow-blue-900/5'
    },
  }
  const c = config[tipo] || config.exito
  
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-[2rem] border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 min-w-[320px] ${c.bg} ${c.shadow}`}>
      {c.icon}
      <div className="flex-1">
        <p className={`font-bold text-sm uppercase tracking-wider opacity-40 mb-0.5 ${c.text}`}>Sistema</p>
        <p className={`font-bold text-base leading-tight ${c.text}`}>{mensaje}</p>
      </div>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <X size={18} className="text-gray-400" />
      </button>
    </div>
  )
}

// Modal genérico para 2026
export function Modal({ titulo, children, onClose, onConfirm, confirmLabel = 'Guardar', cancelLabel = 'Cancelar', loading, icon: Icon = AlertTriangle, color = 'amber' }) {
  const colors = {
    amber: 'bg-amber-100 text-amber-500',
    red:   'bg-red-100 text-red-500',
    blue:  'bg-blue-100 text-blue-500',
    brand: 'bg-brand-50 text-brand-200',
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-lg w-full animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${colors[color]}`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 leading-tight">{titulo}</h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-0.5">Sistema Avícola</p>
          </div>
        </div>
        
        <div className="mb-8">
          {children}
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} disabled={loading} className="flex-1 btn-secondary justify-center py-4 rounded-2xl">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 bg-brand-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-brand-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-900/20 active:scale-95 disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal de confirmación (basado en el nuevo Modal)
export function ModalConfirm({ titulo, mensaje, onConfirm, onCancel, loading, tipo = 'peligro' }) {
  const icon = tipo === 'peligro' ? XCircle : AlertTriangle
  const color = tipo === 'peligro' ? 'red' : 'amber'
  
  return (
    <Modal 
      titulo={titulo} 
      onClose={onCancel} 
      onConfirm={onConfirm} 
      loading={loading} 
      icon={icon} 
      color={color}
      confirmLabel="Confirmar"
    >
      <p className="text-gray-600 text-lg leading-relaxed">{mensaje}</p>
    </Modal>
  )
}

// Campo de formulario
export function Campo({ label, ayuda, error, children, requerido }) {
  return (
    <div>
      <label className="label">
        {label} {requerido && <span className="text-red-500">*</span>}
      </label>
      {ayuda && <p className="text-xs text-gray-400 mb-1.5">{ayuda}</p>}
      {children}
      {error && <p className="text-sm text-red-500 mt-1 flex items-center gap-1"><XCircle size={14} />{error}</p>}
    </div>
  )
}

// Badge de estado
export function Badge({ estado }) {
  const config = {
    activo: 'bg-green-100 text-green-700',
    alerta: 'bg-amber-100 text-amber-700',
    critico: 'bg-red-100 text-red-700',
  }
  const label = { activo: '✓ Activo', alerta: '⚠ Alerta', critico: '✕ Crítico' }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config[estado] || config.activo}`}>
      {label[estado] || estado}
    </span>
  )
}

// KPI Card
export function KpiCard({ icono, label, valor, sub, color }) {
  const colors = {
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    teal:  'bg-teal-50 border-teal-200 text-teal-700',
    red:   'bg-red-50 border-red-200 text-red-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    blue:  'bg-blue-50 border-blue-200 text-blue-700',
  }
  return (
    <div className={`rounded-2xl border-2 p-5 ${colors[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icono}</span>
        <p className="text-sm font-semibold opacity-80 leading-tight">{label}</p>
      </div>
      <p className="text-4xl font-bold mb-1">{valor}</p>
      {sub && <p className="text-xs opacity-70 font-medium">{sub}</p>}
    </div>
  )
}

// Alerta visual grande
export function AlertaBanner({ tipo, mensaje, hora }) {
  const config = {
    peligro: { bg: 'bg-red-50 border-red-300', icono: '🚨', text: 'text-red-800' },
    aviso:   { bg: 'bg-amber-50 border-amber-300', icono: '⚠️', text: 'text-amber-800' },
    info:    { bg: 'bg-blue-50 border-blue-300', icono: 'ℹ️', text: 'text-blue-800' },
  }
  const c = config[tipo] || config.info
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border-2 ${c.bg}`}>
      <span className="text-2xl shrink-0">{c.icono}</span>
      <div>
        <p className={`font-semibold text-base ${c.text}`}>{mensaje}</p>
        {hora && <p className="text-xs text-gray-500 mt-0.5">{hora}</p>}
      </div>
    </div>
  )
}

// Selector de galpón visual
export function SelectorGalpon({ galpones, value, onChange }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {galpones.map(g => (
        <button
          key={g.id}
          type="button"
          onClick={() => onChange(g.id)}
          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all
            ${Number(value) === g.id
              ? 'border-brand-200 bg-brand-50 text-brand-800'
              : 'border-gray-200 bg-white text-gray-600 hover:border-brand-100'
            }`}
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-bold">G {g.numero}</span>
          <span className="text-xs text-gray-400">{(g.numero_aves).toLocaleString()}</span>
        </button>
      ))}
    </div>
  )
}

// Calificador visual de calidad
export function CalidadSelector({ value, onChange }) {
  const niveles = [
    { v: 1, label: 'Muy mala', emoji: '😟', color: 'border-red-300 bg-red-50 text-red-700' },
    { v: 2, label: 'Mala',     emoji: '😕', color: 'border-orange-300 bg-orange-50 text-orange-700' },
    { v: 3, label: 'Regular',  emoji: '😐', color: 'border-yellow-300 bg-yellow-50 text-yellow-700' },
    { v: 4, label: 'Buena',    emoji: '😊', color: 'border-green-300 bg-green-50 text-green-700' },
    { v: 5, label: 'Excelente',emoji: '😄', color: 'border-teal-300 bg-teal-50 text-teal-700' },
  ]
  return (
    <div className="flex gap-2 flex-wrap">
      {niveles.map(n => (
        <button
          key={n.v}
          type="button"
          onClick={() => onChange(n.v)}
          className={`flex-1 min-w-[60px] flex flex-col items-center py-3 px-1 rounded-xl border-2 transition-all
            ${Number(value) === n.v ? n.color + ' font-bold ring-2 ring-offset-1 ring-brand-200' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
        >
          <span className="text-2xl">{n.emoji}</span>
          <span className="text-xs mt-1 font-semibold leading-tight text-center">{n.label}</span>
        </button>
      ))}
    </div>
  )
}

// Fila de tabla de datos
export function FilaVacia({ mensaje }) {
  return (
    <tr>
      <td colSpan={99} className="text-center py-12 text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl">📋</span>
          <p className="text-base">{mensaje}</p>
        </div>
      </td>
    </tr>
  )
}
