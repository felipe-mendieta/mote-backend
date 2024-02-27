// Import the DashboardPollResponse entity
const { DashboardPollResponse } = require('../database/entities/dashboard-poll-response.entity');
let updatesAcumulate = {
  cognitive: 0,
  emotional: 0,
  behavioral: 0
};
let lastRoomId = null;
class DashboardPollResponseService {


  async create(data) {
    try {
      const newDashboardPollResponse = new DashboardPollResponse(data);
      return await newDashboardPollResponse.save();
    } catch (error) {
      throw new Error(`Error creating DashboardPollResponse: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await DashboardPollResponse.find();
    } catch (error) {
      throw new Error(`Error fetching all DashboardPollResponses: ${error.message}`);
    }
  }

  async getById(roomId) {
    try {
      return await DashboardPollResponse.findOne({ roomId: roomId });
    } catch (error) {
      throw new Error(`Error fetching DashboardPollResponse by ID: ${error.message}`);
    }
  }

  async updateResponses(roomId, updateValues, totalResponses) {



    try {
      if (roomId !== lastRoomId) {
        // Reset updatesAcumulate if the roomId has changed
        updatesAcumulate = {
          cognitive: 0,
          emotional: 0,
          behavioral: 0
        };
        lastRoomId = roomId; // Update lastRoomId to the current roomId
      }
      // Iterar sobre cada clave en updates y sumar los valores a updatesAcumulate
      Object.keys(updateValues).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(updatesAcumulate, key)) {
          updatesAcumulate[key] += updateValues[key];
        }
      });
      const dividedValues = {
        cognitive: updatesAcumulate.cognitive / totalResponses,
        emotional: updatesAcumulate.emotional / totalResponses,
        behavioral: updatesAcumulate.behavioral / totalResponses,
      };
      console.log(updatesAcumulate);
      // Finalmente, actualizar los valores divididos
      const finalUpdatedResponse = await DashboardPollResponse.findOneAndUpdate(
        { roomId: roomId },
        { $set: dividedValues },
        { new: true }
      );
      roomIdAux = roomId;
      return finalUpdatedResponse;
    } catch (error) {
      throw new Error(`Error updating fields in DashboardPollResponse: ${error.message}`);
    }



  }

}

module.exports = { DashboardPollResponseService };
