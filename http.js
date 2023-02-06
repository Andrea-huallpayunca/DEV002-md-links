const http = require('http')
const https= require('https')

let url = 'https://nodejs.org/api/fs.html'

const status = statusCode => (statusCode !== 200 ? 'fail' : 'ok');
const getProtocol = protocol => (protocol === 'https' ? https : http);

const getObjStatus = (statusCode, elem) => ({
  ...elem,
  status: statusCode,
  message: status(statusCode),
});