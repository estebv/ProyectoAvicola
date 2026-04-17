# 🐔 La Reina del Huevo — Sistema Avícola

Sistema web para gestionar una granja avícola: galpones, aves, huevos, alimentos, mortalidad y condiciones ambientales.

---

## ⚡ Inicio rápido

Necesitas tener instalado: **Java 21**, **Maven**, **MySQL** y **Node.js 18+**.

```bash
# Terminal 1 — Backend
cd avicola-backend
# Edita src/main/resources/application.properties con tu usuario y contraseña de MySQL
./mvnw spring-boot:run

# Terminal 2 — Frontend
cd Frontend
npm install
npm run dev
```

- Backend → http://localhost:8080
- Frontend → http://localhost:5173
- Usuario de prueba: `admin@avicola.com` / `123456`

---

## 🏗️ Arquitectura MVC

El backend sigue el patrón **Modelo → Vista → Controlador**:

```
Solicitud del frontend
        ↓
  Controller        ← Recibe la petición HTTP (GET, POST, PUT, DELETE)
        ↓
  Service           ← Aplica la lógica del negocio
        ↓
  Repository        ← Habla con la base de datos
        ↓
  Model             ← Representa la tabla de la base de datos
        ↓
  Base de datos MySQL
```

---

## 📁 Estructura de carpetas

```
avicola-backend/
├── pom.xml                                  ← Dependencias del proyecto
└── src/main/java/com/avicola/
    ├── AvicolaApplication.java              ← Punto de entrada (main)
    │
    ├── config/
    │   └── CorsConfig.java                  ← Permite peticiones del frontend
    │
    ├── model/           ← Tablas de la base de datos
    │   ├── Usuario.java
    │   ├── Galpon.java
    │   ├── Aves.java
    │   ├── Huevos.java
    │   ├── Alimentos.java
    │   ├── Mortalidad.java
    │   └── Condiciones.java
    │
    ├── repository/      ← Acceso a la base de datos (sin escribir SQL)
    │   ├── UsuarioRepository.java
    │   ├── GalponRepository.java
    │   ├── AvesRepository.java
    │   ├── HuevosRepository.java
    │   ├── AlimentosRepository.java
    │   ├── MortalidadRepository.java
    │   └── CondicionesRepository.java
    │
    ├── service/         ← Lógica del negocio
    │   ├── AuthService.java
    │   ├── GalponService.java
    │   ├── AvesService.java
    │   ├── HuevosService.java
    │   ├── AlimentosService.java
    │   ├── MortalidadService.java
    │   └── CondicionesService.java
    │
    └── controller/      ← Endpoints REST (lo que llama el frontend)
        ├── AuthController.java
        ├── GalponController.java
        ├── AvesController.java
        ├── HuevosController.java
        ├── AlimentosController.java
        ├── MortalidadController.java
        └── CondicionesController.java

Frontend/
├── src/
│   ├── pages/           ← Cada pantalla de la app
│   ├── components/      ← Partes reutilizables (botones, layout...)
│   ├── services/        ← Llamadas al backend (api.js)
│   ├── helpers/         ← Funciones de utilidad
│   └── routes/          ← Navegación y rutas protegidas
└── ...
```

---

## 🗄️ Configurar la base de datos

### 1. Crear la base de datos en MySQL

