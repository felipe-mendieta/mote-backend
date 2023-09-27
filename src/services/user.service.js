const User = require('./../database/entities/user.entity');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');

class UserService {
  async create(data) {
    try {
      const { name, email, avatar, gender, password } = data;
      const saltRounds = await bcryptjs.genSalt();
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        avatar,
        gender,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async createUserGoogle(data) {
    try {
      const newUserGoogle = new User(data);
      return await newUserGoogle.save();
    } catch (error) {
      throw new Error(`Error creating user (Google): ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  async update(id, changes) {
    try {
      return await User.findByIdAndUpdate(id, changes, { upsert: true, new: true });
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async patch(id, changes) {
    try {
      return await User.findByIdAndUpdate(id, { $set: changes }, { new: true });
    } catch (error) {
      throw new Error(`Error patching user: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async getByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }
}

module.exports = UserService;
