const { ipcRenderer }  = require('electron');

module.exports = function(db){
  var mongoose = require('mongoose');
  // mongoose.connect('mongodb://localhost/teste', {useNewUrlParser: true}); //local
  mongoose.connect('mongodb+srv://readwrite:txcreadwrite@tymbox-8gad9.mongodb.net/'+db+'?ssl=true&authSource=admin', {useNewUrlParser: true}); //cloud

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
