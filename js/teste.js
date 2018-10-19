
let panelBody = document.querySelector('.panel-body');
const jsonfile = require('jsonfile-promised');
const fs = require('fs');
var heroes;

//getJSON('http://gdurl.com/KM4u'); //heroes
getJSON('http://gdurl.com/dAE9', 2); //cards

function getJSON(url, codigo){
  fetch(url).then(function(response) {
    response.text().then(function(text) {
      retorno = JSON.parse(text);

console.log(retorno);

let stringHTML = '<div class="col-lg-12">';

for(let i in retorno.Decks[codigo].Cards){
console.log('i: ',i);
console.log('i%5: ',i%5);
  if(i==0){
    console.log('if1');
    stringHTML += '<div class="row"><div class="col-lg-1"></div>';
  }
  else if (i%5 == 0) {
    console.log('elseif');
    stringHTML += '<div class="col-lg-1"></div></div><div class="row"><div class="col-lg-1"></div>';
  }

  console.log('addLink');
  stringHTML += '<div class="col-lg-2"><img src="'+retorno.Decks[codigo].Cards[i].imgURL+'" height="100%" width="100%"></div>';
}
  console.log('fechaArquivo');
stringHTML += '</div></div>';

console.log(stringHTML);
panelBody.innerHTML = stringHTML;
    });
  });
};
