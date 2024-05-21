const config = require('../config/config');
const whitelist = [
  `http://mote-frontend`,
  `${config.myDomainApp}`,
  'mote-frontend',
  'mote.ucuenca.edu.ec',
  'http://mote-frontend',
  'https://mote.ucuenca.edu.ec'
];
console.log("Whitelist: ", whitelist);
const options = {
  origin: (origin, callback) => {
    console.log("Origin: ", origin);
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);//error, permiso : no hay ningun error por eso null, por lo tanto permitir
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = options;
