var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../../src/config/config');
const { endpoints } = require('./../../../src/routes/index');
const UserService = require('./../../../src/services/user.service');
const userService = new UserService();
// Configura la estrategia de autenticación con Google
const GoogleStrategyAuth = new GoogleStrategy(
  {
    clientID: `${config.googleClienteId}`,
    clientSecret: `${config.googleSecretId}`,
    callbackURL: `${config.myDomainApp}:${config.port}${endpoints.baseApi}${endpoints.auth}/google/callback`, // Ajusta la URL de callback según tu configuración
    //http://localhost:3002/api/v1/auth/google/callback
  },
  async function (accessToken, refreshToken, profile, done) {
    // Aquí puedes verificar el perfil de usuario y decidir si permites la autenticación
    // Puedes buscar al usuario en tu base de datos o realizar otras acciones según tus necesidades
    const email = profile.emails ? profile.emails[0].value : ''
    try {
      let user = await userService.getByEmail(email);
      if (!user) {
        const newUser = {
          name: profile.displayName || '', // Si displayName no existe, asigna un string vacío
          email: profile.emails ? profile.emails[0].value : '', // Si no hay emails, asigna un string vacío
          avatar: profile.photos ? profile.photos[0].value : '', // Si no hay fotos, asigna un string vacío
          gender: profile.gender || '', // Si gender no existe, asigna un string vacío
          rol: 'USER_ROLE', // Puedes asignar un rol predeterminado si lo necesitas
          status: true, // Puedes asignar un estado predeterminado si lo necesitas
          google: true, // Indica que este usuario se autenticó con Google
          idGoogle: profile.id
        };
        userService.create(newUser);
        return done(null, newUser); // Devuelve el usuario autenticado
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
);

// Configura la serialización y deserialización de usuarios para la sesión
//Con estos ajustes, al autenticarse, almacenarás solo el ID del usuario en la sesión y,
//al deserializar, buscarás al usuario en la base de datos usando ese ID.
passport.serializeUser((user, cb) => {
  // eslint-disable-next-line no-undef
  process.nextTick(function () {
    cb(null, user.id);
  });
});

passport.deserializeUser(
  async (id, cb) => {
    try {
      const user = await userService.getById(id);
      cb(null, user); // Devuelve el objeto de usuario encontrado
    } catch (error) {
      cb(error, null);
    }
  });


module.exports = GoogleStrategyAuth;