```sql
CREATE DATABASE avicola_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### 2. Editar `application.properties`

Abre `avicola-backend/src/main/resources/application.properties` y cambia:

```properties
spring.datasource.username=root
spring.datasource.password=tu_password   ← pon tu contraseña aquí
```

### 3. Al iniciar el backend, Spring crea las tablas automáticamente

El archivo `data.sql` inserta los datos de prueba (5 galpones, huevos, etc.).

---

## 🔌 Todos los endpoints de la API

### Autenticación

| Método | URL | Qué hace |
|--------|-----|----------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Crear cuenta |
| PUT | `/api/auth/perfil?email=x` | Actualizar nombre/contraseña |

**Ejemplo login** (lo que envía el frontend):
```json
POST /api/auth/login
{ "email": "admin@avicola.com", "password": "123456" }
```
**Respuesta:**
```json
{ "id": 1, "nombre": "Jorge Avila", "email": "admin@avicola.com", "rol": "admin" }
```

---

### Galpones

| Método | URL | Qué hace |
|--------|-----|----------|
| GET | `/api/galpones` | Lista todos |
| GET | `/api/galpones/{id}` | Busca uno |
| POST | `/api/galpones` | Crea uno |
| PUT | `/api/galpones/{id}` | Actualiza |
| DELETE | `/api/galpones/{id}` | Elimina |

**Ejemplo crear galpón:**
```json
POST /api/galpones
{ "numero": 6, "numero_aves": 4000, "raza": "Lohmann", "estado": "activo" }
```

---

### Aves, Huevos, Alimentos, Mortalidad, Condiciones

Todos siguen el mismo patrón. Se pasa el ID del galpón como parámetro al crear:

| Método | URL | Qué hace |
|--------|-----|----------|
| GET | `/api/{recurso}` | Lista todos |
| GET | `/api/{recurso}/{id}` | Busca uno |
| GET | `/api/{recurso}/galpon/{idGalpon}` | Filtra por galpón |
| POST | `/api/{recurso}?idGalpon=1` | Crea (vinculado al galpón) |
| PUT | `/api/{recurso}/{id}?idGalpon=1` | Actualiza |
| DELETE | `/api/{recurso}/{id}` | Elimina |

Donde `{recurso}` es: `aves`, `huevos`, `alimentos`, `mortalidad` o `condiciones`.

**Ejemplo registrar huevos:**
```json
POST /api/huevos?idGalpon=1
{
  "fecha_puesta": "2026-04-17",
  "total_huevo": 3600,
  "peso_huevo": 58.5,
  "calidad_huevo": 4
}
```

**Nota sobre mortalidad:** al crear un registro de mortalidad, el backend descuenta automáticamente las aves del galpón.

---

## 🧩 ¿Cómo funciona cada capa? (explicado simple)

### Model (Modelo)
Es una clase Java que representa una tabla de la base de datos. Cada campo de la clase es una columna de la tabla.

```java
// Galpon.java
@Entity                          // "Esto es una tabla en la BD"
@Table(name = "galpon")          // Nombre de la tabla
public class Galpon {
    @Id                          // Clave primaria
    private Long id;
    private Integer numero;      // Número del galpón
    private Integer numeroAves;  // Cuántas aves hay
    private String raza;
    private String estado;       // activo / alerta / critico
}
```

### Repository (Repositorio)
Es una interfaz que habla con la base de datos. No escribes SQL, Spring lo genera solo.

```java
// GalponRepository.java
public interface GalponRepository extends JpaRepository<Galpon, Long> {
    // findAll(), findById(), save(), deleteById() ya vienen gratis
    boolean existsByNumero(Integer numero); // Spring genera: SELECT COUNT(*) WHERE numero = ?
}
```

### Service (Servicio)
Contiene la lógica del negocio. Aquí decides qué hacer antes de guardar o devolver datos.

```java
// GalponService.java
public Galpon crear(Galpon galpon) {
    if (galponRepository.existsByNumero(galpon.getNumero())) {
        throw new RuntimeException("Ya existe ese número de galpón");
    }
    return galponRepository.save(galpon);
}
```

### Controller (Controlador)
Recibe las peticiones HTTP del frontend y delega al servicio.

```java
// GalponController.java
@PostMapping                             // Atiende POST /api/galpones
public ResponseEntity<?> crear(@RequestBody Galpon galpon) {
    return ResponseEntity.status(201).body(galponService.crear(galpon));
}
```

---

## ❓ Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Access denied for user 'root'` | Contraseña de MySQL incorrecta | Edita `application.properties` |
| `Unknown database 'avicola_db'` | La BD no existe | Ejecuta `CREATE DATABASE avicola_db` |
| `CORS error` en el navegador | Frontend y backend en puertos distintos | Ya está configurado; verifica que el backend corra en 8080 |
| `Port 8080 already in use` | Otro proceso usa el puerto | Cambia `server.port=8081` en `application.properties` |
| `401 Unauthorized` en login | Credenciales incorrectas | Usa `admin@avicola.com` / `123456` |

---

## 📦 Dependencias principales (pom.xml)

| Dependencia | Para qué sirve |
|-------------|----------------|
| `spring-boot-starter-web` | Crear endpoints REST |
| `spring-boot-starter-data-jpa` | Hablar con la base de datos sin SQL |
| `spring-boot-starter-validation` | Validar datos (`@NotBlank`, `@Min`...) |
| `spring-security-crypto` | Encriptar contraseñas con BCrypt |
| `mysql-connector-j` | Conectar con MySQL |
| `lombok` | Generar getters/setters automáticamente |
