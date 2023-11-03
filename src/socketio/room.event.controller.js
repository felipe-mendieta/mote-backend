
const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual

const joinRoom = (io, client) => {
  client.on('joinRoom', async (data) => {
    try {
      const { roomCode, } = data;
      // Verify if room exists

      client.join(roomCode);

      client.emit('success', `Room exist. User ${client.id} authorized.`);
      //verify if there is pending poll for send
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
