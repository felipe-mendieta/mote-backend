
const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual
const { checkJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const UserService = require('../services/user.service');
const RoomService = require('../services/room.service');
const mongoose = require('mongoose');
const InactiveTimeService = require('../services/inactive-time.service');
const joinRoom = (io, client) => {
  const users = new UserContainer();
  const userService = new UserService();
  const roomService = new RoomService();
  const inactiveTimeService = new InactiveTimeService();

  client.on('joinRoom', async (data) => {
    try {
      const { roomCode, token, userId } = data;

      //esto noralmente se deberia buscar en la base de datos, saber si un usuario es admin o user, por ahora
      //asignamos segun venga del front

      // Verify if room exists
      const user = checkJWT(token);
      if (!user) {
        //disconnect client
        client.emit('error', `Error join room.`);
        client.disconnect();
        return;
      }
      const admin = users.getUser(user.uuid);
      if (admin) {
        admin.idSocket = client.id;
      }
      client.join(roomCode);
      const newUser = await userService.create(userId);
      const room = await roomService.exists(roomCode);
      console.log(room);
      roomService.addUser(room._id, newUser._id);
      inactiveTimeService.create(newUser._id);
      client.emit('success', `Room exist. User ${client.id} authorized.`);
      console.log("Clientes conectados autorizados: ", io.engine.clientsCount);
      setTimeout(async function(){
        const timer = await inactiveTimeService.getTimerByUserId(newUser.uid);
        client.emit('timeOut', `TimeOut para: ${timer}`);
      },5000)


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
  //logout
  client.on('leaveRoom', async (data) => {
    const { roomCode, token, userId } = data;
    //Get user _id and room _id to delete user from room when disconnect
    // const user = await userService.getByUuid(userId)
    // await userService.deleteById(user._id);
    // const room = await roomService.exists(roomCode);
    // roomService.deleteUser(room._id,user._id);
    // userService.deleteById(user._id);
    client.disconnect();
    console.log("Cliente desconectado: ", client.id);
  });


};

module.exports = { joinRoom };
