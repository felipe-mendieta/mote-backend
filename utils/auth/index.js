const passport = require('passport');

const GoogleStrategy = require('./strategies/google.stategy');
const LocalStrategy = require('./strategies/local.strategy');

passport.use(GoogleStrategy);
passport.use(LocalStrategy);
