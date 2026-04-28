# ⚙️ TalentKick API

**TalentKick**, diseñado para ofrecer una plataforma robusta y escalable que potencia el talento deportivo a través de contenido multimedia y networking social.

---

## 🛠️ Stack Tecnológico

Esta API está construida con tecnologías modernas que garantizan seguridad y rendimiento:

- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Autenticación:** JWT (JSON Web Tokens) y [Firebase Admin](https://firebase.google.com/docs/admin)
- **Almacenamiento:** AWS SDK (S3 / Minio) para archivos multimedia.
- **Documentación:** [Swagger](https://swagger.io/) (OpenAPI 3.0)

---

## 🏗️ Arquitectura de Software

El proyecto implementa una arquitectura basada en **Clean Architecture**, organizada en capas para facilitar el mantenimiento y las pruebas:

1.  **Dominio (`src/domain`)**: Contiene las entidades de negocio y las interfaces de los repositorios (independiente de librerías externas).
2.  **Aplicación (`src/application`)**: Implementa los casos de uso (Lógica de negocio).
3.  **Infraestructura (`src/infrastructure`)**: Implementaciones de repositorios, configuración de Prisma, Firebase, AWS y otros servicios externos.
4.  **Presentación (`src/presentation`)**: Controladores, Rutas y Middlewares de Express.

---

## 🚀 Empezando (Guía de Desarrollo)

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [PostgreSQL](https://www.postgresql.org/) o una instancia de base de datos compatible.
- Instancia de **Firebase** y **AWS S3** (o Minio para desarrollo local).

### 1. Clonar e Instalar

```bash
# Instalar dependencias
npm install
# o con yarn
yarn install
```

### 2. Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Configura las variables de conexión a la base de datos y las llaves de AWS/Firebase.

### 3. Base de Datos (Prisma)

Genera el cliente de Prisma y ejecuta las migraciones:

```bash
# Generar cliente
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init
```

### 4. Iniciar Servidor

```bash
# Modo desarrollo (con autorecarga)
npm run dev

# Compilar y ejecutar producción
npm run build
npm start
```

---

## 📖 Documentación de la API

La API cuenta con documentación interactiva generada con Swagger. Una vez que el servidor esté en ejecución, puedes acceder a ella en:

👉 `http://localhost:3000/api-docs`

### Módulos Principales:

- **Auth:** Registro y Login (tradicional y social con Firebase).
- **Users:** Gestión de perfiles, galería y roles.
- **Feeds:** Publicaciones con soporte multimedia.
- **Social:** Sistema de seguidores y solicitudes de conexión.
- **Notifications:** Alertas en tiempo real para interacciones.

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver el archivo `LICENSE` para más información.

---

© 2026 TalentKick - Potenciando el futuro del deporte.
