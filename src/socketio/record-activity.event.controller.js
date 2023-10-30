const RecordActivity = require('./../services/record-activity.service');
const recordActivityService = new RecordActivity();
const activity = require('./../../utils/enums/activity.enum');

const saveActivity = (io, client) => {
  client.on(`saveActivity`, async (data) => {
    try {
      const { roomCode, activityType } = data;
      const newActivity = {
        activityType: activity[activityType],
        idRoom: roomCode,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved.`);
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
