const fs = require('fs');
const os = require('os');
const call = require('../path.js');

module.exports = { local, valida }

function local(){
  return call.local(os);
}

function valida(pastas){
  return call.valida(pastas, os, fs);
}
