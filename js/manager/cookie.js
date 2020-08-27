module.exports = { login, herois, grupo, public, cards, nome }

function login(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let user;
      let cookies = filtraCookies(retorno, 'login');
      if(cookies[0]){
        let loginJson = JSON.parse(cookies[0].value);
        user = {
          name: loginJson.user,
          game: loginJson.game,
          idToken: loginJson.idToken,
          refreshToken: loginJson.refreshToken
        }
      }
      resolve(user);
    });
  });
}

function herois(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let herois = [];
      let cookies = filtraCookies(retorno, 'heroi');
      for (let i in cookies){
        let json = JSON.parse(cookies[i].value);
        json.panel = cookies[i].name.replace('heroi','');
        herois.push(json);
      }
      resolve(herois);
    });
  });
}

function grupo(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let grupo = '';
      let cookies = filtraCookies(retorno, 'grupo');
      if(cookies[0]){
        grupo = cookies[0].value;
      }
      resolve(grupo);
    });
  });
}

function public(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let public = false;
      let cookies = filtraCookies(retorno, 'public');
      if(cookies[0]){
        public = cookies[0].value;
      }
      resolve(public);
    });
  });
}

function cards(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let cards;
      let cookies = filtraCookies(retorno, 'cards');
      if(cookies[0]){
        cards = JSON.parse(cookies[0].value);
      }
      resolve(cards);
    });
  });
}

function nome(ipcRenderer){
  return new Promise(resolve => {
    getCookiePromise(ipcRenderer).then(retorno => {
      let nome;
      let cookies = filtraCookies(retorno, 'nome');
      if(cookies[0]){
        nome = cookies[0].value;
      }
      resolve(nome);
    });
  });
}

function getCookiePromise(ipcRenderer) {
  return new Promise(resolve => {
    ipcRenderer.send('get-cookies');
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
