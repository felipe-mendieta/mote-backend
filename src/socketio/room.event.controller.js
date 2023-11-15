
const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual
const { checkJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const users = new UserContainer();
const joinRoom = (io, client) => {
  client.on('joinRoom', async (data) => {
    try {
      const { roomCode, token} = data;

      //esto noralmente se deberia buscar en la base de datos, saber si un usuario es admin o user, por ahora
      //asignamos segun venga del front


      // Verify if room exists
      const user = checkJWT(token);
      if(!user){
        //disconnect client
        client.emit('error', `Error join room.`);
        client.disconnect();
        return;
      }
      const admin=users.getUser(user.uuid);
      admin.idSocket=client.id;
      client.join(roomCode);
      client.emit('success', `Room exist. User ${ user.idSocket} authorized.`);
      console.log("Clientes conectados autorizados: ", io.engine.clientsCount);


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
