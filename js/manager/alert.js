module.exports = { message, confirmDialog }

function message(campo, message, color){
  campo.innerHTML = '<div class="alert alert-'+color+'">'+message+'</div>';
  setTimeout(function(){
    campo.innerHTML = '';
  }, 10000);
}

function confirmDialog(title, confirm, cancel, message, remote) {
  var choice =  remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type: 'question',
      cancelId: 2,
      buttons: [confirm, cancel],
      title: title,
      message: message
    }
  );
  return choice === 0;
}
