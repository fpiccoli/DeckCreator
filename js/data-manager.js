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
  replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
      str = str.replace(de, para);
      pos = str.indexOf(de);
    }
    return (str.replace(/[^a-zA-Z0-9]/g,'_'));
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
  }
}
