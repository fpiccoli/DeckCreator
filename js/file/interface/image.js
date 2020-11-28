const mergeImg = require('merge-images');
const fs = require('fs');
const call = require('../image.js');

module.exports = { save }

function save(caminho, game, deck){
  call.save(caminho, game, deck, mergeImg, fs);
}
