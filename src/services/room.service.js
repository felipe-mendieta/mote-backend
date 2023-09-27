const Room = require('../database/entities/room.entity');
const ShortUniqueId = require('short-unique-id');

class RoomService {
  async create(name) {
    try {
      const code = this.generateUniqueCode(4);
      const newRoom = new Room({ name: name, code, status: true });
      return await newRoom.save();
    } catch (error) {
      throw new Error(`Error creating room: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await Room.find();
    } catch (error) {
      throw new Error(`Error fetching all rooms: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await Room.findById(id);
    } catch (error) {
      throw new Error(`Error fetching room by ID: ${error.message}`);
    }
  }

  async update(id, changes) {
    try {
      return await Room.findByIdAndUpdate(id, changes, { new: true });
    } catch (error) {
      throw new Error(`Error updating room: ${error.message}`);
    }
  }

  async getByUniqueCode(uniqueCode) {
    try {
      return await Room.findOne({ uniqueCode });
    } catch (error) {
      throw new Error(`Error fetching room by unique code: ${error.message}`);
    }
  }

  async addUser(id, userId) {
    try {
      const room = await Room.findById(id);
      if (!room) {
        throw new Error('Room not found');
      }

      const isUserAlreadyAdded = room.users.some((existingUserId) => existingUserId.equals(userId));
      if (isUserAlreadyAdded) {
        throw new Error('User is already added to the room');
      }

      room.users.push(userId);
      return await room.save();
    } catch (error) {
      throw new Error(`Could not add user to room: ${error.message}`);
    }
  }

  async addActivity(id, activityId) {
    try {
      const room = await Room.findById(id);
      if (!room) {
        throw new Error('Room not found');
      }

      room.recordActivities.push(activityId);
      return await room.save();
    } catch (error) {
      throw new Error(`Could not add activity to room: ${error.message}`);
    }
  }

  async exists(roomCode) {
    try {
      const room = await Room.findOne({ code: roomCode });
      return !!room;
    } catch (error) {
      throw new Error(`Error checking if room exists: ${error.message}`);
    }
  }

  async patch(id, changes) {
    try {
      return await Room.findByIdAndUpdate(id, { $set: changes }, { new: true });
    } catch (error) {
      throw new Error(`Error patching room: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Room.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting room: ${error.message}`);
    }
  }

  async getDetails(id) {
    try {
      const room = await Room.findById(id);

      if (!room) {
        throw new Error('Room not found');
      }

      return room;
    } catch (error) {
      throw new Error(`Could not fetch room details: ${error.message}`);
    }
  }

  generateUniqueCode(size) {
    const { randomUUID } = new ShortUniqueId({ length: size });
    return randomUUID;
  }
}

module.exports = RoomService;
