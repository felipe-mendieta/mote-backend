const RecordActivityService = require('./../services/record-activity.service');
const recordActivityService = new RecordActivityService();
const RoomService  = require('../services/room.service');
const roomService = new RoomService();
const { DashboardActivityService } = require('../services/dashboard-activity.service');
const dashboardActivityService = new DashboardActivityService();
const sendFlashQuestion = (io, client) => {
  client.on('sendFlashQuestion', async (data) => {
    try {
      const {roomId, roomCode, question, userId } = data;
      console.log('sendFlashQuestion', data);
      client.broadcast.to(roomCode).emit('putFlashQuestionsAdmin', question);
      client.broadcast.to(roomCode).emit('success', "Flashquestions send success.");
    } catch (error) {
      console.error('Error sending flashquestion:', error.message);
      client.emit('error', `Error sending flashquestion. Stack: ' ${error.message}`);
    }
  });
  client.on(`saveActivityFlashAnswer`, async (data) => {
    console.log("saveActivityFlashAnswer");
    try {
      const { roomId, activityType, text, userId, done } = data;
      const newActivity = {
        activityType: activityType,
        roomId: roomId,
        text: text,
        userId: userId,
        done: done
      };
      console.log("newActivityFlashAnswer", newActivity);

      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved. Hello from backend`);//msg for success
      //dashboard emits
      const room = await roomService.getById(roomId);
      console.log("Excecuting saveActivityFlashAnswer");
      io.to(`${room.code}_AD`).emit('activityFlashquestionRealTime', newActivity); //dashboard
      await dashboardActivityService.updateDataDashboardActivity(roomId,userId,activityType);

    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
}


module.exports = { sendFlashQuestion };
