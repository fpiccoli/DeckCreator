const data = require('./data.js');

module.exports = {
  render(classe){
    let item = document.querySelector('#'+classe.id+'-item');
    if(item.classList.contains('in')){
      return;
    }

    let herois = data.getHerois(classe.innerHTML);
    let stringHTML = '<div class="panel-body"><div class="col-sm-12"><div class="row">';

    for(let i in herois){
      stringHTML += '<div class="col-sm-4"><img src="' + herois[i].imgURL + '" height="25%" width="25%"></div>';
    }

    stringHTML += '</div></div></div>';
    item.innerHTML = stringHTML;
  }
}
