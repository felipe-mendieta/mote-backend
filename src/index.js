
const getConnection = require('./database/connection');
const createApp = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const config = require('./config/config');
const { socketController } = require('./websockets/controller');

getConnection();
const app = createApp();

//sockets
const server = http.createServer(app);
const io = new Server(server);
socketController(io);
server.listen(config.port || 3002,
  () => {
    console.log(`listening on ${config.port}`);
  }
);
//fin sockets
module.exports = app;
