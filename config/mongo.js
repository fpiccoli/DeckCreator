const { ipcRenderer }  = require('electron');
const property = require('./property.js');

module.exports = function(variable){
  var mongoose = require('mongoose');

  mongoose.connect(property.dbString(), {useUnifiedTopology: true, useNewUrlParser: true}); //cloud

  mongoose.connection.on('connected', function(){
    ipcRenderer.send('console-log-main', variable+': Conectado ao MongoDB.');
  });

  mongoose.connection.on('error', function(err){
    ipcRenderer.send('console-log-main', variable+': Erro na conexao: ' + err);
  });

  mongoose.connection.on('disconnected', function(){
    ipcRenderer.send('console-log-main', variable+': Desconectado do MongoDB.');
  });
}
