const fs = require('fs');
const os = require('os');
const jsonfile = require('jsonfile');
const fsExtra = require('fs-extra');
const mergeImg = require('merge-images');
const call = require('../deck.js');
const path = require('./path.js');

module.exports = { saveLocal, changeName, removeLocal, clearLocal }

function saveLocal(deck, json, game){ //exportDeck
  return call.saveLocal(deck, json, game, mergeImg, os, fs, jsonfile, path);
}

function changeName(nome, antigo, json, game, deck){ //updateDeck
  return call.changeName(nome, antigo, json, game, deck, mergeImg, os, fs, jsonfile, path);
}

function removeLocal(deck, game){ //deleteDeck
  return call.removeLocal(deck, game, os, fs, path);
}

function clearLocal(game){ //removeLocal
  return call.clearLocal(game, os, fs, fsExtra, path)
}
