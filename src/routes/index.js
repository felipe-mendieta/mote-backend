const express = require('express');

const usersRouter = require('./users.router');
const pollsRouter = require('./poll.router'); // Importa el router para "poll"
const recordActivitiesRouter = require('./record-activity.router'); // Importa el router para "recordActivities"
const questionsRouter = require('./question.router'); // Importa el router para "question"
const authRouter = require('./auth.router');
const authGoogleRouter = require('./auth-google.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/polls', pollsRouter); // Agrega la ruta para "poll"
  router.use('/recordActivities', recordActivitiesRouter); // Agrega la ruta para "recordActivities"
  router.use('/questions', questionsRouter); // Agrega la ruta para "question"
  router.use('/auth', authRouter);
  router.use('/auth', authGoogleRouter);
}

module.exports = routerApi;
