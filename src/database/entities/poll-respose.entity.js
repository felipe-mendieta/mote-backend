const mongoose = require('mongoose');

const pollResponseSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
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
