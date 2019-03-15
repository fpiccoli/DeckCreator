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
        return (classe.main == nomeDaClasse || classe.sub == nomeDaClasse) && classe.subtype == 'Hybrid'
      }
    );
  },
  // getMainCardsByClass(nomeDaClasse, cartas){
  //   return cartas.filter(
  //     function(carta){
  //       return carta.class.includes(nomeDaClasse) && (carta.subtype == 'ATK' || carta.subtype == 'TEC' || carta.subtype == 'SKL' || carta.subtype == 'DOM')
  //     }
  //   );
  // },
  // getSubCardsByClass(nomeDaClasse, cartas){
  //   return cartas.filter(
  //     function(carta){
  //       return carta.class.includes(nomeDaClasse) && (carta.subtype == 'GRD' || carta.subtype == 'EVD')
  //     }
  //   );
  // },
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
  // getCardByName(name, cartas){
  //   return cartas.find(
  //     function(card){
  //       return card.name == name
  //     }
  //   );
  // },
  // getHeroByName(name, herois){
  //   return herois.find(
  //     function(heroi){
  //       return heroi.name == name
  //     }
  //   );
  // }
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
  }
}
