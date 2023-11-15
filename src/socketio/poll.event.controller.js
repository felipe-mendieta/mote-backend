const PollService = require('../services/poll.service');
const { PollResponseService } = require('../services/poll-response.service');
const pollService = new PollService();
const pollResponseService = new PollResponseService();
let { setCurrentPoll, getEventRegistry } = require('./registries/poll.event.registry'); // Encuesta actual

const sendPoll = (io, client) => {
  client.on('sendPoll', async (data) => {
    try {
      const { idPoll, roomCode, } = data;
      const poll = await pollService.getById(idPoll);
      const currentPoll = poll.toObject();// Actualiza la encuesta actual
      setCurrentPoll(currentPoll);
      const eventRegistry = getEventRegistry();
      eventRegistry.push({ type: 'poll', data: currentPoll });
      client.broadcast.to(roomCode).emit('putPolls', currentPoll);
      client.emit('success', "Poll send success.");
    } catch (error) {
      console.error('Error sending poll:', error.message);
      client.emit('error', `Error sending poll. Stack: ' ${error.message}`);
    }
  });
}

const closePoll = (io, client) => {
  client.on('closePoll', async (data) => {
    try {
      const { roomCode, pollId } = data;
      if (pollId && roomCode) {
        const currentPoll = null; // Encuesta actual se cierra, esto evita que el eventRegistry actue, en la condición anterior
        setCurrentPoll(currentPoll);
        client.emit('success', "Poll closed.");
      }
    } catch (error) {
      console.error('Error closing poll:', error.message);
      client.emit('error', `Error closing poll. Stack  ${error.message}`);
    }
  });
}

const savePollResponses = (io, client) => {
  client.on('savePollResponses', async (data) => {
    //use poll-response.service and poll-response.entity
    console.log('savePollResponses', data);
    try {
      const { pollId, responses } = data;

      if (pollId && responses) {
        const newPollResponse = {
          pollId,
          responses
        }
        pollResponseService.create(newPollResponse);

        client.emit('success', "Poll responses saved.");
      }
    } catch (error) {
      console.error('Error closing poll:', error.message);
      client.emit('error', `Error closing poll. Stack  ${error.message}`);
    }


  });
}

module.exports = { sendPoll, closePoll, savePollResponses };
