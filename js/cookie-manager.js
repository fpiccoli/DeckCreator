const { ipcRenderer }  = require('electron');
let cookies;

module.exports = {
  login(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let user;
        cookie = filtraCookies(retorno, 'login');
        if(cookie.length == 0){
        } else if(cookie[0]){
          let loginJson = JSON.parse(cookie[0].value);
          user = {name: loginJson.user, game: loginJson.game};
        }
        resolve(user);
      });
    });
  },
  herois(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let herois = [];
        cookie = filtraCookies(retorno, 'heroi');
        for (let i in cookie){
          let json = JSON.parse(cookie[i].value);
          json.panel = cookie[i].name.replace('heroi','');
          herois.push(json);
        }
        resolve(herois);
      });
    });
  },
  grupo(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let grupo = '';
        cookie = filtraCookies(retorno, 'grupo');
        if(cookie[0]){
          grupo = cookie[0].value;
        }
        resolve(grupo);
      });
    });
  },
  cards(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let cards;
        cookie = filtraCookies(retorno, 'cards');
        if(cookie[0]){
          cards = JSON.parse(cookie[0].value);
        }
        resolve(cards);
      });
    });
  },
  nome(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let nome;
        cookie = filtraCookies(retorno, 'nome');
        if(cookie[0]){
          nome = cookie[0].value;
        }
        resolve(nome);
      });
    });
  }
}

function getCookiePromise() {
  return new Promise(resolve => {
    ipcRenderer.send('get-cookies')
    ipcRenderer.on('send-cookies', (event, result) => {
      resolve(result);
    })
  });
}

function filtraCookies(obj, nome){
  return obj.filter(function(cookie){
    return cookie.domain == 'deckcreator.com' && cookie.name.includes(nome)
  });
}
