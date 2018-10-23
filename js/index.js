const { ipcRenderer }  = require('electron');
const data = require('./data.js');
const panel = require('./panel-cards.js');

let h1 = document.querySelector('.selecionar-heroi-1');
let h2 = document.querySelector('.selecionar-heroi-2');
let h3 = document.querySelector('.selecionar-heroi-3');

/*
menu.addEventListener('click', function () {
    panel.render(data.getCartas(), 2);
});
*/


h1.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 1);
});

h2.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 2);
});

h3.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 3);
});



//document.getElementById("MyElement").classList.add('MyClass');
//document.getElementById("MyElement").classList.remove('MyClass');

//document.querySelector('.nav').textContent = '<li><a href="index.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a></li>'

//'<div class="col-xs-3"><img src="http://gdurl.com/vccO" height="250%" width="250%"></div>'
