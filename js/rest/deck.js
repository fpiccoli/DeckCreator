const { ipcRenderer }  = require('electron');
const http = require('./http.js');

module.exports = { find, exists, public, grupo, recipe, remove, update, save }

function find(user, game){
  return new Promise(resolve => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/list', {user: user.toLowerCase(), recipe: null}).then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}

function exists(deck, game){
  return new Promise(resolve => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/find', {name: deck.name, user: deck.user, recipe: null}).then(obj => {
      let retorno;
      if (obj.status == 500 || obj.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo);
        console.error(retorno.conteudo);
        retorno = {error: true};
      } else if (obj.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game');
        console.error('Erro no game');
        retorno = {error: true};
      } else if (obj.status == 200){
        console.error('Deck ja cadastrado com este nome');
        ipcRenderer.send('console-log-main', 'Deck ja cadastrado com este nome');
        retorno = {error: false, exists:true};
      } else if (obj.status == 204){
        console.error('Deck pode ser cadastrado com este nome');
        ipcRenderer.send('console-log-main', 'Deck pode ser cadastrado com este nome');
        retorno = {error: false, exists:false};
      }
      resolve(retorno);
    });
  });
}

function public(game){
  return new Promise(resolve => {
    http.get(http.stage()+'/deck/'+http.valida(game)+'/public').then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}

function grupo(user, game){
  return new Promise(resolve => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/group', {user: user.toLowerCase()}).then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}

function recipe(game){
  return new Promise(resolve => {
    http.get(http.stage()+'/deck/'+http.valida(game)+'/recipe').then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}

function remove(nome, user, game){
  return new Promise(resolve => {
    http.remove(http.stage()+'/deck/delete/'+http.valida(game), {name: nome, user: user, recipe: null}).then(retorno => {
      let deletado;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck deletado');
        ipcRenderer.send('console-log-main', 'Deck deletado')
        deletado = retorno.conteudo.deleted;
      }
      resolve(deletado);
    });
  });
}

function update(deck, novoNome, nomeAntigo, game){
  deck.name = novoNome;
  deck.nomeAntigo = nomeAntigo;
  return new Promise(resolve => {
    http.put(http.stage()+'/deck/'+http.valida(game)+'/save', deck).then(retorno => {
      let criado = false;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck ja existente foi alterado');
        ipcRenderer.send('console-log-main', 'Deck ja existente foi alterado')
        criado = true;
      } else if (retorno.status == 201){
        console.error('Deck novo criado');
        ipcRenderer.send('console-log-main', 'Deck novo criado')
        criado = true;
      }
      resolve(criado);
    });
  });
}

function save(deck, game){
  return new Promise((resolve, reject) => {
    http.put(http.stage()+'/deck/'+http.valida(game)+'/save', deck).then(retorno => {
      let criado = false;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck ja existente foi alterado');
        ipcRenderer.send('console-log-main', 'Deck ja existente foi alterado')
        criado = true;
      } else if (retorno.status == 201){
        console.error('Deck novo criado');
        ipcRenderer.send('console-log-main', 'Deck novo criado')
        criado = true;
      }
      resolve(criado);
    }).catch(err => { reject(err) });
  });
}
