
let currentPoll = null; // Encuesta actual
const eventRegistry = []; // Registro de eventos

const getCurrentPoll =  () => {
  return currentPoll;
}
const getEventRegistry =  () => {
  return eventRegistry;
}
const setCurrentPoll =  (poll) => {
  currentPoll=poll;
}

module.exports = { getCurrentPoll,setCurrentPoll,getEventRegistry }
