const express = require('express');

const usersRouter = require('./users.router');
const pollsRouter = require('./poll.router'); // Importa el router para "poll"
const recordActivitiesRouter = require('./record-activity.router'); // Importa el router para "recordActivities"
const questionsRouter = require('./question.router'); // Importa el router para "question"
const authRouter = require('./auth.router');

const roomRouter = require('./room.router');
const dashboardEmotionsRouter = require('./dashboard-emotions.router');
const dashboardActivityRouter = require('./dashboard-activity.router');


const endpoints = {
  baseApi: '/api/v1',
  users: '/users',
  polls: '/polls',
  recordActivities: '/recordActivities',
  questions: '/questions',
  auth: '/auth',
  room: '/room',
  dashoardEmotions: '/dashboard-emotions',
  dashboardActivity: '/dashboard-activities',

}
function routerApi(app) {
  const router = express.Router();
  app.use(endpoints.baseApi, router);
  router.use(endpoints.users, usersRouter);
  router.use(endpoints.polls, pollsRouter); // Agrega la ruta para "poll"
  router.use(endpoints.recordActivities, recordActivitiesRouter); // Agrega la ruta para "recordActivities"
  router.use(endpoints.questions, questionsRouter); // Agrega la ruta para "question"
  router.use(endpoints.auth, authRouter);
  router.use(endpoints.room, roomRouter);
  router.use(endpoints.dashoardEmotions, dashboardEmotionsRouter);
  router.use(endpoints.dashboardActivity, dashboardActivityRouter);
}

module.exports = { routerApi, endpoints };
