const { ipcRenderer }  = require('electron');
const call = require('../cookie.js');

module.exports = { login, herois, grupo, public, cards, nome }

function login(){
  return new Promise(resolve => { resolve(call.login(ipcRenderer)) });
}

function herois(){
  return new Promise(resolve => { resolve(call.herois(ipcRenderer)) });
}

function grupo(){
  return new Promise(resolve => { resolve(call.grupo(ipcRenderer)) });
}

function public(){
  return new Promise(resolve => { resolve(call.public(ipcRenderer)) });
}

function cards(){
  return new Promise(resolve => { resolve(call.cards(ipcRenderer)) });
}

function nome(){
  return new Promise(resolve => { resolve(call.nome(ipcRenderer)) });
}
