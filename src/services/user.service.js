const User = require('./../database/entities/user.entity');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');

class UserService {
  async create(data) {
    const { name, email, avatar, gender, password } = data;

    // Encripta la contraseña utilizando bcrypt
    const saltRounds = await bcryptjs.genSalt(10); // Define el número de rondas de sal para el hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      name,
      email,
      avatar,
      gender,
      password: hashedPassword, // Almacena la contraseña encriptada en la base de datos
    });

    return await newUser.save();
  }

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    return await User.findById(id);
  }

  async update(id, changes) {
    return await User.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async patch(id, changes) {
    // Actualiza parcialmente un usuario por ID
    return await User.findByIdAndUpdate(id, { $set: changes }, { new: true });
  }

  async deleteById(id) {
    // Elimina un usuario por ID
    return await User.findByIdAndDelete(id);
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = UserService;
