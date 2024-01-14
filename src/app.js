const express = require('express');
const cors = require('cors');
const { routerApi } = require('./routes');
const optionsCors = require('./config/configCors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
//passport libraries************************

//End passoport librearies******************

const createApp = () => {
  const app = express();
  app.use(cors(optionsCors));
  //middlewares
  app.use(express.static('public'))
  app.use(express.json());


  require('./../utils/auth/index');
  //For catch errors and manages status code by https responses
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  routerApi(app);
  return app;
};

module.exports = createApp;
