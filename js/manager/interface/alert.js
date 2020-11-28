const { ipcRenderer }  = require('electron');
const call = require('../alert.js');

module.exports = { message, confirmDialog }

function message(campo, message, color){
  return call.message(campo, message, color);
}

function confirmDialog(title, confirm, cancel, message) {
  return call.confirmDialog(title, confirm, cancel, message, ipcRenderer)
}
