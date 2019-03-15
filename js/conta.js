module.exports = {
  obj(lista, obj){
    let count = 0;
    for(let i in lista){
      if(lista[i].cardnumber == obj.cardnumber){
        count++;
      }
    }
    return count;
  },
  mainClass(lista, heroi){
    let count = 0;
    for(let i in lista){
      if(lista[i].class.includes(heroi.main) && (lista[i].subtype == 'ATK' || lista[i].subtype == 'TEC' || lista[i].subtype == 'SKL' || lista[i].subtype == 'DOM')){
        count++;
      }
    }
    return count;
  },
  subClass(lista, heroi){
    let count = 0;
    for(let i in lista){
      if(lista[i].class.includes(heroi.sub) && (lista[i].subtype == 'GRD' || lista[i].subtype == 'EVD')){
        count++;
      }
    }
    return count;
  },
  class(lista, tipo){
    let count = 0;
    for(let i in lista){
      if(lista[i].class.includes(tipo)){
        count++;
      }
    }
    return count;
  }
}
