const express = require('express');
const cors = require('cors');
const { routerApi } = require('./routes');
const optionsCors = require('./config/configCors');
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
  app.use(express.json());
  app.use(cors(optionsCors));
  require('./../utils/auth/index')
  app.use(session({//primero configuramos, luego inicializamos
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(passport.initialize());
  //app.use (passport.session ());
  routerApi(app);
  //we use middlwares for catch errors and manages status code by https responses
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  return app;
};

module.exports = createApp;
