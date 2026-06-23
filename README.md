# Sistema de Gestión de Préstamos (Prueba Técnica)

Una plataforma end-to-end para la solicitud y auditoría de préstamos bancarios. Desarrollada con enfoque en arquitectura limpia, alta densidad de información (UI Premium Developer-Centric) y separación estricta de responsabilidades.

## 🚀 Arquitectura del Proyecto

- **Backend:** Java 17 + Spring Boot 3.1.5 (WebFlux, Spring Data JPA, Spring Security).
- **Frontend:** React 18 + Vite (Zustand Global State, Mock DB Fallback, Bootstrap estructurado).
- **Base de Datos:** PostgreSQL 15 (Configurada para persistencia física).
- **Despliegue Local:** Docker Compose para virtualización instantánea de la base de datos.

## 📋 Pre-requisitos

Para evaluar este proyecto localmente, solo necesitas:
- **Docker & Docker Compose** (para levantar la base de datos sin configuraciones).
- **Java 17+** y Maven.
- **Node.js 18+** y NPM.

## 🛠️ Instalación y Ejecución

### 1. Iniciar la Base de Datos
En la raíz del proyecto, ejecuta el siguiente comando para levantar PostgreSQL automáticamente:
```bash
docker-compose up -d
```
*Esto creará el contenedor `bank_loans_postgres` en el puerto `5432`.*

### 2. Iniciar el Backend (Spring Boot)
Abre una terminal en la raíz del proyecto y compila/ejecuta la API:
```bash
# En Windows (Powershell/CMD):
.\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
# En Mac/Linux:
./mvnw spring-boot:run
```
*La API se ejecutará en `http://localhost:8085`.*

### 3. Iniciar el Frontend (React)
Abre otra terminal, navega a la carpeta `frontend` y lanza el servidor de desarrollo:
```bash
cd frontend
npm install
npm run dev
```
*La interfaz estará disponible en `http://localhost:5173`.*

## 🔐 Credenciales de Acceso

La aplicación cuenta con seguridad `Basic Auth` y persistencia de sesión por `localStorage` (con auto-expiración por seguridad). 

| Rol | Usuario | Contraseña | Capacidades |
| :--- | :--- | :--- | :--- |
# Sistema de Gestión de Préstamos (Prueba Técnica)

Una plataforma end-to-end para la solicitud y auditoría de préstamos bancarios. Desarrollada con enfoque en arquitectura limpia, alta densidad de información (UI Premium Developer-Centric) y separación estricta de responsabilidades.

## 🚀 Arquitectura del Proyecto

- **Backend:** Java 17 + Spring Boot 3.1.5 (WebFlux, Spring Data JPA, Spring Security).
- **Frontend:** React 18 + Vite (Zustand Global State, Mock DB Fallback, Bootstrap estructurado).
- **Base de Datos:** PostgreSQL 15 (Configurada para persistencia física).
- **Despliegue Local:** Docker Compose para virtualización instantánea de la base de datos.

## 📋 Pre-requisitos

Para evaluar este proyecto localmente, solo necesitas:
- **Docker & Docker Compose** (para levantar la base de datos sin configuraciones).
- **Java 17+** y Maven.
- **Node.js 18+** y NPM.

## 🛠️ Instalación y Ejecución

### 1. Iniciar la Base de Datos
En la raíz del proyecto, ejecuta el siguiente comando para levantar PostgreSQL automáticamente:
```bash
docker-compose up -d
```
*Esto creará el contenedor `bank_loans_postgres` en el puerto `5432`.*

### 2. Iniciar el Backend (Spring Boot)
Abre una terminal en la raíz del proyecto y compila/ejecuta la API:
```bash
# En Windows (Powershell/CMD):
.\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
# En Mac/Linux:
./mvnw spring-boot:run
```
*La API se ejecutará en `http://localhost:8085`.*

### 3. Iniciar el Frontend (React)
Abre otra terminal, navega a la carpeta `frontend` y lanza el servidor de desarrollo:
```bash
cd frontend
npm install
npm run dev
```
*La interfaz estará disponible en `http://localhost:5173`.*

## 🔐 Credenciales de Acceso

La aplicación cuenta con seguridad `Basic Auth` y persistencia de sesión por `localStorage` (con auto-expiración por seguridad). 

| Rol | Usuario | Contraseña | Capacidades |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@test.com` | `123` | Ver todas las solicitudes, Aprobar, Rechazar. |
| **Usuario** | `usuario@test.com` | `123` | Solicitar nuevos préstamos, ver historial propio. |

## 📐 Diseño UI/UX
La interfaz de usuario ha sido concebida bajo una línea estética utilitaria de alto contraste, minimalista y de alta densidad de información (inspirada en consolas de desarrollo como Vercel y Linear).

## 🔥 Arquitectura Avanzada
Para garantizar estándares estrictos de producción, este sistema implementa una separación clara:

### ⚙️ Backend (Capa de Datos y Negocio)
- **Programación Reactiva Hexagonal:** El `JpaLoanRepositoryAdapter` aísla las operaciones bloqueantes de la base de datos envolviéndolas en `Schedulers.boundedElastic()`.
- **Caché Optimizado:** Configuración explícita de `Caffeine` (`CacheConfig.java`) que previene Memory Leaks y stale data mediante expiraciones automáticas.

### 🌐 API (Capa de Exposición)
- **Endpoints 100% Asíncronos:** El `LoanController` opera de manera nativa con tipos reactivos puros (`Mono` y `Flux`), garantizando que la API nunca bloquee hilos de red.
- **Testing Reactivo:** Certificación de la lógica de negocio y endpoints críticos con JUnit 5, Mockito y `StepVerifier` de Project Reactor.

### 💻 Frontend (Capa de Presentación)
- **Estado Global Óptimo:** Se integró **Zustand** reemplazando el Context API nativo para gestionar la autenticación y la caché de UI sin provocar cascadas de re-renders.
- **Resiliencia Offline:** Patrón de Mock DB local que mantiene la interfaz completamente funcional y fluida incluso cuando la API o PostgreSQL experimentan caídas.
