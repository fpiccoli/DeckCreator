const fs = require('fs');
const os = require('os');
const jsonfile = require('jsonfile');
const call = require('../login.js');
const path = require('./path.js');

module.exports = { save, remove, valida }

function save(nome, json){
  return call.save(nome, json, os, fs, jsonfile, path);
}

function remove(){
  return call.remove(os, fs, path);
}

function valida(){
  return call.valida(os, fs, jsonfile, path);
}
