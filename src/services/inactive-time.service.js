const InactiveTime = require('../database/entities/inactive-time.entity');
const RecordActivityService = require('./record-activity.service');
const NotificationsService = require('./notifications.service');
const moment = require('moment');
const recordActivityService = new RecordActivityService();
const notificationsService = new NotificationsService();
class InactiveTimeService {
  async create(userId) {
    try {
      const newTimer = new InactiveTime({
        userId: userId,
        lastActivity: new Date(),
        inactiveTime: 0,
      })
      return await newTimer.save();
    } catch (error) {
      throw new Error(`Error creating timer: ${error.message}`);
    }
  }
  async stop(id) {
    try {
      InactiveTime.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting timer: ${error.message}`);
    }
  }
  async update(id, changes) {
    try {
      return await InactiveTime.findByIdAndUpdate(id, changes, { upsert: true, new: true });
    } catch (error) {
      throw new Error(`Error updating timer: ${error.message}`);
    }
  }
  async getByUuid(userId) {
    try {
      const inactiveTime = await InactiveTime.findOne({ userId: userId });
      return inactiveTime;
    } catch (error) {
      throw new Error(`Error checking if timer exists: ${error.message}`);
    }
  }
  async getTimerByUserId(userId) {

    const actualDate = moment();
    const lastActivity = await recordActivityService.getByUserId(userId);
    const timer = actualDate.diff(lastActivity.date);
    const timerSeconds = moment.duration(timer).asSeconds();
    return timerSeconds;
  }
  async initTimer(user, client) {
    try {
      const interval = setInterval( async () => {
        const timer = await this.getTimerByUserId(user.uid);
        const inactiveTime = await this.getByUuid(user._id);
        const timerObj = await this.update(inactiveTime._id,{inactiveTime: timer});
        if (timerObj.inactiveTime >= 15) {
          notificationsService.InactiveTimeNotification(client)
          this.stopTimer(interval);
        }
      }, 5000);
    } catch (error) {
      throw new Error(`Error creating interval: ${error.message}`);
    }
  }
  async stopTimer(interval) {
    try {
      clearInterval(interval);
    } catch (error) {
      throw new Error(`Error deleting interval: ${error.message}`);
    }
  }
}

module.exports = InactiveTimeService;