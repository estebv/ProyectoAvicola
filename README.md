# 🐔 La Reina del Huevo — Sistema de Gestión Avícola

Sistema web completo para gestionar una granja avícola. Registra y analiza galpones, aves, producción de huevos, alimentos, mortalidad y condiciones ambientales.



## ✨ Funcionalidades

- 🔐 **Autenticación** con roles (Administrador / Usuario)
- 🏠 **Galpones** — CRUD completo con estado (activo, alerta, crítico)
- 🐔 **Aves** — Registro de lotes por galpón, raza y origen
- 🥚 **Huevos** — Control de producción diaria con calidad y peso
- 🌾 **Alimentos** — Registro de consumo por galpón y marca
- 💀 **Mortalidad** — Registro de bajas (descuenta aves del galpón automáticamente)
- 🌡️ **Condiciones** — Temperatura, humedad, ventilación e iluminación
- 📊 **Reportes** — Estadísticas y resumen general

---

## 🛠️ Tecnologías

### Backend
| Tecnología | Uso |
|-----------|-----|
| Java 21 | Lenguaje principal |
| Spring Boot 3.4.5 | Framework web |
| Spring Data JPA | Acceso a base de datos |
| Spring Validation | Validación de datos |
| BCrypt | Encriptación de contraseñas |
| MySQL 8 | Base de datos |
| Lombok | Reducción de código repetitivo |

### Frontend
| Tecnología | Uso |
|-----------|-----|
| React 18 | Interfaz de usuario |
| Vite | Herramienta de desarrollo |
| React Router 6 | Navegación entre páginas |
| TailwindCSS 3 | Estilos |
| Recharts | Gráficas y reportes |
| Lucide React | Íconos |

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Java 21
- Maven 3.x (o usar el `mvnw` incluido)
- MySQL 8
- Node.js 18+

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/avicola.git
cd avicola
```

### 2. Configurar la base de datos

```sql
CREATE DATABASE avicola_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### 3. Configurar el backend

Edita `avicola-backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=tu_password   # ← cambia esto
```

### 4. Iniciar el backend

```bash
cd avicola-backend
./mvnw spring-boot:run
```

Al iniciar, Spring Boot crea las tablas automáticamente y carga los datos de prueba.
El servidor queda disponible en **http://localhost:8080**

### 5. Iniciar el frontend

```bash
cd avicola-frontend
npm install
npm run dev
```

La app queda disponible en **http://localhost:5173**

### 6. Iniciar sesión

```
Email:      admin@avicola.com
Contraseña: 123456
```

---

## 🏗️ Arquitectura

El proyecto sigue el patrón **MVC (Modelo - Vista - Controlador)**:

```
Frontend (React)
      │
      │  HTTP / JSON
      ▼
┌─────────────┐
│ Controller  │  ← Recibe peticiones GET / POST / PUT / DELETE
├─────────────┤
│   Service   │  ← Aplica la lógica del negocio
├─────────────┤
│ Repository  │  ← Accede a la base de datos
├─────────────┤
│    Model    │  ← Representa las tablas de MySQL
└─────────────┘
      │
      ▼
  MySQL 8
```

---

## 📁 Estructura del proyecto

```
avicola/
├── avicola-backend/
│   ├── pom.xml
│   └── src/main/java/com/avicola/
│       ├── AvicolaApplication.java
│       ├── config/
│       │   └── CorsConfig.java
│       ├── model/
│       │   ├── Usuario.java
│       │   ├── Galpon.java
│       │   ├── Aves.java
│       │   ├── Huevos.java
│       │   ├── Alimentos.java
│       │   ├── Mortalidad.java
│       │   └── Condiciones.java
│       ├── repository/          ← Interfaces JPA (sin SQL manual)
│       ├── service/             ← Lógica de negocio
│       └── controller/          ← Endpoints REST
│
└── avicola-frontend/
    └── src/
        ├── pages/               ← Una página por módulo
        ├── components/          ← Layout y componentes UI reutilizables
        ├── services/api.js      ← Conexión con el backend
        ├── helpers/             ← Storage y permisos
        └── routes/              ← Rutas y rutas protegidas
```

---

## 🔌 API — Endpoints principales

### Autenticación
```
POST   /api/auth/login              Iniciar sesión
POST   /api/auth/register           Registrar usuario
PUT    /api/auth/perfil?email=x     Actualizar perfil
```

### Recursos (mismo patrón para todos)
```
GET    /api/{recurso}               Listar todos
GET    /api/{recurso}/{id}          Buscar por ID
GET    /api/{recurso}/galpon/{id}   Filtrar por galpón
POST   /api/{recurso}?idGalpon=1   Crear
PUT    /api/{recurso}/{id}          Actualizar
DELETE /api/{recurso}/{id}          Eliminar
```

Recursos disponibles: `galpones`, `aves`, `huevos`, `alimentos`, `mortalidad`, `condiciones`

---

## 👤 Roles de usuario

| Rol | Permisos |
|-----|----------|
| **admin** | CRUD completo en todos los módulos |
| **usuario** | Solo puede registrar datos del día a día |

---

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "Agrega nueva funcionalidad"`
4. Sube la rama: `git push origin feature/mi-nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Proyecto educativo de uso libre.
