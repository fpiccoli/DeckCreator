const { ipcRenderer }  = require('electron');
let cookies;

module.exports = {
  login(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let user;
        cookies = filtraCookies(retorno, 'login');
        if(cookies.length == 0){
        } else if(cookies[0]){
          let loginJson = JSON.parse(cookies[0].value);
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
        cookies = filtraCookies(retorno, 'heroi');
        for (let i in cookies){
          let json = JSON.parse(cookies[i].value);
          json.panel = cookies[i].name.replace('heroi','');
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
        cookies = filtraCookies(retorno, 'grupo');
        if(cookies[0]){
          grupo = cookies[0].value;
        }
        resolve(grupo);
      });
    });
  },
  public(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let public = false;
        cookies = filtraCookies(retorno, 'public');
        if(cookies[0]){
          public = cookies[0].value;
        }
        resolve(public);
      });
    });
  },
  cards(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let cards;
        cookies = filtraCookies(retorno, 'cards');
        if(cookies[0]){
          cards = JSON.parse(cookies[0].value);
        }
        resolve(cards);
      });
    });
  },
  nome(){
    return new Promise(resolve => {
      getCookiePromise().then(retorno => {
        let nome;
        cookies = filtraCookies(retorno, 'nome');
        if(cookies[0]){
          nome = cookies[0].value;
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
