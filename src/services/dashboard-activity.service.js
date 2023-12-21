const { DashboardActivity } = require('../database/entities/dashboard-activity.entity');
const activity = require('./../../utils/enums/activity.enum');


class DashboardActivityService {
  constructor() {
  }
  //create and inititialize a document for each activityType
  async createAll(roomId) {
    try {
      const activities = Object.values(activity);
      for (const activityType of activities) {
        const newDashboardActivity = await new DashboardActivity({ activityType: activityType, roomId: roomId });
        await newDashboardActivity.save();
      }

      //initialize interval for update historial for each activityType in activities
      const tenMinutes = 1 * 60 * 1000;
      const intervalId = setInterval(async () => {
        for (const activityType of activities) {
          await this.updateHistorialDashboardActivity(roomId, activityType);
        }
      }, tenMinutes);
      //call cleanInterval if the time is 2 hours
      const twoHours = 2 * 60 * 60 * 1000;
      setTimeout(() => {
        clearInterval(intervalId);
        console.log('Interval cleared after 2 hours.');
      }, twoHours);
    } catch (error) {
      throw new Error(`Error creating DashboardActivity: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await DashboardActivity.find();
    } catch (error) {
      throw new Error(`Error fetching all DashboardActivity: ${error.message}`);
    }
  }

  async getById(roomId) {
    try {
      return await DashboardActivity.find({ roomId: roomId });
    } catch (error) {
      throw new Error(`Error fetching DashboardActivity by ID: ${error.message}`);
    }
  }

  //updateDataDashboardActivity
  async updateDataDashboardActivity(roomId, activityType) {
    //get document by roomId and activityType

    //findOneAndUpdate to update count
    return await DashboardActivity.findOneAndUpdate(
      { roomId: roomId, activityType: activityType },
      { $inc: { count: +1 } },
      { new: true }
    );
  }
  async updateHistorialDashboardActivity(roomId, activityType) {
    const doc = await DashboardActivity.findOne({ roomId: roomId, activityType: activityType });

    return await DashboardActivity.findOneAndUpdate(
      { roomId: roomId, activityType: activityType },
      {
        $push: { historial: doc.count }, // Push the current count to historial
        $set: {
          updateAt: Date.now(), // Update updateAt
          count: 0 // Reset count
        }
      },
      { new: true }
    );
  }

}

module.exports = { DashboardActivityService };
