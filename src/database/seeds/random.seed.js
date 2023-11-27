/* eslint-disable no-unused-vars */

const getConnection = require('../connection');
const User = require('../entities/user.entity');
const { generateManyUsers } = require('../mocks/user.mock');
const { generateManyPolls } = require('../mocks/poll.mock')
const Question = require('../entities/question.entity')
const { generateManyQuestions } = require('../mocks/question.mock');
const Poll = require('../entities/poll.entity');
const {RecordActivity} = require('../entities/record-activity.entity');
const { generateManyActivities } = require('../mocks/record-activity.mock');
const { generateManyRooms } = require('../mocks/room.mock');
const Room = require('../entities/room.entity');

const randomSeedDB = async () => {
  const getUserIDs = async () => {
    const users = await User.find({}, '_id'); // Obtener solo los IDs de los usuarios
    return users.map(user => user._id);
  };
  const getRecordActivityIDs = async () => {
    const activities = await RecordActivity.find({}, '_id'); // Obtener solo los IDs de las record activities
    return activities.map(activity => activity._id);
  };
  const getRoomIDs = async () => {
    const rooms = await Room.find({}, '_id'); // Obtener solo los IDs de las record activities
    return rooms.map(room => room._id);
  };
  const getRandomItemsFromArray = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Mezcla el array de manera aleatoria
    return shuffled.slice(0, count); // Obtiene los primeros 'count' elementos
  };

  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();

    const mockUsers = generateManyUsers();
    await User.insertMany(mockUsers);


    const mockQuestions = generateManyQuestions();
    const questions = await Question.insertMany(mockQuestions);
    const questionIds = questions.map((question) => question._id);
    const mockPolls = generateManyPolls();
    const manyPoll = mockPolls.map(
      (poll) => {
        const newPoll = {
          ...poll,
          questions: [questionIds[Math.floor(Math.random() * questionIds.length)], questionIds[Math.floor(Math.random() * questionIds.length)]],
        }
        return newPoll;
      }
    );
    await Poll.insertMany(manyPoll);

    const mockActivities = generateManyActivities();
    const mockRooms = generateManyRooms(3);
    const rooms = await Room.insertMany(mockRooms);

    const insertActivitiesPromises = rooms.map(async (room) => {
      const newActivities = mockActivities.map((activity) => {
        return {
          ...activity,
          roomId: room._id
        };
      });
      return RecordActivity.insertMany(newActivities);
    });

    await Promise.all(insertActivitiesPromises);

  } catch (error) {
    console.error(error);
  }
};
module.exports = randomSeedDB;
