const InactiveTime = require('../database/entities/inactive-time.entity');
const RecordActivityService = require('./record-activity.service');
const NotificationsService = require('./notifications.service');
const activity = require('../../utils/enums/activity.enum');
const moment = require('moment');
const recordActivityService = new RecordActivityService();
const notificationsService = new NotificationsService();
class InactiveTimeService {
  interval;
  getInterval(){
    if (this.interval) {
      return this.interval;
    }
    return null;
  }
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
    const lastActivity = await recordActivityService.getByUserId(userId);
    const timer = actualDate.diff(lastActivity.date);
    const timerSeconds = moment.duration(timer).asSeconds();
    return timerSeconds;
  }
  async initTimer(user, client) {
    try {
      this.interval = setInterval(async () => {
        try {
          const timer = await this.getTimerByUserId(user.uid);
          const inactiveTime = await this.getByUuid(user._id);
          const timerObj = await this.update(inactiveTime._id, { inactiveTime: timer });
          //change 'if' limit if you want to increase-decrease timeout limits (seconds) 900
          if (timerObj.inactiveTime >= 15) {
            notificationsService.InactiveTimeNotification(client);
            await recordActivityService.create({ activityType: activity.inactivity, userId: user.uid });
          }
        } catch (error) {
          //stop timer
          this.stopTimer(interval);
          //throw new Error(`Error executing interval: ${error.message}`);

        }
      }, 5000);//change if you want to modify validation frequency
      //set ttl for the timer (class duration maybe)
      const ttl = 120 * 60 * 1000;
      setTimeout(() => {
        this.stopTimer(interval);
      }, ttl)

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

module.exports = { InactiveTimeService };
