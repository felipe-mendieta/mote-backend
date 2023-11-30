//ESTRUCTURA ALTERNATIVA PARA CORRER APLICACIÓN - AÚN NO ESTA PUESTA EN FUNCIONAMIENTO
const express = require('express');
const config = require('./../config/config');
const optionsCors = require('./config/configCors');
//const optionsSessionGoogle = require('./config/configSessionGoogle');
const cors = require('cors');
const getConnection = require('./../database/connection');
const { routerApi } = require('./../routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { socketController } = require('../websockets/controller');
//passport libraries************************
//const passport = require('passport');
//const session = require('express-session');
//End passoport librearies******************
class Server {

  constructor() {
    this.app = express();
    this.port = config.port;

    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server)
    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    //Sockets
    this.sockets();
  }

  async conectarDB() {
    await getConnection();
  }


  middlewares() {
    this.app.use(express.json());
    this.app.use(cors(optionsCors));
    //this.app.use(session(optionsSessionGoogle));
    // this.app.use(passport.initialize());//iniciamos la sesion
    // this.app.use(passport.session());//habilitamos el manejo de sesiones
    require('./../utils/auth/index');
    //we use middlwares for catch errors and manages status code by https responses
    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
    this.app.use(express.static('public'))


  }
  routes() {
    routerApi(this.app);
  }

  sockets() {

    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}


module.exports = Server;
