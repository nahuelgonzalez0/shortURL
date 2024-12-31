import crypto from 'crypto';

export function generarIdUnico() {
    return crypto.randomBytes(16).toString('hex'); // Genera un ID único de 32 caracteres en formato hexadecimal
}