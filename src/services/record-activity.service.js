const RecordActivity = require('./../database/entities/record-activity.entity');

class RecordActivityService {
  create(data) {
    const newRecordActivity = new RecordActivity(data);
    return newRecordActivity.save();
  }

  getAll() {
    return RecordActivity.find();
  }

  getById(id) {
    return RecordActivity.findById(id);
  }

  update(id, changes) {
    return RecordActivity.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async patch(id, changes) {
    const updatedRecordActivity = await RecordActivity.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    );
    return updatedRecordActivity;
  }

  async deleteById(id) {
    const deletedRecordActivity = await RecordActivity.findByIdAndRemove(id);
    return deletedRecordActivity;
  }
}

module.exports = RecordActivityService;
