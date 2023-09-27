const Question = require('./../database/entities/question.entity');

class QuestionService {
  async create(data) {
    try {
      const newQuestion = new Question(data);
      return await newQuestion.save();
    } catch (error) {
      throw new Error(`Error creating question: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await Question.find();
    } catch (error) {
      throw new Error(`Error fetching all questions: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await Question.findById(id);
    } catch (error) {
      throw new Error(`Error fetching question by ID: ${error.message}`);
    }
  }

  async update(id, changes) {
    try {
      return await Question.findByIdAndUpdate(id, changes, { upsert: true, new: true });
    } catch (error) {
      throw new Error(`Error updating question: ${error.message}`);
    }
  }

  async patch(id, changes) {
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: changes }, { new: true });
      return updatedQuestion;
    } catch (error) {
      throw new Error(`Error patching question: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedQuestion = await Question.findByIdAndRemove(id);
      return deletedQuestion;
    } catch (error) {
      throw new Error(`Error deleting question by ID: ${error.message}`);
    }
  }
}

module.exports = QuestionService;
