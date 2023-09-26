const PollService = require('../services/poll.service');
const pollService = new PollService();
let {setCurrentPoll,getEventRegistry} = require('./registries/poll.event.registry'); // Encuesta actual

const sendPoll = (io, client) => {
  client.on('sendPoll', async (data) => {
    const { roomCode, idPoll, } = data;
    if (idPoll && roomCode) {
      const poll = await pollService.getById(idPoll);

      const currentPoll = poll.toObject();// Actualiza la encuesta actual
      setCurrentPoll(currentPoll);
      const eventRegistry=getEventRegistry();
      eventRegistry.push({ type: 'poll', data: currentPoll });
      client.broadcast.to(roomCode).emit('putPolls', currentPoll);

    }
  });
}
const closePoll = (io, client) => {

  client.on('closePoll', async (data) => {
    const { roomCode, idPoll, } = data;
    if (idPoll && roomCode) {
      //await pollService.patch(idPoll, { status: false });
      const currentPoll = null; // Encuesta actual se cierra, esto evita que el eventRegistry actue, en la condición anterior
      setCurrentPoll(currentPoll);
      console.log("encuesta cerrada.");
    }
  });
}
module.exports = { sendPoll, closePoll };

// client.on('sendPoll', async (data, callback) => {
//   try {//envia la encuesta a todos los clientes nuevos que se conecten, se utiliza la estrategia de registro de eventos
//     const { roomCode, idPoll } = data;
//     if(idPoll && roomCode ){
//       const poll = await pollService.getById(idPoll);
//       currentPoll = poll; // Actualiza la encuesta actual
//       currentPoll=poll.toObject() ;
//       eventRegistry.push({ type: 'poll', data:currentPoll });
//       client.broadcast.to(roomCode).emit('putPolls', currentPoll);
//       callback("Encuesta enviada correctamente.");
//     }else{
//       callback("Encuesta no existe o room id no existe");
//     }


//   } catch (error) {
//     console.error('Error al obtener la encuesta:', error);
//     callback("Hubo un error al obtener la encuesta.");
//   }
// });

// client.on('closePoll', (data, callback) => {
//   currentPoll = null; // Encuesta actual se cierra, esto evita que el eventRegistry actue, en la condición anterior
//   console.log("encuesta cerrada.")
//   callback("Encuesta cerrada correctamente.");
// });
