const { faker } = require('@faker-js/faker/locale/es');

const generateRoomMock = () => ({
  name: faker.animal.type(),
  code: faker.string.nanoid(4), // Random 4-character code
  status: true,
  createdAt: new Date(),
  endedAt: null,
  users: [], // Array of user IDs
  recordActivities: [], // Array of record activity IDs
});

const generateManyRooms = (count) => {
  const rooms = [];
  for (let i = 0; i < count; i++) {
    rooms.push(generateRoomMock());
  }
  return rooms;
};

module.exports = { generateRoomMock, generateManyRooms };
