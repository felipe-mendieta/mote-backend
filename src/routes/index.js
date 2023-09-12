const express = require('express');

const usersRouter = require('./users.router');
const pollsRouter = require('./poll.router'); // Importa el router para "poll"
//const recordActivitiesRouter = require('./recordActivities.router'); // Importa el router para "recordActivities"
const questionsRouter = require('./question.router'); // Importa el router para "question"


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/polls', pollsRouter); // Agrega la ruta para "poll"
  //router.use('/recordActivities', recordActivitiesRouter); // Agrega la ruta para "recordActivities"
  router.use('/questions', questionsRouter); // Agrega la ruta para "question"

}

module.exports = routerApi;
