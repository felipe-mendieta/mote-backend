const Poll = require('./../database/entities/poll.entity');

class PollService {
  async create(data) {
    try {
      const newPoll = new Poll(data);
      return await newPoll.save();
    } catch (error) {
      throw new Error(`Error creating poll: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await Poll.find().populate('questions');
    } catch (error) {
      throw new Error(`Error fetching all polls: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await Poll.findById(id).populate('questions');
    } catch (error) {
      throw new Error(`Error fetching poll by ID: ${error.message}`);
    }
  }

  async update(id, changes) {
    try {
      return await Poll.findByIdAndUpdate(id, changes, { upsert: true, new: true });
    } catch (error) {
      throw new Error(`Error updating poll: ${error.message}`);
    }
  }

  async patch(id, changes) {
    try {
      const updatedPoll = await Poll.findByIdAndUpdate(id, { $set: changes }, { new: true });
      return updatedPoll;
    } catch (error) {
      throw new Error(`Error patching poll: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedPoll = await Poll.findByIdAndRemove(id);
      return deletedPoll;
    } catch (error) {
      throw new Error(`Error deleting poll by ID: ${error.message}`);
    }
  }
}

module.exports = PollService;
