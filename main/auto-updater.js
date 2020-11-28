const { autoUpdater } = require('electron-updater');

//handle setupevents as quickly as possible
const setupEvents = require('../installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

module.exports = function(){
  // Module to control application life.
  var path = require('path');

  autoUpdater.on('update-availabe', () => {
    console.log('update available');
  });
  autoUpdater.on('checking-for-update', () => {
    console.log('checking-for-update');
  });
  autoUpdater.on('update-not-available', () => {
    console.log('update-not-available');
  });
  autoUpdater.on('update-downloaded', (e) => {
    downloaded = true;
    console.log(e);
  });
}
