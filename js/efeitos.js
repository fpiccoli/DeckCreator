const html = require('./html/efeitos.js');

setTimeout(function(){
  document.querySelector('#efeitos').innerHTML = html.efeitos();
}, 3000);
