const config = require('../config/config');
const whitelist = [
  `http://mote-frontend`,
  `${config.myDomainApp}:80`,
  `${config.myDomainApp}:4200`,
  `${config.myDomainApp}`,
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);//error, permiso : no hay ningun error por eso null, por lo tanto permitir
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = options;
