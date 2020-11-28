module.exports = { obj, mainClass, subClass, classe }

function obj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].cardnumber == obj.cardnumber){
      count++;
    }
  }
  return count;
}

function mainClass(lista, heroi, game){
  let count = 0;
  for(let i in lista){
    if(game == 'M&D'){
      if(lista[i].class.includes(heroi.main) && (lista[i].subtype == 'ATK' || lista[i].subtype == 'TEC' || lista[i].subtype == 'SKL' || lista[i].subtype == 'DOM')){
        count++;
      }
    } else if(game == 'MRBC'){
      if(lista[i].class.includes(heroi.main) && (lista[i].subtype == 'POW' || lista[i].subtype == 'INT' || lista[i].subtype == 'SPE' || lista[i].subtype == 'ENV')){
        count++;
      }
    }
  }
  return count;
}

function subClass(lista, heroi, game){
  let count = 0;
  for(let i in lista){
    if(game == 'M&D'){
      if(lista[i].class.includes(heroi.sub) && (lista[i].subtype == 'EVD' || lista[i].subtype == 'GRD')){
        count++;
      }
    } else if(game == 'MRBC'){
      if(lista[i].class.includes(heroi.sub) && (lista[i].subtype == 'DGE' || lista[i].subtype == 'BLK')){
        count++;
      }
    }
  }
  return count;
}

function classe(lista, tipo){
  let count = 0;
  for(let i in lista){
    if(lista[i].class.includes(tipo)){
      count++;
    }
  }
  return count;
}
