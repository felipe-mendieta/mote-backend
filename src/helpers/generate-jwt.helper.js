const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, config.secretPrivateKey, {
      expiresIn: '4h'// El token expira en 4 horas (ajusta según tus necesidades)
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Could not generate toke.')
      } else {
        resolve(token);
      }
    })
  });
}

module.exports = {
  generateJWT
}

