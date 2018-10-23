const { ipcRenderer } = require('electron');
const data = require('./data.js');

let linkFechar = document.querySelector("#link-fechar");
let amazon = document.querySelector("#pure-amazon");


//document.getElementById("MyElement").classList.add('MyClass');
//document.getElementById("MyElement").classList.remove('MyClass');


window.onload = function(){
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-herois');
})

amazon.addEventListener('click', function () {
    let item = document.querySelector('#'+amazon.id+'-item');
    if(item.classList.contains('in')){
      item.innerHTML = '<div class="panel-body"></div>'
      return;
    }
    let herois = data.getHerois(amazon.innerHTML);
    console.log(herois);
    let stringHTML = '<div class="panel-body"><div class="col-sm-12"><div class="row">';

    for(let i in herois){

      console.log(herois[i]);

      stringHTML += '<div class="col-sm-4"><img src="' + herois[i].imgURL + '" height="25%" width="25%"></div>';
    }

    stringHTML += '</div></div></div>';

    item.innerHTML = stringHTML;
    console.log(item.innerHTML);

    //console.log(data.listaHerois());
})
