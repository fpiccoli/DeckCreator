const html = require('./html/efeitos.js');

require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Efeito = require('../models/efeito.js');

var model = mongoose.model('Efeito');

model.find().lean().then(function(retorno){
  document.querySelector('#efeitos').innerHTML = html.efeitos(retorno);
},function(error){
  console.log(error);
})
