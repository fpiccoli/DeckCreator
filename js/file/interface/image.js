const mergeImg = require('merge-images');
const fs = require('fs');
const call = require('../image.js');
const path = require('../../manager/path.js').getPath();

module.exports = { save }

function save(caminho, game, deck){
  call.save(caminho, game, deck, mergeImg, fs, path);
}
