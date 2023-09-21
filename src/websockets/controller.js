const Room = require('../models/room');
const Student = require('../models/student');
const PollService = require('./../services/poll.service');
const pollService = new PollService();

const room = new Room('12345', 'Engagement Room');//no es importante que el code vaya en string
let currentPoll = null; // Encuesta actual
const eventRegistry = []; // Registro de eventos

const socketController = async (io) => {

  io.on('connection', (client) => {//cuando se conecta un cliente desde el frontend
    client.on('joinRoom', async (data, callback) => {

      if (!data.name || !data.roomCode) { return callback({ error: true, mensaje: 'Code Room is required.' }); }

      if (room.getCode() != data.roomCode) {//si es que el código de la sala no existe
        client.disconnect();
        return callback({ error: true, mensaje: 'cliente no permitido' });
      }

      client.join(data.roomCode);

      const student = new Student(client.id, data.name);
      room.addStudent(student);

      // Condicional parte del registro de eventos, permite saber si es necesario enviar una poll a un nuevo usuer conectado.
      if (currentPoll) {
        client.emit('putPolls', currentPoll);
      }

      console.log(room.getStudents().slice(-1)[0]);
      callback(`${student.name} respondiendo desde el servidor, todo ha salido bien.`);

    });

    client.on('sendPoll', async (data, callback) => {
      try {//envia la encuesta a todos los clientes nuevos que se conecten, se utiliza la estrategia de registro de eventos
        const { roomCode, idPoll } = data;
        if(idPoll && roomCode ){
          const poll = await pollService.getById(idPoll);
          currentPoll = poll; // Actualiza la encuesta actual
          currentPoll=poll.toObject() ;
          eventRegistry.push({ type: 'poll', data:currentPoll });
          client.broadcast.to(roomCode).emit('putPolls', currentPoll);
          callback("Encuesta enviada correctamente.");
        }else{
          callback("Encuesta no existe o room id no existe");
        }


      } catch (error) {
        console.error('Error al obtener la encuesta:', error);
        callback("Hubo un error al obtener la encuesta.");
      }
    });

    client.on('closePoll', (data, callback) => {
      currentPoll = null; // Encuesta actual se cierra, esto evita que el eventRegistry actue, en la condición anterior
      console.log("encuesta cerrada.")
      callback("Encuesta cerrada correctamente.");
    });

    client.on('disconnect', () => {
      room.removeStudent(client.id);
      console.log("cliente desconectado.")
    });



  });

}

module.exports = { socketController }
