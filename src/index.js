
const getConnection = require('./database/connection');
const createApp = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const config = require('./config/config');
const { socketController } = require('./socketio/controller');

getConnection()
const app = createApp();

//sockets
const httpServer = http.createServer(app);
const io = new Server(httpServer);
socketController(io);
httpServer.listen(config.port || 3002,
  () => {
    console.log(`listening on ${config.port}`);
  }
);
//fin sockets con http, para pasar a producción a https veR:
//for httpS server https://socket.io/docs/v4/server-initialization/
module.exports = app;
