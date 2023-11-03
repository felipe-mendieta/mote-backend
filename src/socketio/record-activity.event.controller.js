const RecordActivity = require('./../services/record-activity.service');
const recordActivityService = new RecordActivity();


const saveActivity = (io, client) => {
  client.on(`saveActivity`, async (data) => {
    try {
      const { roomId, activityType } = data;
      const newActivity = {
        activityType:activityType,
        roomId: roomId,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', `Activity ${activityType} saved.`);
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
      client.emit('success', `Activity ${activityType} saved.`);
    } catch (error) {
      client.emit('error', `Error saving Activity: ${error.message}`);
    }
  });
};

module.exports = { saveActivity };
