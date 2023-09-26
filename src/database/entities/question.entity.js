const mongoose = require('mongoose');
const typePoll = require('./../../../utils/enums/poll-type.enum');
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [typePoll.likert, typePoll.multipleOption, typePoll.singleOption],
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
