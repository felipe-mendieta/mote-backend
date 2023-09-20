const express = require('express');
const cors = require('cors');
const { routerApi } = require('./routes');
const optionsCors = require('./config/configCors');
const optionsSessionGoogle = require('./config/configSessionGoogle');
//passport libraries************************
const passport = require('passport');
const session = require('express-session');
//End passoport librearies******************
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const createApp = () => {
  const app = express();
  app.use(express.static('public'))
  app.use(express.json());
  app.use(cors(optionsCors));
  app.use(session(optionsSessionGoogle));
  app.use(passport.initialize());//iniciamos la sesion
  app.use (passport.session ());//habilitamos el manejo de sesiones
  require('./../utils/auth/index');
  routerApi(app);
  //we use middlwares for catch errors and manages status code by https responses
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  return app;
};

module.exports = createApp;
