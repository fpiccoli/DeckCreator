module.exports = { setCookie, getCookie, deleteCookie }

function setCookie(label, stringValue, mainSession){
  return new Promise((resolve, reject) => {
    mainSession.cookies.set({url:'https://deckcreator.com', name: label, value: stringValue})
    .then(() => resolve(true))
    .catch((err) => reject(err))
  });
}

function deleteCookie(lista, mainSession){
  lista.forEach(function (cookie, index, array){
    mainSession.cookies.remove('https://deckcreator.com', cookie, (error) => {
      console.log('cookie '+cookie+' removido');
    });
  });
}

function getCookie(mainSession){
  return new Promise((resolve, reject) => {
    mainSession.cookies.get({})
    .then((cookies) => resolve(cookies))
    .catch((err) => reject(err))
  });
}
