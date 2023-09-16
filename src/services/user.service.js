const User = require('./../database/entities/user.entity');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
class UserService {
  async create(data) {
    const { name, email, avatar, gender, password } = data;

    // Encripta la contraseña utilizando bcrypt
    const saltRounds = bcryptjs.genSaltSync();// Define el número de rondas de sal para el hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      name,
      email,
      avatar,
      gender,
      password: hashedPassword, // Almacena la contraseña encriptada en la base de datos
    });

    return newUser.save();
  }

  getAll() {
    return User.find();
  }

  getById(id) {
    return User.findById(id);
  }

  update(id, changes) {
    return User.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }

  async findByEmail(email){
    const response=await User.findOne({ email });
    return response;
  }
}

module.exports = UserService;
