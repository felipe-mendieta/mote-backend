//La siguiente clave debe ponerse en las variables de entorno privateSecretKey
const crypto = require('crypto');

// Genera una clave secreta aleatoria de 64 bytes (512 bits)
const secretKey = crypto.randomBytes(64).toString('hex');

console.log('Clave secreta generada:', secretKey);
