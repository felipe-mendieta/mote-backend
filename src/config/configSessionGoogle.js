const config = require('./config');
//primero configuramos, luego inicializamos
const optionsSessionGoogle = {
  secret: config.secretPrivateKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: config.isProd,
    maxAge: 1000 * 60 * 60 * 24 * 7//una semana
  }
}
module.exports = optionsSessionGoogle;
