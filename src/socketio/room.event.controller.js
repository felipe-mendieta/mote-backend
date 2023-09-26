const RoomService = require('../services/room.service')
const UserService = require('../services/user.service');

const roomService = new RoomService();
const userService = new UserService();
let { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual

const joinRoom = (io, client) => {
  client.on('joinRoom', async (data, callback) => {
    try {
      const { email, roomCode, } = data;
      // Verificar si la sala existe
      const roomExists = await roomService.exists(roomCode);
      if (!roomExists) {
        //client.emit('error', 'Room does not exist');
        console.log("Room doesn't exist");
        return client.disconnect();
      }
      // Buscar al usuario por email y obtener su ID
      // const user = await userService.getByEmail(email);
      // if (!user) {
      //   callback('User not found');
      //   return client.disconnect();
      // }

      //const userId = user._id;
      // Unir al usuario a la sala
      //await roomService.addUser(roomCode, userId);
      client.join(roomCode);

      callback('success Joined room successfully');
      const currentPoll=getCurrentPoll();
      if (currentPoll) {
        client.emit('putPolls', currentPoll);
      }

    } catch (error) {
      callback(`error ${error}`);
    }
  });

};

module.exports = { joinRoom };

// Obtener el tipo de usuario (admin o normal) y unirlo a la sala
//const userType = await userService.getUserType(userId);
// client.on('joinRoom', async (data, callback) => {

//   if (!data.name || !data.roomCode) { return callback({ error: true, mensaje: 'Code Room is required.' }); }

//   if (room.getCode() != data.roomCode) {//si es que el código de la sala no existe
//     client.disconnect();
//     return callback({ error: true, mensaje: 'cliente no permitido' });
//   }

//   client.join(data.roomCode);

//   const student = new Student(client.id, data.name);
//   room.addStudent(student);

//   // Condicional parte del registro de eventos, permite saber si es necesario enviar una poll a un nuevo usuer conectado.
//   if (currentPoll) {
//     client.emit('putPolls', currentPoll);
//   }

//   console.log(room.getStudents().slice(-1)[0]);
//   callback(`${student.name} respondiendo desde el servidor, todo ha salido bien.`);

// });
