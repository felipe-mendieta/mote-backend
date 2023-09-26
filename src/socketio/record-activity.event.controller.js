const RecordActivity = require('./../services/record-activity.service')
const recordActivityService = new RecordActivity();
const activity = require('./../../utils/enums/activity.enum');
const saveActivitySleep = (io, client) => {
  client.on('saveActivitySleep', async (data, callback) => {
    const { idRoom, userId } = data;
    const newActivity = {
      activityType: activity.sleep,
      userId: userId,
      idRoom: idRoom
    }
    await recordActivityService.create(newActivity);
    callback("Create activity sucessfull");
  });

}
const saveActivityIdontgetit = (io, client) => {
  client.on('saveActivityIdontGetIt', async (data, callback) => {
    const { idRoom, userId } = data;
    const newActivity = {
      activityType: activity.iDontGetIt,
      userId: userId,
      idRoom: idRoom
    }
    await recordActivityService.create(newActivity);
    callback("Create activity sucessfull");
  });

}
module.exports = { saveActivitySleep, saveActivityIdontgetit }
