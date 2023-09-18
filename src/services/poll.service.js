const Poll = require('./../database/entities/poll.entity');

class PollService {
  async create(data) {
    const newPoll = new Poll(data);
    return await newPoll.save();
  }

  async getAll() {
    return await Poll.find().populate('questions');
  }

  async getById(id) {
    return await Poll.findById(id).populate('questions');
  }

  async update(id, changes) {
    return await Poll.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async patch(id, changes) {
    const updatedPoll = await Poll.findByIdAndUpdate(id, { $set: changes }, { new: true });
    return updatedPoll;
  }

  async deleteById(id) {
    const deletedPoll = await Poll.findByIdAndRemove(id);
    return deletedPoll;
  }
}

module.exports = PollService;
