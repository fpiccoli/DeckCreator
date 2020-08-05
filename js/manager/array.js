const Moment = require('moment');

module.exports = {
  listByType(tipo, classes){
    return classes.filter(
      function(classe){
        return classe.subtype == tipo
      }
    );
  },
  getHybrid(nomeDaClasse, classes){
    return classes.filter(
      function(classe){
        return (classe.main == nomeDaClasse || classe.sub == nomeDaClasse) && classe.subtype == 'Hybrid';
      }
    );
  },
  getClasseByCard(card, classes){
    return classes.find(
      function(classe){
        return classe.name == card.class
      }
    );
  },
  getClasseByName(name, classes){
    return classes.find(
      function(classe){
        return classe.name.includes(name)
      }
    );
  },
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  },
  dateSort(array, asc) {
    let sortedArray = [];
    if(asc){
      sortedArray = array.sort((a,b) => new Moment(a.data, 'DD/MM/YYYY') - new Moment(b.data, 'DD/MM/YYYY'))
    } else {
      sortedArray  = array.sort((a,b) => new Moment(b.data, 'DD/MM/YYYY') - new Moment(a.data, 'DD/MM/YYYY'))
    }
    return sortedArray;
  },
  filtraMain(lista, game){
    return lista.filter(function(carta){
      if(game == 'M&D'){
        return (carta.subtype == 'ATK' || carta.subtype == 'TEC' || carta.subtype == 'SKL' || carta.subtype == 'DOM')
      } else if(game == 'MRBC'){
        return (carta.subtype == 'POW' || carta.subtype == 'INT' || carta.subtype == 'SPE' || carta.subtype == 'ENV')
      }
    });
  },
  filtraSub(lista, game){
    return lista.filter(function(carta){
      if(game == 'M&D'){
        return (carta.subtype == 'EVD' || carta.subtype == 'GRD')
      } else if(game == 'MRBC'){
        return (carta.subtype == 'DGE' || carta.subtype == 'BLK')
      }
    });
  }
}
