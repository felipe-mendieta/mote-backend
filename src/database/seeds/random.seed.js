
const getConnection = require('../connection');
const User = require('../entities/user.entity');
const { generateManyUsers } = require('../mocks/user.mock');
const { generateManyPolls } = require('../mocks/poll.mock')
const Question = require('../entities/question.entity')
const { generateManyQuestions } = require('../mocks/question.mock');
const Poll = require('../entities/poll.entity');
const RecordActivity = require('../entities/record-activity.entity');
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


    generateManyActivities();

    const usersIds = getUserIDs();
    const mockActivities = generateManyActivities();
    const manyActivitiesWithId = mockActivities.map(
      (activity) => {
        const userId = usersIds[Math.floor(Math.random() * usersIds.length)];
        const newActivity = {//tener en cuenta que la variable user se mapeara al json entonces se debe llamar igual que en el schema
          ...activity,
          userId
        }
        return newActivity;
      });

    await RecordActivity.insertMany(manyActivitiesWithId);
    await Promise.all(manyActivitiesWithId);//para esperar a que todas las promesas se resuelvan antes de continuar.


    //generate rooms
    const userIDs = await getUserIDs(); // Obtener IDs reales de usuarios
    const recordActivityIDs = await getRecordActivityIDs(); // Obtener IDs reales de record activities

    const mockRooms = generateManyRooms(3);
    const roomsWithActivitiesAndUsers = mockRooms.map((room) => {
      const roomUsers = getRandomItemsFromArray(userIDs, 5); // Obtener 5 IDs de usuarios aleatorios
      const roomActivities = getRandomItemsFromArray(recordActivityIDs, 3); // Obtener 3 IDs de actividades aleatorios

      return {
        ...room,
        users: roomUsers,
        recordActivities: roomActivities,
      };
    });

    // Inserta las salas con los usuarios y actividades generados
    await Room.insertMany(roomsWithActivitiesAndUsers);
  } catch (error) {
    console.error(error);
  }

};


module.exports = randomSeedDB;
