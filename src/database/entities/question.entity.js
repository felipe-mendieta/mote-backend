const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Likert', 'Multiple Option', 'Single Option'],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      option: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
