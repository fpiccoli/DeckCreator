const { ipcRenderer }  = require('electron');
const file = require('./file-manager.js');
const alert = require('./alert-message.js');

module.exports = {
  clearCache(documento){
    ipcRenderer.send('get-path', 'documents');
    ipcRenderer.on('return-path', (event, path) => {
      file.clearCache(path);
      alert.message(documento.querySelector("#alert-message"), 'Cache do <b>Tabletop Simulator</b> limpo com sucesso!', 'success');
    });
  }
}
