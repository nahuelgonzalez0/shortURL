//creo una funcion para crear la url corta
import crypto from 'crypto';

export function createShortUrL(longUrl:string) : string {
    //creo un hash a partir de la url larga
    const hash = crypto.createHash('sha256')
    hash.update(longUrl)
    const shortUrl = hash.digest('hex').slice(0, 6)
    return shortUrl
}