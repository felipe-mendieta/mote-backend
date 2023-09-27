const { joinRoom } = require('./room.event.controller');
const { sendPoll, closePoll } = require('./poll.event.controller');
const { saveActivitySleep, saveActivityIdontgetit } = require('./record-activity.event.controller');

const socketController = async (io) => {
  io.on('connection', (client) => {
    try {
      joinRoom(io, client);
      sendPoll(io, client);
      closePoll(io, client);
      saveActivitySleep(io, client);
      saveActivityIdontgetit(io, client);

      console.log("Clientes conectados: ", io.engine.clientsCount);

      client.on('disconnect', () => {
        console.log("Cliente desconectado: ", client.id);
      });
    } catch (error) {
      console.error('Error handling socket event:', error.message);
      client.emit('error', 'An error occurred while handling the socket event.');
    }
  });
};

module.exports = { socketController };
