
const createSocketServer =
  (app) => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
      console.log({ msg: "Client connected." });


      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {//esto se debe llamar
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });

    });
    return server;


  }

module.exports = createSocketServer;
