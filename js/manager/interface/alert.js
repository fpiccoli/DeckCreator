const { remote } = require('electron');
const alert = require('../alert.js');

module.exports = { message, confirmDialog }

function message(campo, message, color){
  return alert.message(campo, message, color);
}

function confirmDialog(title, confirm, cancel, message) {
  return alert.confirmDialog(title, confirm, cancel, message, remote)
}
