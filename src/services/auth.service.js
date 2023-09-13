const User = require('../database/entities/user.entity');
const bcrypt = require('bcrypt');
const {generateJWT} = require('./../helpers/generate-jwt.helper')
class AuthService {

  async authenticateUser(email, password) {
    console.log({email,password});
    // Busca al usuario por su correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.status) {
      throw new Error('User/password is not correct. Status: False');
    }

    // Compara la contraseña proporcionada con la contraseña almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }
    // Genera un token JWT para el usuario
    const token = await generateJWT(user.id);

    return { user, token };
  }
}

module.exports = AuthService;
