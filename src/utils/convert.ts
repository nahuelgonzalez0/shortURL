import {validarURL} from './validation'
export function convert(url: string): string {
    console.log('url original', url)
    if (!validarURL(url)) {
        console.error('la url no esta siendo valida:', url);
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;  // Añadir https por defecto si no tiene protocolo
    }

   if (url.includes("x.com")) {
    console.log('paso la prueba')
    const urlNueva = url.replace("x.com", "fxtwitter.com")
    console.log('url convertida en convert:', urlNueva)
    return urlNueva
   }
   return url
}