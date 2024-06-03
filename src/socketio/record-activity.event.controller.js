const RecordActivityService = require('./../services/record-activity.service');
const recordActivityService = new RecordActivityService();
const { DashboardEmotionsService } = require('../services/dashboard-emotions.service');
const dashboardEmotionsService = new DashboardEmotionsService();
const { DashboardActivityService } = require('../services/dashboard-activity.service');
const dashboardActivityService = new DashboardActivityService();
const RoomService  = require('../services/room.service');
const roomService = new RoomService();


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
      const room = await roomService.getById(roomId);
      io.to(`${room.code}_AD`).emit(
        'activityRealTime',
        newActivity,
      );//emit to all users on room

      const dashboardActivity = await dashboardActivityService.updateDataDashboardActivity(roomId,userId,activityType);
        //emit all dashboard activity
        if(dashboardActivity){
          io.to(`${room.code}_AD`).emit('dashboardActivity', dashboardActivity);
          console.log("update dashboard activity: ", dashboardActivity);
        }

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
        const documentEmotions = await dashboardEmotionsService.updateEmotion(text, userId, roomId);
        if (documentEmotions) {
          const room = await roomService.getById(roomId);
          io.to(`${room.code}_AD`).emit('dashboardEmotions', documentEmotions.toObject());
          console.log("update emotion: ", documentEmotions.toObject());
        }
      }
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);//msg for success
      //dashboard emits
      const room = await roomService.getById(roomId);
      io.to(`${room.code}_AD`).emit('activityCommentRealTime', newActivity); //dashboard
      await dashboardActivityService.updateDataDashboardActivity(roomId,userId,activityType);
      
      
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
