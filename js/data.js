const { ipcRenderer } = require('electron')

let herois;
let cards;

fetch('http://gdurl.com/KM4u').then(function(response) {
    response.text().then(function(text) {
        herois = JSON.parse(text);
    });
});

fetch('http://gdurl.com/dAE9').then(function(response) {
    response.text().then(function(text) {
        cards = JSON.parse(text);
    });
});


module.exports = {
  getCards(){
    return cards;
  },
  getCards(){
    return cards;
  }
}
