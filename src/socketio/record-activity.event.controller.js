const RecordActivity = require('./../services/record-activity.service');
const recordActivityService = new RecordActivity();


const saveActivity = (io, client) => {
  client.on(`saveActivity`, async (data) => {
    try {
      const { roomCode, activityType } = data;
      const newActivity = {
        activityType:activityType,
        roomId: roomCode,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved.`);
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
