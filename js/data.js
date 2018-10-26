const { ipcRenderer } = require('electron')

let classes = [];
let herois = [];
let cartas = [];

fetch('http://gdurl.com/KM4u').then(function(response) {
  response.text().then(function(text) {
    herois = JSON.parse(text).heroes;
    console.log('Carregou Heróis');

    fetch('http://gdurl.com/dAE9').then(function(response) {
      response.text().then(function(text) {
        cartas = JSON.parse(text).cards;
        console.log('Carregou Cartas');

        fetch('http://gdurl.com/PCOKe').then(function(response) {
          response.text().then(function(text) {
            classes = JSON.parse(text).classes;
            for(let h in herois){
              for(let i in classes){
                if(herois[h].class == classes[i].name){
                  classes[i].heroes.push(herois[h]);
                }
              }
            }
            for(let c in cartas){
              for(let i in classes){
                if(cartas[c].class == classes[i].name){
                  classes[i].cards.push(cartas[c]);
                }
              }
            }
          });
          console.log('Montou Classes');
        });

      });
    });

  });
});

module.exports = {
  listAll(){
    return classes;
  },
  listByType(tipo){
    return classes.filter(
      function(classe){
        return classe.type == tipo
      }
    );
  },
  getHybrid(nomeDaClasse){
    return classes.filter(
      function(classe){
        return (classe.main == nomeDaClasse || classe.sub == nomeDaClasse) && classe.type == 'Hybrid'
      }
    );
  }
}
