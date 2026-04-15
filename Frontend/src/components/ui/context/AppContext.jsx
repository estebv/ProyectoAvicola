import { createContext, useContext, useReducer } from 'react'
import { clearAuthSession, getAuthSession, saveAuthSession } from '../helpers/storage'
import { isAdmin } from '../helpers/permissions'

const today = new Date().toISOString().split('T')[0]

// Estado de datos del dominio (sin sesión).
const initialDataState = {
  user: null,
  galpones: [
    { id: 1, numero: 1, numero_aves: 4200, raza: 'Lohmann', estado: 'activo' },
    { id: 2, numero: 2, numero_aves: 5100, raza: 'Hy-Line', estado: 'activo' },
    { id: 3, numero: 3, numero_aves: 3800, raza: 'Shaver', estado: 'alerta' },
    { id: 4, numero: 4, numero_aves: 4600, raza: 'Lohmann', estado: 'activo' },
    { id: 5, numero: 5, numero_aves: 5140, raza: 'Hy-Line', estado: 'activo' },
  ],
  huevos: [
    { id: 1, id_galpon: 1, fecha_puesta: today, total_huevo: 3612, peso_huevo: 58.5, calidad_huevo: 4 },
    { id: 2, id_galpon: 2, fecha_puesta: today, total_huevo: 4488, peso_huevo: 61.2, calidad_huevo: 5 },
    { id: 3, id_galpon: 3, fecha_puesta: today, total_huevo: 2940, peso_huevo: 55.8, calidad_huevo: 3 },
  ],
  alimentos: [
    { id: 1, id_galpon: 1, marca_alimento: 'ProLay Feed Pro', etapa_alimento: 'Postura', fecha_consumo: today, cantidad_kg: 420 },
    { id: 2, id_galpon: 2, marca_alimento: 'NutriAve Plus', etapa_alimento: 'Postura', fecha_consumo: today, cantidad_kg: 510 },
    { id: 3, id_galpon: 3, marca_alimento: 'ProLay Feed Pro', etapa_alimento: 'Postura', fecha_consumo: today, cantidad_kg: 244 },
  ],
  mortalidad: [
    { id: 1, id_galpon: 3, estado_salud: 'Muerta', fecha_muerte: today, causa_muerte: 'Calor excesivo', numero_aves: 8 },
    { id: 2, id_galpon: 1, estado_salud: 'Muerta', fecha_muerte: today, causa_muerte: 'Enfermedad respiratoria', numero_aves: 3 },
  ],
  condiciones: [
    { id: 1, id_galpon: 1, fecha: today, temperatura: 24.5, humedad: 65.0, ventilacion: 'Buena', iluminacion: '16h' },
    { id: 2, id_galpon: 3, fecha: today, temperatura: 32.4, humedad: 78.0, ventilacion: 'Deficiente', iluminacion: '14h' },
  ],
  alertas: [
    { id: 1, tipo: 'peligro', mensaje: 'Galpón 3: Temperatura muy alta (32.4°C)', hora: '08:15 am' },
    { id: 2, tipo: 'aviso', mensaje: 'Galpón 3: Poco alimento consumido (61%)', hora: '07:00 am' },
  ]
}

function getInitialState() {
  // Combina datos iniciales + sesión almacenada en navegador.
  const authSession = getAuthSession()
  return {
    ...initialDataState,
    user: authSession ?? null,
  }
}

function reducer(state, action) {
  // Reducer central: cualquier cambio del estado global pasa por aquí.
  const adminAction = action.type.startsWith('UPDATE_') || action.type.startsWith('DELETE_')
  if (adminAction && !isAdmin(state.user)) {
    return state
  }

  switch (action.type) {
    case 'ADD_HUEVO':
      return { ...state, huevos: [{ ...action.payload, id: Date.now() }, ...state.huevos] }
    case 'ADD_ALIMENTO':
      return { ...state, alimentos: [{ ...action.payload, id: Date.now() }, ...state.alimentos] }
    case 'ADD_MORTALIDAD': {
      // Reducir aves del galpón
      const galpones = state.galpones.map(g =>
        g.id === Number(action.payload.id_galpon)
          ? { ...g, numero_aves: Math.max(0, g.numero_aves - action.payload.numero_aves) }
          : g
      )
      return {
        ...state,
        mortalidad: [{ ...action.payload, id: Date.now() }, ...state.mortalidad],
        galpones
      }
    }
    case 'ADD_CONDICION':
      return { ...state, condiciones: [{ ...action.payload, id: Date.now() }, ...state.condiciones] }
    case 'ADD_GALPON':
      return { ...state, galpones: [...state.galpones, { ...action.payload, id: Date.now() }] }
    case 'UPDATE_GALPON':
      return { ...state, galpones: state.galpones.map(g => g.id === action.payload.id ? { ...g, ...action.payload } : g) }
    case 'DELETE_GALPON':
      return { ...state, galpones: state.galpones.filter(g => g.id !== action.payload.id) }
    case 'UPDATE_HUEVO':
      return { ...state, huevos: state.huevos.map(h => h.id === action.payload.id ? { ...h, ...action.payload } : h) }
    case 'DELETE_HUEVO':
      return { ...state, huevos: state.huevos.filter(h => h.id !== action.payload.id) }
    case 'UPDATE_ALIMENTO':
      return { ...state, alimentos: state.alimentos.map(a => a.id === action.payload.id ? { ...a, ...action.payload } : a) }
    case 'DELETE_ALIMENTO':
      return { ...state, alimentos: state.alimentos.filter(a => a.id !== action.payload.id) }
    case 'UPDATE_MORTALIDAD':
      return { ...state, mortalidad: state.mortalidad.map(m => m.id === action.payload.id ? { ...m, ...action.payload } : m) }
    case 'DELETE_MORTALIDAD':
      return { ...state, mortalidad: state.mortalidad.filter(m => m.id !== action.payload.id) }
    case 'UPDATE_CONDICION':
      return { ...state, condiciones: state.condiciones.map(c => c.id === action.payload.id ? { ...c, ...action.payload } : c) }
    case 'DELETE_CONDICION':
      return { ...state, condiciones: state.condiciones.filter(c => c.id !== action.payload.id) }
    case 'LOGIN': {
      const user = action.payload
      saveAuthSession(user)
      return { ...state, user }
    }
    case 'UPDATE_USER': {
      const user = { ...state.user, ...action.payload }
      saveAuthSession(user)
      return { ...state, user }
    }
    case 'LOGOUT':
      clearAuthSession()
      return { ...state, user: null }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Se usa una función inicial para recuperar sesión desde localStorage
  // sólo al montar la app y evitar lecturas repetidas en cada render.
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
