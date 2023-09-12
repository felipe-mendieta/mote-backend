
const getConnection = require('../connection');
const User = require('../entities/user.entity');
const { generateManyUsers } = require('../mocks/user.mock');
const { generateManyPolls } = require('../mocks/poll.mock')
const Question = require('../entities/question.entity')
const { generateManyQuestions } = require('../mocks/question.mock');
const Poll = require('../entities/poll.entity');
const RecordActivity = require('../entities/record-activity.entity');
const { generateManyActivities } = require('../mocks/record-activity.mock');

const randomSeedDB = async () => {
  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();

    const mockUsers = generateManyUsers();
    const users = await User.insertMany(mockUsers);


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

    const usersIds = users.map((user) => user._id);
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

  } catch (error) {
    console.error(error);
  }
};


module.exports = randomSeedDB;
