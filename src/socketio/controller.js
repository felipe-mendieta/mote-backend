const { joinRoom } = require('./room.event.controller');
const { sendPoll, closePoll } = require('./poll.event.controller');
const { saveActivitySleep , saveActivityIdontgetit } = require('./record-activity.event.controller');
const socketController = async (io) => {

  io.on('connection', (client) => {//cuando se conecta un cliente desde el frontend

    joinRoom(io, client);//controlamos acceso de los client sockets


    // Manejar eventos relacionados con las encuestas
    sendPoll(io, client);//escuchamos si existe un evento que envie las encuestas en broadcast
    closePoll(io, client);//cerramos la encuesta para que no se envie a los nuevos client socket

    //manejo de actividades, guardado
    saveActivitySleep(io,client);
    saveActivityIdontgetit(io,client);


    console.log("Clientes conectados: ",io.engine.clientsCount);
    client.on('disconnect', () => {
      console.log("cliente desconectado.",client.id)
    });

  });

}

module.exports = { socketController }
