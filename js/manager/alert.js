module.exports = { message, confirmDialog }

function message(campo, message, color){
  campo.innerHTML = '<div class="alert alert-'+color+'">'+message+'</div>';
  setTimeout(function(){
    campo.innerHTML = '';
  }, 10000);
}

function confirmDialog(title, confirm, cancel, message, ipcRenderer) {
  return new Promise((resolve, reject) => {
    ipcRenderer.invoke('dialog', title, confirm, cancel, message)
    .then(retorno => { resolve(retorno) })
    .catch(err => reject(err))
  });
}
