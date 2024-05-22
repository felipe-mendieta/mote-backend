const config = require('../config/config');
const whitelist = [
  `${config.myDomainApp}:4200`,
  'http://localhost'
];
console.log("Whitelist: ", whitelist);
const options = {
  origin: (origin, callback) => {
    console.log("Origin: ", origin);
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);//error, permiso : no hay ningun error por eso null, por lo tanto permitir
    } else {
      callback(new Error(`Origin: ${origin}\nWhitelist: ${whitelist}`))
    }
  }
}
module.exports = options;
