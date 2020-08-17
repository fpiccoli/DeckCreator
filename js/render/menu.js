const { ipcRenderer }  = require('electron');
const htmlMyDecks = require('../html/decks-my.js');
const htmlPublicDecks = require('../html/decks-public.js');
const dataManager = require('../manager/string.js');
const deckBuilder = require('../manager/deck.js');
const alert = require('../manager/interface/alert.js');
const file = require('../file/interface/deck.js');
const dataDeck = require('../rest/deck.js');

module.exports = {
  myDecks(documento, json, user){
    json.forEach(function (deck, index, array) {
      let herois = deck.heroes;
      let cartas = deck.cards;

      let id = deck.user+'-'+dataManager.getNome(deck.name);
      documento.querySelector('#botao-editar-'+id).addEventListener('click' , function(){
        ipcRenderer.send('set-cookie', 'nome', array[index].name);
        if(deck.grupo == 'Sem Grupo'){
          ipcRenderer.send('delete-cookies', ['grupo']);
        } else{
          ipcRenderer.send('set-cookie', 'grupo', deck.grupo);
        }
        if(deck.public){
          ipcRenderer.send('set-cookie', 'public', 'true');
        } else{
          ipcRenderer.send('set-cookie', 'public', 'false');
        }
        ipcRenderer.send('set-cookie', 'cards', JSON.stringify(cartas));
        herois.forEach(setCookie);
        function setCookie(heroi, index, array){
          ipcRenderer.send('set-cookie', 'heroi'+(index+1), JSON.stringify(heroi));
        };
        ipcRenderer.send('redirecionar-pagina','editor');
      });
      documento.querySelector('#botao-excluir-'+id).addEventListener('click' , function(){
        if(alert.confirmDialog('Remove Deck', 'Sure!', 'Nope', 'Are you sure you want to remove the deck "'+ array[index].name +'"?')){
          dataDeck.remove(array[index].name, user.name, user.game)
          .then((retorno) => {
            if(retorno){
              file.removeLocal(array[index], user.game);
              json = removeObj(json, array[index]);
            }
            documento.querySelector('#menu-content').innerHTML = htmlMyDecks.accordion(json, user.game);
          }).catch(err => console.log(err));
        }
        module.exports.myDecks(documento, json, user);
      });
      document.querySelector('#botao-alterar-nome-'+id).addEventListener('click' , function(){
        document.querySelector('#input-novo-nome-'+id).innerHTML = '<div class="input-group custom-search-form"><input id="campo-nome-'+id+'" type="text" class="form-control" placeholder="New Name"><span class="input-group-btn"><button id="update-nome-'+id+'" class="btn btn-default" type="button"><i class="fa fa-tag"></i></button></span></div>';
        document.querySelector('#update-nome-'+id).addEventListener('click' , function(){
          eventUpdateNome(document, deck, id, json, user);
        });
        document.querySelector('#campo-nome-'+id).addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
            eventUpdateNome(document, deck, id, json, user);
          }
        });
      });
    });
  },
  publicDecks(documento, json, user){
    json.forEach(function (deck, index, array) {
      let herois = deck.heroes;
      let cartas = deck.cards;

      let id = deck.user+'-'+dataManager.getNome(deck.name);

      if(deck.user != user.name){
        documento.querySelector('#botao-import-'+id).addEventListener('click' , function(){

          let object = {
            name: deck.user + "'s " + deck.name,
            cards: cartas,
            heroes: herois,
            extra: [],
            user: user.name,
            grupo: 'Imported Decks',
            public: false,
            game: user.game
          }
          if(dataDeck.save(object, user.game)){
            let deckRetorno = deckBuilder.build(object, user.game);

            file.saveLocal(object, deckRetorno, user.game).then(retorno => {
              alert.message(documento.querySelector("#alert-message"), deck.user + "'s <b>" + deck.name + '</b> successfully imported to your decks!', 'success');
            }).catch(err => console.error(err));

          }
        });
      }

    });
  }
}

function eventUpdateNome(documento, deck, index, json, user){
  let novoNome = documento.querySelector('#campo-nome-'+index).value;
  if(novoNome.length == 0){
    alert.message(document.querySelector('#alert-message'), 'You must enter a valid name!', 'warning');
    return;
  }

  let antigo = deck.name;
  if(alert.confirmDialog('Name Change', 'Sure!', 'Nope', 'Do you want to change the name of "'+antigo+'" to "'+novoNome+'"?')){
    dataDeck.update(deck, novoNome, antigo, user.game)
    .then((retorno) => {
      if(retorno){
        let deckBuild = deckBuilder.build(deck, user.game);
        file.changeName(novoNome, antigo, deckBuild, user.game, deck)
        .then(retorno => {
          //Alterou nome com sucesso
        }).catch(err => {console.error(err); alert.message(document.querySelector('#alert-message'), err, 'danger')});
      }
    }).catch(err => console.error(err));
  }
  documento.querySelector('#menu-content').innerHTML = htmlMyDecks.accordion(json, user.game);
  module.exports.myDecks(documento, json, user);
}

function removeObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].name == obj.name){
      lista.splice(i, 1);
      break;
    }
  }
  return lista;
}
