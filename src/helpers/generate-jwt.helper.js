const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, config.secretPrivateKey, {
      expiresIn: '4h'
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

/*
generateToken(user) {
    const payload = {
      userId: user._id,
      // Puedes agregar más información al payload si es necesario
    };

    const options = {
      expiresIn: '1h', // El token expira en 1 hora (ajusta según tus necesidades)
    };

    return jwt.sign(payload, config.secretKey, options);
  }
*/
