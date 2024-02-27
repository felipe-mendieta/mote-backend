const PollService = require('../services/poll.service');
const { PollResponseService } = require('../services/poll-response.service');
const pollService = new PollService();
const pollResponseService = new PollResponseService();
let { setCurrentPoll, getEventRegistry } = require('./registries/poll.event.registry'); // Encuesta actual

const { DashboardPollResponseService } = require('../services/dashboard-poll-response.service');
const dashboardPollResponseService = new DashboardPollResponseService();
let totalResponses=0;

const dicValuesLikert={
  1: 5,
  2:4,
  3:3,
  4:1,
  5:1
};

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
      client.broadcast.to(roomCode).emit('success', "Poll send success.");
    } catch (error) {
      console.error('Error sending poll:', error.message);
      client.emit('error', `Error sending poll. Stack: ' ${error.message}`);
    }
  });
}

const closePoll = (io, client) => {
  client.on('closePoll', async (data) => {
    try {
      const { roomCode } = data;
      setCurrentPoll(null);// Encuesta actual se cierra, esto evita que el eventRegistry actue, en la condición anterior
      client.broadcast.to(roomCode).emit('closePoll', "Poll closed.");
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
      const {roomId, pollId, responses } = data;

      if (pollId && responses) {
        const newPollResponse = {
          roomId,
          pollId,
          responses
        }
        pollResponseService.create(newPollResponse);
        totalResponses=totalResponses+1;
        //update dashboards
        const updates = {
          cognitive: dicValuesLikert[responses[0].option[0]],
          emotional: dicValuesLikert[responses[1].option[0]],
          behavioral: dicValuesLikert[responses[2].option[0]]
        };
        console.log(updates);

        const responsePolls=await dashboardPollResponseService.updateResponses(roomId,updates,totalResponses);
        client.emit('success', "Poll responses saved.");
        io.emit('dashboardPollsEngagement', responsePolls.toObject());
        console.log(responsePolls.toObject());
      }
    } catch (error) {
      console.error('Error closing poll:', error.message);
      client.emit('error', `Error closing poll. Stack  ${error.message}`);
    }


  });
}

module.exports = { sendPoll, closePoll, savePollResponses };
