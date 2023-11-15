const {PollResponse} = require('./../database/entities/poll-respose.entity');

class PollResponseService {
  async create(pollResponseData) {
    const pollResponse = new PollResponse(pollResponseData);
    return await pollResponse.save();
  }

  async getById(id) {
    return await PollResponse.findById(id);
  }

  async getResponsesForPoll(pollId) {
    try {
      return await PollResponse.find({ pollId: pollId });
    } catch (error) {
      throw new Error(`Error in obtaining survey responses for survey with ID ${pollId}: ${error.message}`);
    }
  }

  async update(id, pollResponseData) {
    const pollResponse = await PollResponse.findById(id);
    if (!pollResponse) {
      throw new Error('Poll response not found');
    }
    Object.assign(pollResponse, pollResponseData);
    return await pollResponse.save();
  }

  async delete(id) {
    const pollResponse = await PollResponse.findById(id);
    if (!pollResponse) {
      throw new Error('Poll response not found');
    }
    return await pollResponse.remove();
  }
}

module.exports =  {PollResponseService};
