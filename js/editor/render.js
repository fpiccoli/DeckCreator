const { ipcRenderer }  = require('electron');
const data = require('../data-mongo.js');
const htmlMenu = require('../html/menu-cards.js');
const dataManager = require('../data-manager.js');
const htmlCartas = require('../html/cartas.js');
const update = require('./update.js');
const conta = require('../conta.js');

module.exports = {
  panel(heroi, documento){
    documento.querySelector('#panel'+heroi.panel).innerHTML = documento.querySelector('#panel'+heroi.panel).innerHTML.replace('heading-style','color: '+heroi.font+';background-color:'+heroi.bg+';');
    documento.querySelector('#nome-heroi-'+heroi.panel).textContent = heroi.name;
    documento.querySelector('#classe-heroi-'+heroi.panel).textContent = heroi.class + ' ('+heroi.alligment+')';
    documento.querySelector('#txt-heroi-'+heroi.panel).textContent = 'Alterar';
    documento.querySelector('#img-heroi-'+heroi.panel).innerHTML = '<img src="https://drive.google.com/uc?export=download&id='+heroi.icon+'" height="300%" width="300%"/>';
  },
  async sidebar(buttons, user, listaDeCartas, herois, documento){
    let decks = await data.getDecks(user.name, user.game);
    documento.querySelector('#side-menu').innerHTML += htmlMenu.addGrupo(decks);
    documento.querySelector('#side-menu').innerHTML += htmlMenu.addButtons(buttons);

    for(let i in buttons){
      documento.querySelector('#cards-'+dataManager.getNome(buttons[i].class)).addEventListener('click', function () {
        let txt = '#cards-'+dataManager.getNome(buttons[i].class);

        buscaCartas(buttons[i], user).then((retorno) => {
          documento.querySelector('#skill-cards').innerHTML = htmlCartas.cartas(retorno);
          retorno.forEach(function (carta, i, array){
            layout(carta, user, listaDeCartas, herois, documento);
          });
        }).catch(err => console.log(err));

        ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));
      });
    }
    documento.querySelector("#add-grupo").addEventListener('click', function(){
      documento.querySelector('#lista-grupos').innerHTML = htmlMenu.updateGrupo(decks, documento.querySelector("#change-grupo").value);
    });
    documento.querySelector("#update-nome").addEventListener('click', function(){
      let nome = documento.querySelector("#campo-nome").value;
      if(validaNomeVazio(nome, documento)){
        eventUpdateNome(nome, documento);
      }
    });
    documento.querySelector('#campo-nome').addEventListener('keypress', function (e) {
      let nome = documento.querySelector("#campo-nome").value;
      if (e.key === 'Enter') {
        if(validaNomeVazio(nome, documento)){
          eventUpdateNome(nome, documento);
        }
      }
    });
  },
  lista(cartas, user, herois, documento){
    documento.querySelector('#skill-cards').innerHTML = htmlCartas.lista(cartas);

    cartas.forEach(function (carta, index, array){
      documento.querySelector('#card-'+index).addEventListener('click', function () {
        removeObj(cartas, carta);
        module.exports.lista(cartas, user, herois, documento);
        update.otherPanels(cartas, user, documento);
        update.heroPanels(cartas, user, herois, documento);
      });
    });
  },
  special(buttons, user){
    if(!user) return;
    if(user.game == 'M&D'){
      buttons.push({class:'Spell', main:'Spell', sub:'Spell', icon:'12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV', bg:'#B57EDC'})
      buttons.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', icon:'1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW', bg:'#CC8899'})
      buttons.push({class:'Talent', main:'Talent', sub:'Talent', icon:'1WrooGrmv1Uand440zPn9QojbY_SA6WzB', bg:'#c0c0c0'})
    }
    else if(user.game == 'MRBC'){
      buttons.push({class:'Breeder-SPE', main:'Breeder-SPE', sub:'Breeder-SPE', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      buttons.push({class:'Breeder-ENV', main:'Breeder-ENV', sub:'Breeder-ENV', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      buttons.push({class:'Any Monster', main:'Any Monster', sub:'Any Monster', icon:'1cTOPQh_UbGKeWzEkUuCjPjxYSTeqTseJ', bg:'#f7f7f9'})
    }
  }
}

function layout(carta, user, listaDeCartas, herois, documento){
  documento.querySelector('#card-'+carta.cardnumber).addEventListener('click', function () {
    if(conta.obj(listaDeCartas, carta) < 3){
      addObj(listaDeCartas, carta);
    }
    else{
      removeObj(listaDeCartas, carta);
      removeObj(listaDeCartas, carta);
      removeObj(listaDeCartas, carta);
    }
    update.cardPanels(carta, listaDeCartas, documento);
    update.otherPanels(listaDeCartas, user, documento);
    update.heroPanels(listaDeCartas, user, herois, documento);
  });
  documento.querySelector('#card-'+carta.cardnumber).addEventListener('contextmenu', function () {
    if(conta.obj(listaDeCartas, carta) == 0){
      addObj(listaDeCartas, carta);
      addObj(listaDeCartas, carta);
      addObj(listaDeCartas, carta);
    } else{
      removeObj(listaDeCartas, carta);
    }
    update.cardPanels(carta, listaDeCartas, documento);
    update.otherPanels(listaDeCartas, user, documento);
    update.heroPanels(listaDeCartas, user, herois, documento);
  });
  update.cardPanels(carta, listaDeCartas, documento);
  update.otherPanels(listaDeCartas, user, documento);
  update.heroPanels(listaDeCartas, user, herois, documento);
}

async function buscaCartas(classe, user){
  let main = await data.getClassCards(classe.main, user.game);
  let sub = [];
  if(classe.sub == '???'){
    sub = await data.getClassCards(classe.main, user.game);
  } else{
    sub = await data.getClassCards(classe.sub, user.game);
  }
  let mainCards = [];
  let subCards = [];

  main.forEach(function (grupo, index, array){
    if(grupo.cards){
      let filtrado = dataManager.filtraMain(grupo.cards, user.game);
      filtrado.forEach(function (carta, i, array){
        carta.deck = {id: grupo.id, face: grupo.face};
      });
      mainCards = mainCards.concat(filtrado);
    }
  });
  sub.forEach(function (grupo, index, array){
    if(grupo.cards){
      let filtrado = dataManager.filtraSub(grupo.cards, user.game);
      filtrado.forEach(function (carta, i, array){
        carta.deck = {id: grupo.id, face: grupo.face};
      });
      subCards = subCards.concat(filtrado);
    }
  });

  mainCards.sort(dataManager.dynamicSort('cardnumber'));
  subCards.sort(dataManager.dynamicSort('cardnumber'));

  return mainCards.concat(subCards);
}

function eventUpdateNome(nome, documento){
  nomeDoTime = nome;
  nome = '';
  documento.querySelector("#nome-time").textContent = nomeDoTime;
  ipcRenderer.send('set-cookie', 'nome', nomeDoTime);
}

function validaNomeVazio(nome, documento){
  if(nome.length == 0){
    alert.message(documento.querySelector('#alert-message'), 'Você precisa digitar um nome válido!', 'warning')
    return 0;
  }
  return 1;
}

function addObj(lista, carta){
  lista.push(carta);
  lista.sort(dataManager.dynamicSort('cardnumber'));
}

function removeObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].cardnumber == obj.cardnumber){
      lista.splice(i, 1);
      break;
    }
  }
  return lista;
}