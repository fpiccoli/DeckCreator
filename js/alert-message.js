const { remote }  = require('electron');
const dialog = remote.dialog;

module.exports = {
  message(campo, message, color){
    campo.innerHTML = '<div class="alert alert-'+color+'">'+message+'</div>';
    setTimeout(function(){
      campo.innerHTML = '';
    }, 10000);
  },
  confirmDialog(title, confirm, cancel, message) {
    var choice = dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        type: 'question',
        cancelId: 2,
        buttons: [confirm, cancel],
        title: title,
        message: message
      });
      return choice === 0;
    }
  }
