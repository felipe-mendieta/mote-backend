const RecordActivity = require('./../database/entities/record-activity.entity');

class RecordActivityService {
  async create(data) {
    const newRecordActivity = new RecordActivity(data);
    return await newRecordActivity.save();
  }

  async getAll() {
    return await RecordActivity.find();
  }

  async getById(id) {
    return await RecordActivity.findById(id);
  }

  async update(id, changes) {
    return await RecordActivity.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async patch(id, changes) {
    const updatedRecordActivity = await RecordActivity.findByIdAndUpdate(id, { $set: changes }, { new: true });
    return updatedRecordActivity;
  }

  async deleteById(id) {
    const deletedRecordActivity = await RecordActivity.findByIdAndRemove(id);
    return deletedRecordActivity;
  }
}

module.exports = RecordActivityService;
