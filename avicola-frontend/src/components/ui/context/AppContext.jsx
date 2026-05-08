import { createContext, useContext, useReducer, useEffect } from 'react'
import { clearAuthSession, getAuthSession, saveAuthSession } from '../../../helpers/storage'
import { isAdmin } from '../../../helpers/permissions'
import { api } from '../../../services/api'

// ─────────────────────────────────────────────────────────────────
//  ✅ CORRECCIÓN BUG 3:
//  Se agregó useEffect que al arrancar la app hace GET a todos
//  los endpoints del backend y llena el estado global con datos reales.
//  Antes: estado inicial era [] vacío y nunca se conectaba al backend.
// ─────────────────────────────────────────────────────────────────

const initialState = {
  user:        null,
  loading:     true,
  galpones:    [],
  aves:        [],
  huevos:      [],
  alimentos:   [],
  mortalidad:  [],
  condiciones: [],
  alertas:     [],
}

function getInitialState() {
  const authSession = getAuthSession()
  return { ...initialState, user: authSession ?? null }
}

function reducer(state, action) {
  const adminAction = action.type.startsWith('UPDATE_') || action.type.startsWith('DELETE_')
  if (adminAction && !isAdmin(state.user)) return state

  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload, loading: false }

    case 'ADD_AVE': {
      const galpones = state.galpones.map(g =>
        g.id === Number(action.payload.id_galpon)
          ? { ...g, numero_aves: g.numero_aves + action.payload.total_aves }
          : g
      )
      return { ...state, aves: [action.payload, ...state.aves], galpones }
    }
    case 'UPDATE_AVE':
      return { ...state, aves: state.aves.map(a => a.id === action.payload.id ? { ...a, ...action.payload } : a) }
    case 'DELETE_AVE':
      return { ...state, aves: state.aves.filter(a => a.id !== action.payload.id) }

    case 'ADD_HUEVO':
      return { ...state, huevos: [action.payload, ...state.huevos] }
    case 'UPDATE_HUEVO':
      return { ...state, huevos: state.huevos.map(h => h.id === action.payload.id ? { ...h, ...action.payload } : h) }
    case 'DELETE_HUEVO':
      return { ...state, huevos: state.huevos.filter(h => h.id !== action.payload.id) }

    case 'ADD_ALIMENTO':
      return { ...state, alimentos: [action.payload, ...state.alimentos] }
    case 'UPDATE_ALIMENTO':
      return { ...state, alimentos: state.alimentos.map(a => a.id === action.payload.id ? { ...a, ...action.payload } : a) }
    case 'DELETE_ALIMENTO':
      return { ...state, alimentos: state.alimentos.filter(a => a.id !== action.payload.id) }

    case 'ADD_MORTALIDAD': {
      const galpones = state.galpones.map(g =>
        g.id === Number(action.payload.id_galpon)
          ? { ...g, numero_aves: Math.max(0, g.numero_aves - action.payload.numero_aves) }
          : g
      )
      return { ...state, mortalidad: [action.payload, ...state.mortalidad], galpones }
    }
    case 'UPDATE_MORTALIDAD':
      return { ...state, mortalidad: state.mortalidad.map(m => m.id === action.payload.id ? { ...m, ...action.payload } : m) }
    case 'DELETE_MORTALIDAD':
      return { ...state, mortalidad: state.mortalidad.filter(m => m.id !== action.payload.id) }

    case 'ADD_CONDICION':
      return { ...state, condiciones: [action.payload, ...state.condiciones] }
    case 'UPDATE_CONDICION':
      return { ...state, condiciones: state.condiciones.map(c => c.id === action.payload.id ? { ...c, ...action.payload } : c) }
    case 'DELETE_CONDICION':
      return { ...state, condiciones: state.condiciones.filter(c => c.id !== action.payload.id) }

    case 'ADD_GALPON':
      return { ...state, galpones: [...state.galpones, action.payload] }
    case 'UPDATE_GALPON':
      return { ...state, galpones: state.galpones.map(g => g.id === action.payload.id ? { ...g, ...action.payload } : g) }
    case 'DELETE_GALPON':
      return { ...state, galpones: state.galpones.filter(g => g.id !== action.payload.id) }

    case 'LOGIN':
      saveAuthSession(action.payload)
      return { ...state, user: action.payload }
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
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

  // ✅ Al montar la app, carga todos los datos del backend.
  // Promise.allSettled: si un endpoint falla, los demás igual cargan.
  useEffect(() => {
    async function cargarDatos() {
      const [galpones, aves, huevos, alimentos, mortalidad, condiciones] =
        await Promise.allSettled([
          api.get('/galpones'),
          api.get('/aves'),
          api.get('/huevos'),
          api.get('/alimentos'),
          api.get('/mortalidad'),
          api.get('/condiciones'),
        ])

      dispatch({
        type: 'SET_DATA',
        payload: {
          galpones:    galpones.status    === 'fulfilled' ? galpones.value    : [],
          aves:        aves.status        === 'fulfilled' ? aves.value        : [],
          huevos:      huevos.status      === 'fulfilled' ? huevos.value      : [],
          alimentos:   alimentos.status   === 'fulfilled' ? alimentos.value   : [],
          mortalidad:  mortalidad.status  === 'fulfilled' ? mortalidad.value  : [],
          condiciones: condiciones.status === 'fulfilled' ? condiciones.value : [],
        },
      })
    }
    cargarDatos()
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
