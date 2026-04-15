# 🥚 La Reina del Huevo — Backend Spring Boot

## Cómo abrir en IntelliJ IDEA

1. **Abre IntelliJ** → `File` → `Open` → selecciona la carpeta `avicola-backend`
2. IntelliJ detecta el `pom.xml` automáticamente → clic en **"Load Maven Project"**
3. Espera que descargue las dependencias (primera vez tarda ~2 min)
4. Corre `AvicolaApplication.java` con el botón ▶ verde

El servidor arranca en **http://localhost:8080**

---

## Consola H2 (ver la base de datos)

Abre en el navegador: http://localhost:8080/h2-console

| Campo    | Valor                              |
|----------|------------------------------------|
| JDBC URL | `jdbc:h2:mem:avicoladb`            |
| User     | `sa`                               |
| Password | *(vacío)*                          |

---

## Endpoints disponibles

### Auth
| Método | URL                                  | Qué hace                             |
|--------|--------------------------------------|--------------------------------------|
| POST   | /api/auth/login                      | Inicia sesión                        |
| POST   | /api/auth/register                   | Registra usuario (rol operario)      |
| PUT    | /api/auth/profile?email=correo@x.com | Actualiza nombre/contraseña perfil   |

### Galpones
| Método | URL                  | Qué hace              |
|--------|----------------------|-----------------------|
| GET    | /api/galpones        | Lista todos           |
| GET    | /api/galpones/1      | Busca por id          |
| POST   | /api/galpones        | Crea uno nuevo        |
| PUT    | /api/galpones/1      | Actualiza             |
| DELETE | /api/galpones/1      | Elimina               |

### Huevos
| Método | URL                             | Qué hace                        |
|--------|---------------------------------|---------------------------------|
| GET    | /api/huevos                     | Lista todos                     |
| GET    | /api/huevos/galpon/1            | Filtra por galpón               |
| GET    | /api/huevos/fecha?fecha=2026-04-09 | Filtra por fecha             |
| GET    | /api/huevos/total?fecha=2026-04-09 | Total huevos del día         |
| POST   | /api/huevos?idGalpon=1          | Crea registro                   |
| PUT    | /api/huevos/1?idGalpon=1        | Actualiza                       |
| DELETE | /api/huevos/1                   | Elimina                         |

### Alimentos → /api/alimentos  (mismos patrones)
### Mortalidad → /api/mortalidad (mismos patrones)
### Aves       → /api/aves       (mismos patrones)
### Condiciones → /api/condiciones (mismos patrones)

---

## Estructura MVC

```
src/main/java/com/lareina/avicola/
├── model/          ← Entidades JPA (tablas)
├── repository/     ← Acceso a BD (Spring Data)
├── service/        ← Lógica de negocio
├── controller/     ← Endpoints REST
├── exception/      ← Errores personalizados
└── config/         ← CORS
```

## Para cambiar a MySQL (producción)

En `pom.xml` reemplaza la dependencia H2 por:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
```

En `application.properties` reemplaza la sección de H2 por:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/la_reina_huevo_db
spring.datasource.username=root
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```
