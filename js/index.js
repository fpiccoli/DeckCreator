const menu = require('./menubar.js');

// TESTE MONGO -----------------------------------
require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Classe = require('../models/classe.js');

var model = mongoose.model('Classe');

model.find({ 'name' : 'Alchemist'}).lean().then(function(classes){
  // console.log(JSON.parse(JSON.stringify(classes[0])));
  console.log(JSON.stringify(classes));
},function(error){
  console.log(error);
})
// TESTE MONGO -----------------------------------



menu.sidebar(document);
menu.navbar(document);
