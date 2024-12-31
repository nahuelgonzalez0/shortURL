import { Router, Request, Response } from 'express';
import { createUrls, getLongUrl, getUrls, borrarbd } from '../database/bd';
import { validarURL } from '../utils/validation';
import { createShortUrL } from '../utils/shortener';
import { obtenerMetaDatos } from '../utils/obtenermd'
import { convert } from '../utils/convert';
import { generarIdUnico } from '../utils/idUnico'
const router = Router();

// Ruta para mostrar el formulario y la URL acortada
router.route('/url')
.get(async (req: Request, res: Response) => {
    await borrarbd();
    res.render('example', { title: 'Short URL', shortUrl: null, urls: null, message:'' })
})
.post(async (req: Request, res: Response) => {
    const { longUrl } = req.body
    console.log('URL recibida:', longUrl)
    let idUsuario = req.cookies.userId
    
    if (!idUsuario) {
        idUsuario = generarIdUnico();
        res.cookie('userId', idUsuario,{
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
    }

    try {
        if (!validarURL(longUrl)) {
            console.log('Error en la URL proporcionada')
            return res.render('error', { message: 'La URL proporcionada no es válida.' })
        }
        const urlConvertida = convert(longUrl)
        const shortUrl = createShortUrL(longUrl)
        const existingUrl = await getLongUrl(shortUrl)

        if (existingUrl) {
            console.log('La URL ya existe:', existingUrl.shortUrl)
            const urls = await getUrls(req.cookies.userId)
            return res.render('example', { title: 'Short URL', shortUrl: existingUrl.shortUrl, urls, message: 'La URL ya existe.' })
        }

        console.log('URL corta generada:', shortUrl)
        console.log('URL convertida:', urlConvertida)
        const metaDatos = await obtenerMetaDatos(urlConvertida)
        // Guarda el shortUrl y la longUrl en la base de datos
        await createUrls(idUsuario, shortUrl, urlConvertida, metaDatos?.titulo, metaDatos?.descripcion, metaDatos?.imagen)
        const urls = await getUrls(idUsuario)
        // Renderiza la página con la URL acortada
        res.render('example', { title: 'Short URL', shortUrl, urls, message: '' })
    } catch (error) {
        console.error('Error al procesar el registro:', error)
        res.status(500).send('Error interno del servidor')
    }
})

// Ruta dinámica para redirigir usando la URL acortada
router.route('/:shortUrl')
.get(async (req: Request, res: Response) => {
    const { shortUrl } = req.params

    try {
        const url = await getLongUrl(shortUrl)  // Recupera la URL original desde la base de datos

        if (!url) {
            console.log('URL no encontrada')
            res.status(404).send('URL no encontrada')
            return
        }

        // Redirige al usuario a la URL original
        res.redirect(url.longUrl)
    } catch (error) {
        console.error('Error al recuperar la URL:', error)
        res.status(500).send('Error interno del servidor')
    }
})

router.route('/mis-url')
.get(async (req: Request, res: Response) => {
    const idUsuario = req.cookies.userId
    try {
        const urls = await getUrls(idUsuario)
        res.render('example', { title: 'Mis URLs', urls, message:'' })
    } catch (error) {
        console.error('Error al obtener las URLs:', error)
        res.status(500).send('Error al obtener las URLs')
    }
})

export default router