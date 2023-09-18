const Question = require('./../database/entities/question.entity');

class QuestionService {
  async create(data) {
    const newQuestion = new Question(data);
    return await newQuestion.save();
  }

  async getAll() {
    return await Question.find();
  }

  async getById(id) {
    return await Question.findById(id);
  }

  async update(id, changes) {
    return await Question.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async patch(id, changes) {
    const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: changes }, { new: true });
    return updatedQuestion;
  }

  async deleteById(id) {
    const deletedQuestion = await Question.findByIdAndRemove(id);
    return deletedQuestion;
  }
}

module.exports = QuestionService;
