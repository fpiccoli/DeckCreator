const { ipcRenderer }  = require('electron');

let updateIcon = document.querySelector('#update-icon');
let updateText = document.querySelector('#btn-update');

let buscando = false;
let baixando = false;
let baixado = false;

ipcRenderer.on('download-progress', (event, obj) => {
  console.log('PROGRESS');
  let percentual = round(obj.percent, 1);
  updateText.innerHTML = 'Downloading';
  updateText.innerHTML += ' '+percentual+'%';

  buscando = setBuscando(false);
  baixando = setBaixando(false);
})

ipcRenderer.on('update-downloaded', (event, obj) => {
  console.log('DOWNLOADED');
  updateIcon.innerHTML = '<span class="glyphicon glyphicon-exclamation-sign"></span>';
  updateText.innerHTML = 'Restart and update'
  baixado = true;
  buscando = setBuscando(false);
  baixando = setBaixando(false);
})

ipcRenderer.on('checking-for-update', (event, obj) => {
  console.log('CHECKING');
  buscando = setBuscando(true);
  baixando = setBaixando(false);
})

ipcRenderer.on('update-available', (event, obj) => {
  console.log('AVAILABLE');
  updateIcon.innerHTML = '<span class="glyphicon glyphicon-cloud"></span>';
  updateText.innerHTML = 'Wait until download starts...';
  buscando = setBuscando(false);
  baixando = setBaixando(true);
})

ipcRenderer.on('update-not-available', (event, obj) => {
  console.log('NOT AVAILABLE');
  updateIcon.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
  updateText.innerHTML = 'No updates found';
  buscando = setBuscando(false);
  baixando = setBaixando(false);
})

ipcRenderer.on('update-error', (event, err) => {
  console.log('ERROR');
  updateIcon.innerHTML = '<span class="glyphicon glyphicon-ban-circle"></span>';
  updateText.innerHTML = 'Update error';
  document.querySelector('#modal-error-message').innerHTML = err;
  $('#error-modal').modal('show');
})

document.querySelector('#btn-update').addEventListener('click', function(){
  if(buscando) return;
  if(baixando) return;

  if(baixado) {
    console.log('DO UPDATE');
    ipcRenderer.invoke('do-update');
  } else{
    console.log('BUSCANDO');
    buscando = setBuscando(true);
    ipcRenderer.invoke('update-check');
  }
});

function setBuscando(validador){
  if(validador){
    updateIcon.innerHTML = '<span class="glyphicon glyphicon-search"></span>';
    updateText.innerHTML = 'Searching for updates...';
  }
  return validador;
}

function setBaixando(validador){
  if(validador){
    updateIcon.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span>';
    updateText.innerHTML = 'Starting the download...';
  }
  return validador;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
