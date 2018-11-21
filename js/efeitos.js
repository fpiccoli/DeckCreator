const html = require('./html-builder.js');

setTimeout(function(){
  document.querySelector('#efeitos').innerHTML = html.efeitos();
}, 3000);
