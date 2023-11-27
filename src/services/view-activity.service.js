const { ViewActivity } = require('./../database/entities/view-activity.entity');
const { RecordActivity } = require('./../database/entities/record-activity.entity');
const emotion = require('./../../utils/enums/emotion.enum');
class ViewActivityService {
  //construcctor, incitialize ViewActivity with emotions with counts 0
  constructor() {
    ViewActivity.collection.drop();

    this.emotions = Object.values(emotion);
    this.emotions.forEach(async (emotion) => {
      const newViewActivity = new ViewActivity({ _id: emotion, count: 0 });
      await newViewActivity.save();

    });
  }

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
  async findEmotion(emotion, userId) {
    //find the registry more actual
    const previousEmotion = await RecordActivity.findOne({ userId: userId, activityType: 'emotion' }).sort({ createdAt: -1 });

    console.log("previousEmotion: ", previousEmotion);
    if (previousEmotion != emotion) {
      if (previousEmotion) {
        // Restar el conteo de la emoción anterior
        //if count in ViewActivity with _id: emotion is different to 0
        let emotionFrecuency = await ViewActivity.findOne({ _id: previousEmotion.text })
        if (emotionFrecuency.count != 0) {
          await ViewActivity.updateOne(
            { _id: previousEmotion.text },
            { $inc: { count: -1 } }
          );
        }
        // Actualizar el registro del usuario con la nueva emoción

        await ViewActivity.updateOne(
          { _id: emotion },
          { $inc: { count: +1 } },
          //{ upsert: true } // Inserta un nuevo registro si no existe para este usuario
        );
      } else {
        await ViewActivity.updateOne(
          { _id: emotion },
          { $inc: { count: +1 } });

      }
    }
  }
  //create a service for use updateoNE
}

module.exports = { ViewActivityService };
