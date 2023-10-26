
const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual

const joinRoom = (io, client) => {
  client.on('joinRoom', async (data) => {
    try {
      const { roomCode, } = data;
      // Verificar si la sala existe

      client.join(roomCode);

      client.emit('success', "Room exist. User authorized.");
      //verifica si hay polls pendientes de enviar
      const currentPoll = getCurrentPoll();
      if (currentPoll) {
        client.emit('putPolls', currentPoll);
      }

    } catch (error) {
      client.emit('error', `Error join room.`);
      console.log(error);
    }
  });

};

module.exports = { joinRoom };
