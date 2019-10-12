const { ipcRenderer }  = require('electron');
const property = require('./property.js');

module.exports = function(){
  var mongoose = require('mongoose');

  mongoose.connect(property.dbString(), {useNewUrlParser: true}); //cloud

  mongoose.connection.on('connected', function(){
    ipcRenderer.send('console-log-main', 'Conectado ao MongoDB.');
  });

  mongoose.connection.on('error', function(err){
    ipcRenderer.send('console-log-main', 'Erro na conexao: ' + err);
  });

  mongoose.connection.on('disconnected', function(){
    ipcRenderer.send('console-log-main', 'Desconectado do MongoDB.');
  });
}
