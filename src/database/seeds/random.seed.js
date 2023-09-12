
const getConnection = require('../connection');
const User = require('../entities/user.entity');
const { generateManyUsers } = require('../mocks/user.mock');
const { generateManyPolls } = require('../mocks/poll.mock')
const Question = require('../entities/question.entity')
const { generateManyQuestions } = require('../mocks/question.mock');
const Poll = require('../entities/poll.entity');
const RecordActivity = require('../entities/record-activity.entity');
const { generateOneActivity, generateManyActivities } = require('../mocks/record-activity.mock');

const randomSeedDB = async () => {
  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();

    const mockUsers = generateManyUsers();
    const users = await User.insertMany(mockUsers);


    const mockQuestions = generateManyQuestions();
    const questions = await Question.insertMany(mockQuestions);
    const questionIds = await questions.map((question) => question._id);
    const mockPolls = generateManyPolls();
    const manyPoll = await mockPolls.map(
      (poll) => {
        const newPoll = {
          ...poll,
          questions: [questionIds[Math.floor(Math.random() * questionIds.length)], questionIds[Math.floor(Math.random() * questionIds.length)]],
        }
        return newPoll;
      }
    );
    await Poll.insertMany(manyPoll);
    Promise.all(mockPolls);

    const mockRecordActivities = generateManyActivities();
    await RecordActivity.insertMany(mockRecordActivities);
    const promises = users.map(async (user) => {
      const userId = user._id;
      const activity = {
        ...generateOneActivity,
        user: userId
      };
      const newActivity = new RecordActivity(activity);
      return await newActivity.save(newActivity);

    });
    Promise.all(promises);//para esperar a que todas las promesas se resuelvan antes de continuar.

  } catch (error) {
    console.error(error);
  }
};


module.exports = randomSeedDB;
