const { DashboardEmotions } = require('../database/entities/dashboard-emotions.entity');
const emotion = require('../../utils/enums/emotion.enum');

const previousEmotionUser = {};

class DashboardEmotionsService {
  //construcctor, incitialize ViewActivity with emotions with counts 0
  constructor() {
    if (DashboardEmotions) {
      DashboardEmotions.collection.drop();
      this.emotions = Object.values(emotion);
      this.emotions.forEach(async (emotion) => {
        const newViewActivity = new DashboardEmotions({ _id: emotion, count: 0 });
        await newViewActivity.save();

      });
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
  async updateEmotion(emotion, userId) {
    console.log("dictionary: ", previousEmotionUser);
    //find the registry more actual
    //fin in diccionary if existe userId
    console.log("previous emotion: ", previousEmotionUser[userId])
    if (previousEmotionUser[userId]) {
      const previousEmotion = await DashboardEmotions.findOne({ _id: previousEmotionUser[userId] })
      if (previousEmotion.count != 0) {
        await DashboardEmotions.updateOne(
          { _id: previousEmotionUser[userId] },
          { $inc: { count: -1 } }
        );
      }
      // Actualizar el registro del usuario con la nueva emoción
      await DashboardEmotions.updateOne(
        { _id: emotion },
        { $inc: { count: +1 } },
        //{ upsert: true } // Inserta un nuevo registro si no existe para este usuario
      );
    } else {
      await DashboardEmotions.updateOne(
        { _id: emotion },
        { $inc: { count: +1 } },
        { upsert: true } // Inserta un nuevo registro si no existe para este usuario
      );
    }
    previousEmotionUser[userId] = emotion;
  }
  //create a service for use updateoNE
}

module.exports = { DashboardEmotionsService };
