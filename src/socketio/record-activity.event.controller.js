const RecordActivity = require('./../services/record-activity.service');
const recordActivityService = new RecordActivity();
const activity = require('./../../utils/enums/activity.enum');

const saveActivitySleep = (io, client) => {
  client.on('saveActivitySleep', async (data) => {
    try {
      const { idRoom, userId } = data;
      const newActivity = {
        activityType: activity.sleep,
        userId: userId,
        idRoom: idRoom,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', "Activity Sleep saved.");
    } catch (error) {
      client.emit('error', `Error saving Activity Sleep: ${error.message}`);
    }
  });
};

const saveActivityIdontgetit = (io, client) => {
  client.on('saveActivityIdontGetIt', async (data) => {
    try {
      const { idRoom, userId } = data;
      const newActivity = {
        activityType: activity.iDontGetIt,
        userId: userId,
        idRoom: idRoom,
      };
      await recordActivityService.create(newActivity);
      client.emit('success', "Activity IdontGetIt saved.");
    } catch (error) {
      client.emit('error', `Error saving Activity IdontGetIt: ${error.message}`);
    }
  });
};

module.exports = { saveActivitySleep, saveActivityIdontgetit };
