import { Router } from 'express'
import { obtenerMetaDatos } from '../utils/obtenermd'  
import {convert} from '../utils/convert'
const router = Router()

router.route('/metadata')
.get(async (req, res) => {
    const { url } = req.query
    if (typeof url !== 'string') {
        return res.render('error', { message: 'La URL proporcionada no es válida.' })
    }

    try {
        const urlConvertida = convert(url)
        console.log('url en metadata.ts', urlConvertida)
        const metadatos = await obtenerMetaDatos(urlConvertida)

        if (!metadatos) {
            console.log('no hay metadatos')
            return res.render('error', { message: 'No se encontraron metadatos para esta URL.' });
        }

        res.render('metadatos', { metadatos });
    } catch (error) {
        console.error('Error en la ruta /metadatos:', error)
        res.status(500).json({ error: 'Hubo un error al obtener los metadatos.' })

    }
   
})
export default router
