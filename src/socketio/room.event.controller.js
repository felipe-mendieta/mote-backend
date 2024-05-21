
const { getCurrentPoll } = require('./registries/poll.event.registry'); // Encuesta actual
const { checkJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const UserService = require('../services/user.service');
const RoomService = require('../services/room.service');
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
      if (await userService.getByUuid(userId) == null) { //control of users that will be created for send notifications
        //create user on DB
        const newUser = await userService.create(userId);
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
    console.log('se ha ejecutado el evento leaveroom')
    const { roomCode, token, userId } = data;
    console.log(`codigo de sala: ${roomCode}`);
    console.log(`Id de usuario: ${userId}`);
    client.disconnect();
    console.log("Cliente desconectado: ", client.id);
  });
  client.on('studentLeaveRoom', async (data) => {
    const { roomCode, token, userId } = data;
    console.log(`codigo de sala: ${roomCode}`);
    console.log(`Id de usuario: ${userId}`);
    //Get user _id and room _id to delete user from room when disconnect
    const user = await userService.getByUuid(userId)
    let room = await roomService.exists(roomCode);
    if(!room || !user){
      return;
    }
    //delete timer and user on db
    await inactiveTimeService.deleteByUserId(user._id);
    await roomService.deleteUser(room._id, user._id);
    await userService.deleteById(user._id);
    client.disconnect();
  });


};

module.exports = { joinRoom };
