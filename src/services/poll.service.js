const Poll = require('./../database/entities/poll.entity'); // Importa el modelo de Poll
class PollService {
  create(data) {
    const newPoll = new Poll(data);
    return newPoll.save();
  }

  getAll() {
    return Poll.find();
  }

  getById(id) {
    return Poll.findById(id);
  }

  update(id, changes) {
    return Poll.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }
  async patch(id, changes) {

    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    );
    return updatedPoll;

  }

  async deleteById(id) {

    const deletedPoll = await Poll.findByIdAndRemove(id);
    return deletedPoll;

  }

}
module.exports =  PollService ;
