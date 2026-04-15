# Sistema Avícola

Aplicación web para registrar y analizar operación avícola (galpones, aves, huevos, alimentos, mortalidad y condiciones ambientales), con autenticación inicial de usuario.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

```bash
# 1) Instala dependencias
npm install

# 2) Levanta entorno de desarrollo
npm run dev
```

La app corre en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

Los archivos generados quedan en `dist/`.

## Login de prueba

La autenticación actual es local (mock) y protege las rutas internas.

- Correo: `admin@avicola.com`
- Contraseña: `123456`

## Estructura actual del proyecto

```text
src/
  components/
    layout/           # Layout principal, header y sidebar
    ui/               # Componentes visuales reutilizables
  context/
    AppContext.jsx    # Estado global + acciones de negocio
  helpers/
    storage.js        # Utilidades para sesión en localStorage
  pages/
    Login.jsx
    Dashboard.jsx
    Galpones.jsx
    Aves.jsx
    Huevos.jsx
    Alimentos.jsx
    Mortalidad.jsx
    Condiciones.jsx
    Reportes.jsx
  routes/
    AppRouter.jsx     # Definición de rutas de la app
    ProtectedRoute.jsx# Guarda de rutas autenticadas
  services/
    authService.js    # Servicio de login (simulado)
  App.jsx             # Entrada del enrutador
  main.jsx            # Entry point de React
  index.css           # Estilos globales
```

## Flujo de autenticación (resumen)

1. El usuario entra a `Login`.
2. Se valida contra `authService` (mock local).
3. Si es correcto, se guarda sesión en `localStorage` (`helpers/storage.js`).
4. `ProtectedRoute` permite acceder al resto de páginas.
5. En `Sidebar` se puede cerrar sesión.

## Notas para pasar a backend real

- Reemplaza `src/services/authService.js` por llamadas HTTP reales.
- Mantén `ProtectedRoute` para control de acceso en frontend.
- Migra el estado de `AppContext` a endpoints (API) según cada módulo.
