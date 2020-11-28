const fs = require('fs');
const os = require('os');
const call = require('../cache.js');
const path = require('./path.js');

module.exports = { clear }

function clear(){
  return call.clear(os, fs, path);
}
