const RecordActivity = require('./../services/record-activity.service');
const recordActivityService = new RecordActivity();
const { UserContainer } = require('../models/classes/user.container');
const users = new UserContainer();
const saveActivity = (io, client) => {
  client.on(`saveActivity`, async (data) => {
    try {
      const { roomId, activityType } = data;
      const newActivity = {
        activityType:activityType,
        roomId: roomId,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);

      const admin=users.getUserAdmin()
      console.log("usuarios: ",admin);
      client.to(admin.idSocket).emit('activityRealTime', newActivity); // emit to specific user
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
  client.on(`saveActivityComment`, async (data) => {
    try {
      const { roomId, activityType,text } = data;
      const newActivity = {
        activityType:activityType,
        roomId: roomId,
        text:text
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);
      client.emit('activityRealTime',newActivity);//return data for dashboard
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
