const { ipcRenderer } = require('electron')

let herois;
let cartas;

fetch('http://gdurl.com/KM4u').then(function(response) {
  response.text().then(function(text) {
    herois = JSON.parse(text);
  });
});

fetch('http://gdurl.com/dAE9').then(function(response) {
  response.text().then(function(text) {
    cards = JSON.parse(text);
  });
});


module.exports = {
  getHerois(classe){
    if(!herois){return;}
    return herois.Heroes.filter(
      function(heroi){ return heroi.Class == classe }
    );
  },
  listaHerois(){
    return herois;
  },
  getCartas(classe){
    return cartas;
  },
  listaCartas(){
    return cartas;
  }
}
