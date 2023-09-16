

var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../../src/config/config');
const User = require('./../../../src/database/entities/user.entity');
// Configura la estrategia de autenticación con Google
const GoogleStrategyAuth = new GoogleStrategy(
  {
    clientID: `${config.googleClienteId}`,
    clientSecret: `${config.googleSecretId}`,
    callbackURL: `http://localhost:3002/api/v1/auth/google/callback`, // Ajusta la URL de callback según tu configuración
  },
  async function (accessToken, refreshToken, profile, cb) {
    // Aquí puedes verificar el perfil de usuario y decidir si permites la autenticación
    // Puedes buscar al usuario en tu base de datos o realizar otras acciones según tus necesidades
    const email = profile.emails ? profile.emails[0].value : ''
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        const newUser = await User.create({
          name: profile.displayName || '', // Si displayName no existe, asigna un string vacío
          email: profile.emails ? profile.emails[0].value : '', // Si no hay emails, asigna un string vacío
          avatar: profile.photos ? profile.photos[0].value : '', // Si no hay fotos, asigna un string vacío
          gender: profile.gender || '', // Si gender no existe, asigna un string vacío
          rol: 'USER_ROLE', // Puedes asignar un rol predeterminado si lo necesitas
          status: true, // Puedes asignar un estado predeterminado si lo necesitas
          google: true, // Indica que este usuario se autenticó con Google
        });
        console.log({ newUser });
        return cb(null, newUser); // Devuelve el usuario autenticado
        // }
      }else{
        return cb(null, user);
      }
    } catch (error) {
      return cb(error);
    }
  }
);








// Configura la serialización y deserialización de usuarios para la sesión
passport.serializeUser((user, cb) => {
  // eslint-disable-next-line no-undef
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser((user, cb) => {
  // Busca al usuario en tu base de datos según el ID
  // Luego, devuelve el objeto de usuario encontrado
  // Puedes personalizar esto según tu modelo de usuario
  // eslint-disable-next-line no-undef
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = GoogleStrategyAuth;
