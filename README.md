# Acortador de URL

Este es un proyecto de un **acortador de URLs** simple en Node.js utilizando **Express**. Permite a los usuarios ingresar una URL larga, convertirla en una versión corta, y almacenarla en una base de datos SQLite.

## 🛠️ Dependencias

El proyecto utiliza las siguientes dependencias:

- **@types/cookie-parser**: Tipos de TypeScript para el paquete `cookie-parser`.
- **axios**: Cliente HTTP para realizar solicitudes HTTP.
- **cheerio**: Biblioteca para analizar y manipular HTML (similar a jQuery).
- **cookie-parser**: Middleware para analizar cookies en Express.
- **dotenv**: Cargar variables de entorno desde un archivo `.env`.
- **ejs**: Motor de plantillas para generar vistas dinámicas en el servidor.
- **express**: Framework de Node.js para gestionar el servidor y las rutas.
- **nanoid**: Generador de identificadores únicos.
- **sqlite**: Biblioteca para interactuar con bases de datos SQLite.
- **sqlite3**: Driver de Node.js para trabajar con SQLite.

## 📥 Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tuusuario/acortador-urls.git
   cd acortador-urls
/acortador-urls
  /node_modules       # Dependencias de Node.js
  /views              # Archivos de vista EJS
  /public             # Archivos estáticos (CSS, JS, imágenes)
  .env                # Variables de entorno
  app.js              # Archivo principal del servidor
  package.json        # Información del proyecto y dependencias
