##  Live Demo

- API Base URL: https://app-menudigital.onrender.com
- Demo: https://app-menudigital.netlify.app/home
- Example Public Menu: https://app-menudigital.netlify.app/menu/pueba

# Multi-Tenant Menu Platform — Backend API

# Why this project?

Este proyecto fue creado como una solución real para negocios locales y como un reto personal para mejorar mis habilidades en desarrollo backend mientras me preparaba para mi primer puesto profesional como desarrollador.

# General description

REST API robusta y escalable diseñada para soportar múltiples negocios dentro de una plataforma generadora de menús digitales con carrito de pedidos y analíticas por negocio.

Construida siguiendo principios de separación de responsabilidades, seguridad por diseño y arquitectura orientada a servicios.

---

## Índice

- [Problem Statement](#problem-statement)
- [Tech Stack](#tech-stack)
- [Arquitectura](#arquitectura)
- [Seguridad](#seguridad)
- [Multi-Tenant Strategy](#multi-tenant-strategy)
- [Observabilidad & Monitoring](#observabilidad--monitoring)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autenticación](#autenticación)
- [Instalación Local](#instalación-local)
- [Roadmap Técnico](#roadmap-técnico)

---

## Problem Statement

Durante el desarrollo de soluciones para pequeños negocios, se detectó un problema recurrente:

- Alta carga operativa respondiendo preguntas repetitivas.
- Clientes que no conocen el menú antes de escribir.
- Pérdida de tiempo solicitando ubicaciones.
- Falta de estructura en pedidos por WhatsApp.

**Esta API resuelve ese problema permitiendo:**

- Generación de menús digitales únicos por negocio.
- Administración independiente por cada usuario.
- Tracking de comportamiento por menú.
- Estructura clara de pedidos.

Diseñada bajo un enfoque **multi-tenant**, donde cada negocio opera de forma aislada mediante slugs únicos.

---

## Tech Stack

| Categoría     | Tecnología                         |
| ------------- | ---------------------------------- |
| Runtime       | Node.js                            |
| Framework     | Express                            |
| ORM           | Prisma                             |
| Base de datos | PostgreSQL (Neon)                  |
| Autenticación | JWT (Access Tokens)                |
| Seguridad     | bcrypt, helmet, express-rate-limit |
| Validación    | express-validator                  |
| Utilidades    | slugify                            |
| Deploy API    | Render                             |
| Deploy DB     | Neon (PostgreSQL serverless)       |

---

## Arquitectura

Se implementó una arquitectura en capas con responsabilidades bien definidas:

```
Request
  ↓
Middleware Layer
  ↓
Controller Layer
  ↓
Service Layer (Business Logic)
  ↓
Model Layer (Data Access)
  ↓
Prisma ORM
  ↓
PostgreSQL (Neon)
```

### 1. Middleware Layer

Responsable de:

- Validación de request.
- Sanitización de inputs.
- Verificación de autenticación JWT.
- Seguridad de headers.

> **Principio aplicado:** _"Fail fast before touching business logic"_

### 2. Controller Layer

- Maneja únicamente `req` y `res`.
- No contiene lógica de negocio.
- Delega completamente al service.
- Controladores delgados y fácilmente testeables.

### 3. Service Layer (Core)

Aquí reside la lógica crítica:

- Validación de unicidad (email, phone, slug).
- Aislamiento entre tenants.
- Reglas de permisos (usuarios no pueden modificar recursos ajenos).
- Encriptación de claves externas.
- Generación dinámica de slugs únicos.
- Transacciones atómicas con Prisma.

Se utilizan transacciones (`tx`) para asegurar atomicidad en procesos críticos como el registro de usuario.

### 4. Model Layer

Encapsula acceso a datos mediante Prisma.

- Desacoplamiento ORM ↔ lógica de negocio.
- Código más mantenible.

---

## Seguridad

La seguridad fue diseñada como capa transversal.

### Rate Limiting

Endpoints sensibles protegidos mediante limitador global:

```js
app.use(globalLimiter);
```

Endpoints públicos de alto tráfico (visualización de menús) cuentan con un límite ampliado:

```js
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
```

### Protección de Aplicación

- `helmet` para hardening de headers.
- CORS configurado por whitelist.
- Sanitización con `express-validator`.
- Prisma previene SQL injection mediante prepared statements.
- Password hashing con `bcrypt`.
- Encriptación de claves sensibles (ej. integraciones externas con POS).

---

## Multi-Tenant Strategy

Cada negocio es identificado por un **slug único**.

- Slug generado automáticamente desde el nombre del negocio.
- Sistema incremental para evitar colisiones entre usuarios.
- Aislamiento lógico por usuario.
- Analíticas segmentadas por slug.

Esto permite escalar a múltiples negocios sin necesidad de múltiples bases de datos.

---

## Observabilidad & Monitoring

### Analíticas Internas

- Visualizaciones por menú.
- Pedidos generados.
- Eventos clave del flujo.

### Health Check

```
GET /health
```

Valida:

- Conectividad con Neon.
- Estado general del servidor.

Un servicio externo realiza pings periódicos. Si la base de datos falla, se dispara una alerta automática por correo.

---

## Estructura del Proyecto

```
/controller
/lib
/middlewares
/model
/prisma
/routes
/service
/utils
server.js
split.js
```

**Principios aplicados:**

- Single Responsibility
- Separation of Concerns
- Layered Architecture
- Security by Design

---

## Autenticación

- JWT basado en Access Token.
- Middleware de verificación.
- Inyección de `req.user`.
- Control de acceso a recursos por propietario.

> Refresh tokens no están implementados actualmente — planeados como mejora futura.

---

## Instalación Local

```bash
git clone <repo>
cd backend
npm install
```

Configurar variables de entorno:

```env
DATABASE_URL=
DATA_ENCRYPT_SECRET =

JWT_SECRET =
JWT_EXPIRES_IN =
```

Ejecutar migraciones:

```bash
npx prisma migrate deploy
```

Iniciar servidor:

```bash
node server.js
```

---

## Lo que demuestra este proyecto

- Diseño backend profesional.
- Arquitectura limpia y mantenible.
- Aplicación de patrones de separación de capas.
- Gestión de seguridad real en producción.
- Diseño multi-tenant escalable.
- Uso correcto de ORM con transacciones.
- Pensamiento orientado a producto y performance.
