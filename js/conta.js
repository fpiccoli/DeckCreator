module.exports = {
  obj(lista, obj){
    let count = 0;
    for(let i in lista){
      if(lista[i].number == obj.number){
        count++;
      }
    }
    return count;
  },
  mainClass(lista, heroi){
    let count = 0;
    for(let i in lista){
      if(lista[i].class.includes(heroi.main) && (lista[i].type == 'ATK' || lista[i].type == 'TEC' || lista[i].type == 'SKL' || lista[i].type == 'DOM')){
        count++;
      }
    }
    return count;
  },
  subClass(lista, heroi){
    let count = 0;
    for(let i in lista){
      if(lista[i].class.includes(heroi.sub) && (lista[i].type == 'GRD' || lista[i].type == 'EVD')){
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
