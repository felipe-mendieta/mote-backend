const RecordActivityService = require('./../services/record-activity.service');
const recordActivityService = new RecordActivityService();
const { ViewActivityService } = require('./../services/view-activity.service');
const viewActivityService = new ViewActivityService();


//const { UserContainer } = require('../models/classes/user.container');
//const users = new UserContainer();
const saveActivity = (io, client) => {
  client.on(`saveActivity`, async (data) => {
    try {
      const { roomId, activityType, userId } = data;
      const newActivity = {
        activityType: activityType,
        roomId: roomId,
        userId: userId
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);

      // const admin = users.getUserAdmin()
      // console.log("usuarios: ", admin);
      // client.to(admin.idSocket).emit('activityRealTime', newActivity); // emit to specific user
      io.emit(
        'activityRealTime',
        newActivity,
      );//emit to all users
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
  client.on(`saveActivityComment`, async (data) => {
    try {
      const { roomId, activityType, text, userId } = data;
      const newActivity = {
        activityType: activityType,
        roomId: roomId,
        text: text,
        userId: userId
      };

      if (activityType === 'emotion') {
        //
        // await viewActivityService.findEmotion(text, userId);

      }
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);
      //client.emit('activityRealTime', newActivity);//return data for dashboard
      io.emit('activityCommentRealTime',newActivity);
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
