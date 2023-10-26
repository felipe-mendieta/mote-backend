const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { UserContainer } = require('../models/classes/user.container');

const generateJWT = (uid = '', roomCode) => {
  return new Promise((resolve, reject) => {

    const payload = { uid, roomCode };

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

const checkJWT = async (token = '') => {

  try {

    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, config.secretPrivateKey);
    const usuario = await UserContainer.findById(uid);

    if (usuario) {
      return usuario;
    } else {
      return null;
    }

  } catch (error) {
    return null;
  }

}

module.exports = {
  generateJWT,
  checkJWT
}

