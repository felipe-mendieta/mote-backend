const mongoose = require('mongoose');

const pollResponseSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  },
  responses:[{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    option: {
      //number
      type: [Number],
      required: true,

    },
  }
  ],

});
const PollResponse = mongoose.model('PollResponse', pollResponseSchema);

module.exports = {PollResponse};
