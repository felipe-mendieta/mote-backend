const { RecordActivity } = require('./../database/entities/record-activity.entity');

class RecordActivityService {
  async create(data) {
    try {
      const newRecordActivity = new RecordActivity(data);
      return await newRecordActivity.save();
    } catch (error) {
      throw new Error(`Error creating record activity: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await RecordActivity.find();
    } catch (error) {
      throw new Error(`Error fetching all record activities: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await RecordActivity.findById(id);
    } catch (error) {
      throw new Error(`Error fetching record activity by ID: ${error.message}`);
    }
  }

  async update(id, changes) {
    try {
      return await RecordActivity.findByIdAndUpdate(id, changes, { upsert: true, new: true });
    } catch (error) {
      throw new Error(`Error updating record activity: ${error.message}`);
    }
  }

  async patch(id, changes) {
    try {
      const updatedRecordActivity = await RecordActivity.findByIdAndUpdate(id, { $set: changes }, { new: true });
      return updatedRecordActivity;
    } catch (error) {
      throw new Error(`Error patching record activity: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedRecordActivity = await RecordActivity.findByIdAndRemove(id);
      return deletedRecordActivity;
    } catch (error) {
      throw new Error(`Error deleting record activity by ID: ${error.message}`);
    }
  }

  //GET acitivities by room id and activityType
  async getByRoomIdAndActivityType(roomId, activityType) {
    try {
      return await RecordActivity.find({ roomId: roomId, activityType: activityType });
    } catch (error) {
      throw new Error(`Error fetching record activity by room ID and activity type: ${error.message}`);
    }
  }
  //get the last user activity
  async getByUserId(userId) {
    try {
      return await RecordActivity.findOne({ userId: userId }).sort({ date: -1 });
    } catch (error) {
      throw new Error(`Error fetching record activity by user ID: ${error.message}`);
    }
  }

}

module.exports = RecordActivityService;
