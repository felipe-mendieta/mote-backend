const InactiveTime = require('../database/entities/inactive-time.entity');
const RecordActivityService = require('./record-activity.service');
const NotificationsService = require('./notifications.service');
const activity = require('../../utils/enums/activity.enum');
const moment = require('moment');
const recordActivityService = new RecordActivityService();
const notificationsService = new NotificationsService();
class InactiveTimeService {
  interval;
  newActivity;
  getInterval(){
    if (this.interval) {
      return this.interval;
    }
    return null;
  }
  async create(userId, interval) {
    try {
      const newTimer = new InactiveTime({
        userId: userId,
        intervalId: interval,
        lastActivity: new Date(),
        inactiveTime: 0,
      })
      return await newTimer.save();
    } catch (error) {
      throw new Error(`Error creating timer: ${error.message}`);
    }
  }
  async delete(id) {
    try {
      return await InactiveTime.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting timer: ${error.message}`);
    }
  }
  async deleteByUserId(userId) {
    try {
      return await InactiveTime.findOneAndDelete({ userId: userId });
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
    let lastActivity = await recordActivityService.getByUserId(userId);
    if (!lastActivity) {
      //create a new record activity
      //create a new record activity
      this.newActivity = await recordActivityService.create({ activityType: activity.joinRoom, userId: userId });
      lastActivity = await recordActivityService.getByUserId(userId);
    }
    const timer = actualDate.diff(lastActivity.date);
    const timerSeconds = moment.duration(timer).asSeconds();
    return timerSeconds;
  }
  async initTimer(user, client) {
    try {
      this.interval = setInterval(async () => {
        try {

          const timer = await this.getTimerByUserId(user._id);
          const inactiveTime = await this.getByUuid(user._id);
          const timerObj = await this.update(inactiveTime._id, { inactiveTime: timer });
          //console.log('Variable: ', timerObj.inactiveTime);
          //change 'if' limit if you want to increase-decrease timeout limits (seconds) (900 seconds = 15 minutes)
          if (timerObj.inactiveTime >= 900) {
            this.newActivity = await recordActivityService.create({ activityType: activity.inactivity, userId: user._id });
            notificationsService.InactiveTimeNotification(client);
            await recordActivityService.create({ activityType: activity.inactivity, userId: user.uid });
          }
        } catch (error) {
          throw new Error(`Error in timer: ${error.message || error}`);
        }
      }, 60000);//change if you want to modify validation frequency (milliseconds) (60000 = 1 minute)
      //set ttl for the timer (class duration maybe)
      const ttl = 120 * 60 * 1000;
      setTimeout(() => {
        //console.log('Timer stopped');
        this.stopTimer(this.interval);
      }, ttl)

    } catch (error) {
      throw new Error(`Error creating interval: ${error.message}`);
    }
    return Number(this.interval);
  }
  async stopTimer(interval) {
    try {
      clearInterval(interval);
    } catch (error) {
      //throw new Error(`Error deleting interval: ${error.message}`);
    }
  }
}

module.exports = { InactiveTimeService };
