const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual
const { checkJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const UserService = require('../services/user.service');
const RoomService = require('../services/room.service');
const { InactiveTimeService } = require('../services/inactive-time.service');
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
      if (await userService.isAdmin(userId)) {
        client.join(`${roomCode}_AD`);
      } else {
        client.join(roomCode);
      }
      if (await userService.getById(userId) == null) { //control of users that will be created for send notifications
        //create user on DB
        const newUser = await userService.getById(userId);
        console.log(`Ingreso a la sala: ${newUser}`);
        const room = await roomService.exists(roomCode);
        //add user to room on DB
        await roomService.addUser(room._id, newUser._id);
        //await recordActivityService.create({ activityType: activity.joinRoom, userId: newUser.uid, roomId: room._id });
        //create and start timer
        await inactiveTimeService.create(newUser._id); //create time in DB
        await inactiveTimeService.initTimer(newUser, client); //init timer db
      }

      client.emit('success', `Room exist. User ${client.id} authorized.`);
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
  //logout
  client.on('leaveRoom', async (data) => {
    const { roomCode, token, userId } = data;
    const interval =  inactiveTimeService.getInterval();
    inactiveTimeService.stopTimer(interval);
    client.disconnect();
    console.log("Cliente desconectado: ", client.id);
  });

};

module.exports = { joinRoom };
