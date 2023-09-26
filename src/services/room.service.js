const Room = require('../database/entities/room.entity');

class RoomService {
  async create(name) {
    const code = this.generateUniqueCode(4);
    const newRoom = new Room({ name: name, code, status: true });
    return await newRoom.save();
  }

  async getAll() {
    try {
      return await Room.find();
    } catch (error) {
      throw new Error('Could not fetch rooms');
    }
  }

  async getById(id) {
    try {
      return await Room.findById(id);
    } catch (error) {
      throw new Error('Could not fetch room');
    }
  }

  async update(id, changes) {
    try {
      return await Room.findByIdAndUpdate(id, changes, { new: true });
    } catch (error) {
      throw new Error('Could not update room');
    }
  }

  async getByUniqueCode(uniqueCode) {
    try {
      return await Room.findOne({ uniqueCode });
    } catch (error) {
      throw new Error('Could not fetch room by unique code');
    }
  }

  async addUser(roomCode, userId) {
    try {
      const room = await Room.findOne({ code: roomCode });
      if (!room) {
        throw new Error('Room not found');
      }

      // Verificar si el usuario ya está en la lista de usuarios
      const isUserAlreadyAdded = room.users.some((existingUserId) => existingUserId.equals(userId));
      if (isUserAlreadyAdded) {
        throw new Error('User is already added to the room');
      }

      // Agregar el usuario a la lista de usuarios
      room.users.push(userId);
      return await room.save();
    } catch (error) {
      throw new Error('Could not add user to room');
    }
  }

  async addActivity(roomId, activityId) {
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        throw new Error('Room not found');
      }

      // Agregar la actividad a la lista de actividades
      room.recordActivities.push(activityId);
      return await room.save();
    } catch (error) {
      throw new Error('Could not add activity to room');
    }
  }
  async exists(roomCode) {
    try {
      const room = await Room.findOne({ code: roomCode });
      return !!room;
    } catch (error) {
      throw new Error('Error checking if room exists');
    }
  }
  async patch(id, changes) {
    return await Room.findByIdAndUpdate(id, { $set: changes }, { new: true });
  }

  async delete(id) {
    return await Room.findByIdAndDelete(id);
  }

  async getDetails(roomCode) {
    try {
      const room = await Room.findOne({ code: roomCode });

      if (!room) {
        throw new Error('Room not found');
      }

      return room;
    } catch (error) {
      throw new Error('Could not fetch room details');
    }
  }
  generateUniqueCode() {
    // Lógica para generar un código único (aquí se usa shortid)
    return Math.round(Math.random() * 10);//generate code with 4 digits;
  }



}


module.exports = RoomService;
