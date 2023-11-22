const { ViewActivity } = require('./../database/entities/view-activity.entity');

class ViewActivityService {
  async getAll() {
    try {
      return await ViewActivity.find();
    } catch (error) {
      throw new Error(`Error fetching all ViewActivity: ${error.message}`);
    }
  }
  async getById(id) {
    try {
      return await ViewActivity.findById(id);
    } catch (error) {
      throw new Error(`Error fetching ViewActivity by ID: ${error.message}`);
    }
  }
  async findEmotion(emotion) {
    const existingRecord = await ViewActivity.findOne({ _id: emotion });

    if (existingRecord) {
      // Si existe, actualiza el contador con el nuevo valor
      await ViewActivity.updateOne(
        { _id: emotion },
        { $set: { count: existingRecord.count + 1 } }
      );
    }
    else {
      // Si no existe, crea un nuevo registro con contador igual a 1
      await ViewActivity.insertOne({ _id: emotion, count: 1 });
    }
  }
  //create a service for use updateoNE
}

module.exports = { ViewActivityService };
