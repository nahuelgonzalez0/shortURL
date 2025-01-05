import express from 'express'
import path from 'path'
import router from './routes/routes'
import cookieParser from 'cookie-parser';
import { getUrls } from './database/bd'
const app = express()

const PORT = process.env.PORT || 3000
// Middleware para manejar JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(router)
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

// Ruta principal
app.get("/", (req, res) => {
  const urls = getUrls(req.cookies.idUsuario)
  res.render("example", { title: 'Short URL', shortUrl: null, urls: urls, message:''} ); // Renderiza tu archivo example.ejs
});

// Ruta básica para verificar que el servidor funciona
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})