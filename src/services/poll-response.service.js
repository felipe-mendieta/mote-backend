const PollResponse = require('../database/entities/poll-response.entity');

class PollResponseService {
  // Método para guardar una respuesta del usuario
  async create(pollId, questionId, option) {
    try {
      const response = new PollResponse({
        pollId,
        questionId,
        option,
      });

      const savedResponse = await response.save();
      return savedResponse;
    } catch (error) {
      throw new Error(`Error saving the answer: ${error.message}`);
    }
  }

  // Método para consultar respuestas para una pregunta específica
  async getResponsesForQuestion(questionId) {
    try {
      const responses = await PollResponse.find({ questionId }).exec();
      return responses;
    } catch (error) {
      throw new Error(`Error when querying answers: ${error.message}`);
    }
  }

  // Por ejemplo, podrías tener un método para obtener todas las respuestas para una encuesta específica
  async getResponsesForPoll(pollId) {
    try {
      const responses = await PollResponse.find({ pollId }).exec();
      return responses;
    } catch (error) {
      throw new Error(`Error querying survey responses: ${error.message}`);
    }
  }
}

module.exports = PollResponseService;
