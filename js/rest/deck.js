const { ipcRenderer }  = require('electron');
const http = require('./http.js');

module.exports = {
  find(user, game){
    return new Promise(resolve => {
      http.post('/deck/'+http.valida(game)+'/list', {user: user.toLowerCase(), recipe: null}).then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  exists(deck, game){
    return new Promise(resolve => {
      http.post('/deck/'+http.valida(game)+'/find', {name: deck.name, user: deck.user, recipe: null}).then(obj => {
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
      })
    });
  },
  public(game){
    return new Promise(resolve => {
      http.get('/deck/'+http.valida(game)+'/public').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  recipe(game){
    return new Promise(resolve => {
      http.get('/deck/'+http.valida(game)+'/recipe').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  delete(nome, user, game){
    return new Promise(resolve => {
      http.delete('/deck/delete/'+http.valida(game), {name: nome, user: user, recipe: null}).then(retorno => {
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
  },
  update(deck, novoNome, nomeAntigo, game){
    deck.name = novoNome;
    deck.nomeAntigo = nomeAntigo;
    return new Promise(resolve => {
      http.put('/deck/'+http.valida(game)+'/save', deck).then(retorno => {
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
  },
  save(deck, game){
    return new Promise(resolve => {
      http.put('/deck/'+http.valida(game)+'/save', deck).then(retorno => {
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
}
