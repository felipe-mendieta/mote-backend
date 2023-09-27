const RoomService = require('../services/room.service')

const roomService = new RoomService();
let { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual

const joinRoom = (io, client) => {
  client.on('joinRoom', async (data) => {
    try {
      const { roomCode, } = data;
      // Verificar si la sala existe
      const roomExists = await roomService.exists(roomCode);
      if (!roomExists) {
        client.emit('unauthorized', "Room doesn't exist.");
        return client.disconnect();
      }
      client.join(roomCode);

      client.emit('success', "Room exist. User authorized.");
      //verifica si hay polls pendientes de enviar
      const currentPoll = getCurrentPoll();
      if (currentPoll) {
        client.emit('putPolls', currentPoll);
      }

    } catch (error) {
      client.emit('error', `Error join room. Stack: ' ${error.message}`);
    }
  });

};

module.exports = { joinRoom };
