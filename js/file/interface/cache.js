const fs = require('fs');
const os = require('os');
const call = require('../cache.js');
const path = require('./path.js');

module.exports = {clearCache }

function clearCache(){
  return call.clearCache(os, fs, path);
}
