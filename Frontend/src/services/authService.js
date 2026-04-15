import { getStoredUsers, saveStoredUsers } from '../helpers/storage'

const DEFAULT_USERS = [
  {
    email: 'admin@avicola.com',
    password: '123456',
    profile: { nombre: 'Jorge Avila', rol: 'admin', email: 'admin@avicola.com' },
  },
]

function getUsers() {
  const users = getStoredUsers()
  if (users && users.length > 0) return users
  saveStoredUsers(DEFAULT_USERS)
  return DEFAULT_USERS
}

export async function loginWithEmail({ email, password }) {
  // Simula latencia de backend para visualizar mejor el flujo de login.
  await new Promise(resolve => setTimeout(resolve, 350))

  // Normaliza email para evitar errores por mayúsculas/espacios.
  const normalizedEmail = email.trim().toLowerCase()
  const foundUser = getUsers().find(user => user.email === normalizedEmail && user.password === password)

  if (!foundUser) {
    // Se lanza error para que la UI muestre un mensaje amigable.
    throw new Error('Correo o contraseña incorrectos')
  }

  // Retorna sólo el perfil (sin contraseña).
  return foundUser.profile
}

export async function registerWithEmail({ nombre, email, password }) {
  await new Promise(resolve => setTimeout(resolve, 250))

  const normalizedEmail = email.trim().toLowerCase()
  const users = getUsers()
  const alreadyExists = users.some(user => user.email === normalizedEmail)
  if (alreadyExists) throw new Error('Este correo ya está registrado')

  const profile = { nombre: nombre.trim(), rol: 'operario', email: normalizedEmail }
  const nextUsers = [...users, { email: normalizedEmail, password, profile }]
  saveStoredUsers(nextUsers)
  return profile
}

export async function updateUserProfile({ email, nombre, password }) {
  await new Promise(resolve => setTimeout(resolve, 200))
  const normalizedEmail = email.trim().toLowerCase()

  const users = getUsers()
  const nextUsers = users.map(user => {
    if (user.email !== normalizedEmail) return user
    return {
      ...user,
      password: password ? password : user.password,
      profile: {
        ...user.profile,
        nombre: nombre?.trim() || user.profile.nombre,
      },
    }
  })
  saveStoredUsers(nextUsers)

  const updated = nextUsers.find(user => user.email === normalizedEmail)
  if (!updated) throw new Error('Usuario no encontrado')
  return updated.profile
}
