const fs = require('fs');
const os = require('os');
const jsonfile = require('jsonfile');
const fsExtra = require('fs-extra');
const call = require('../deck.js');
const path = require('./path.js');
const image = require('./image.js');

module.exports = { saveLocal, changeName, removeLocal, clearLocal }

function saveLocal(deck, json, game){ //exportDeck
  return call.saveLocal(deck, json, game, os, jsonfile, image, path);
}

function changeName(nome, antigo, json, game, deck){ //updateDeck
  return call.changeName(nome, antigo, json, game, deck, os, fs, jsonfile, image, path);
}

function removeLocal(deck, game){ //deleteDeck
  return call.removeLocal(deck, game, os, fs, path);
}

function clearLocal(game){ //removeLocal
  return call.clearLocal(game, os, fsExtra, path)
}
