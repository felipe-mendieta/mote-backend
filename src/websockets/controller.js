const Room = require('../models/room');
const Student = require('../models/student');

const room = new Room('12345', 'Engagement Room');//no es importante que el code vaya en string
const PollService = require('./../services/poll.service');
const pollService = new PollService();
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

      console.log(room.getStudents().slice(-1)[0]);
      callback(`${student.name} respondiendo desde el servidor, todo ha salido bien.`);

    });

    client.on('admin', async (idPoll, callback) => {
      const poll = await pollService.getById(idPoll);
      await client.broadcast.to(room.getCode()).emit('putPolls', poll.toObject());
      await callback("Encuesta enviada correctamente.");
    });

    client.on('disconnect', () => {
      room.removeStudent(client.id);
      console.log("cliente desconectado.")
    });
  });

}

module.exports = { socketController }
