const data = require('./data.js');
const panel = require('./panel.js');
let menu = document.querySelector('.selecionar-heroi-1');


menu.addEventListener('click', function () {
    panel.render(data.getCards(), 2);
});

//document.getElementById("MyElement").classList.add('MyClass');
//document.getElementById("MyElement").classList.remove('MyClass');

//document.querySelector('.nav').textContent = '<li><a href="index.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a></li>'

//'<div class="col-xs-3"><img src="http://gdurl.com/vccO" height="250%" width="250%"></div>'
