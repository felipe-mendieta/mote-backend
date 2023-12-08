const { DashboardEmotions } = require('../database/entities/dashboard-emotions.entity');
const previousEmotionUser = {};

class DashboardEmotionsService {
  constructor() {
  }
  async create(data) {
    try {
      const newDashboardEmotions = new DashboardEmotions(data);
      return await newDashboardEmotions.save();
    } catch (error) {
      throw new Error(`Error creating ViewActivity: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await DashboardEmotions.find();
    } catch (error) {
      throw new Error(`Error fetching all ViewActivity: ${error.message}`);
    }
  }
  async getById(id) {
    try {
      return await DashboardEmotions.findById(id);
    } catch (error) {
      throw new Error(`Error fetching ViewActivity by ID: ${error.message}`);
    }
  }
  async updateEmotion(emotion, userId, roomId) {
    console.log("dictionary: ", previousEmotionUser);
    //find the registry more actual
    //fin in diccionary if existe userId
    console.log("previous emotion: ", previousEmotionUser[userId])
    if (previousEmotionUser[userId]) {
      const documentEmotions = await DashboardEmotions.findOne({ roomId: roomId });
      //if value of emotion is 0, not update
      if (documentEmotions[previousEmotionUser[userId]] != 0) {
        await DashboardEmotions.updateOne(
          { roomId: roomId },
          { $inc: { [previousEmotionUser[userId]]: -1 } },
          { new: true }
        );
        console.log("update emotion: ", previousEmotionUser[userId]);
      }
      // Actualizar el registro del usuario con la nueva emoción
      await DashboardEmotions.updateOne(
        { roomId: roomId },
        { $inc: { [emotion]: +1 } },
        { new: true }
      );
    } else {
      await DashboardEmotions.updateOne(
        { roomId: roomId },
        { $inc: { [emotion]: +1 } },
        { new: true }
      );
    }
    previousEmotionUser[userId] = emotion;
  }
  //create a service for use updateoNE
}

module.exports = { DashboardEmotionsService };
