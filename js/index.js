const menu = require('./menubar.js');
const mongo = require('./mongo-data.js');

console.log(mongo.listAll());

menu.sidebar(document);
menu.navbar(document);
