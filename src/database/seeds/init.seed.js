/* eslint-disable no-console */
const getConnection = require('../connection');
const User = require('../entities/user.entity');
const Poll = require('../entities/poll.entity');
const Question = require('../entities/question.entity');
const RecordActivity = require('../entities/record-activity.entity');
const Room = require('../entities/room.entity');
const activityEnum = require('./../../../utils/enums/activity.enum');
const pollTypeEnum = require('./../../../utils/enums/poll-type.enum');

const initSeedDB = async () => {
  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();

    // Create users
    await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        avatar: 'https://example.com/avatar1.jpg',
        gender: 'Male',
        rol: 'USER_ROLE'
      },
      // Add more users as needed
    ]);

    // Create questions
    const questions = await Question.insertMany([
      {
        type: pollTypeEnum.likert,
        question: 'How satisfied are you with our service?',
        answers: [
          { option: 1, text: 'Not Satisfied', correct: false },
          { option: 2, text: 'Somewhat Satisfied', correct: false },
          { option: 3, text: 'Satisfied', correct: false },
          { option: 4, text: 'Very Satisfied', correct: false }
        ]
      },
      {
        type: pollTypeEnum.multipleOption,
        question: 'Which programming languages do you use?',
        answers: [
          { option: 1, text: 'JavaScript', correct: false },
          { option: 2, text: 'Python', correct: false },
          { option: 3, text: 'Java', correct: false },
          { option: 4, text: 'C++', correct: true }
        ]
      },
      {
        type: pollTypeEnum.singleOption,
        question: 'Do you prefer working from home or from the office?',
        answers: [
          { option: 1, text: 'Home', correct: false },
          { option: 2, text: 'Office', correct: true }
        ]
      },
      // Add more questions of different types as needed
    ]);

    // Create polls using the questions
    await Poll.insertMany([
      {
        pollTitle: 'Customer Satisfaction Poll',
        questions: questions.map(q => q._id)
      },
      // Add more polls as needed
    ]);

    // Create rooms
    const rooms = await Room.insertMany([
      {
        name: 'Meeting Room A',
        code: 'MRA123',
        status: true,
        endedAt: null
      },
      // Add more rooms as needed
    ]);
    // Create record activities
    await RecordActivity.insertMany([
      {
        activityType: activityEnum.sleep,
        roomId: rooms[0]._id
      },
      {
        activityType: activityEnum.iDontGetIt,
        roomId: rooms[0]._id
      },
      // Add more record activities as needed
    ]);


    console.log('Database seeded successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = initSeedDB;
