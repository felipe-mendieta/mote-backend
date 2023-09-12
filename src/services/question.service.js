const Question = require('./../database/entities/question.entity'); // Importa el modelo de Question

class QuestionService {
  create(data) {
    const newQuestion = new Question(data);
    return newQuestion.save();
  }

  getAll() {
    return Question.find();
  }

  getById(id) {
    return Question.findById(id);
  }

  update(id, changes) {
    return Question.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }
  async patch(id, changes) {

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    );
    return updatedQuestion;

  }

  async deleteById(id) {

    const deletedQuestion = await Question.findByIdAndRemove(id);
    return deletedQuestion;

  }
}
module.exports =  QuestionService ;
