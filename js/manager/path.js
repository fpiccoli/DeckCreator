const { ipcRenderer } = require('electron');
const isDev = ipcRenderer.sendSync('is-dev');

module.exports = { getPath, getPathLogin, getPathZip }

function getPath() {
    if (isDev) return '../img/';
    else return '../../img/';
}

function getPathLogin() {
    if (isDev) return './img/';
    else return './resources/img/';
}

function getPathZip() {
    if (isDev) return '../../../img/';
    else return '../../../../img/';
}