const data = require('./data.js');

module.exports = {
  render(lista){
    let accordion = document.querySelector('#accordion-pure-panel');

    let stringHTML = '<div class="panel-group"><div class="row">';

    for(let i in lista){
      if(i!=0 && i%2 == 0) {
        stringHTML += '</div><div class="row">';
      }

      stringHTML += '<div class="col-lg-6">'
      stringHTML += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">'
      stringHTML += '<a data-toggle="collapse" data-parent="#accordion-pure-panel" href="#pure-'+lista[i]+'">'+lista[i].charAt(0).toUpperCase() + lista[i].slice(1)+'</a></h4></div>'
      stringHTML += '<div id="pure-'+lista[i]+'" class="panel-collapse collapse">'
      stringHTML += '<div class="panel-body">';
      stringHTML += renderClasse(lista[i].charAt(0).toUpperCase() + lista[i].slice(1));
      stringHTML += '</div></div></div></div>';
    }

    stringHTML += '</div></div>';

    accordion.innerHTML = stringHTML;
  }
}

function renderClasse(classe){
  let herois = data.getHerois(classe);

  let stringHTML = '<div class="row"><div class="col-sm-12">';

  for(let i in herois){
    stringHTML += '<div class="col-lg-3"><div class="panel"><div class="panel-heading"><div class="row"><div class="col-lg-12">'
    stringHTML += '<img src="' + herois[i].imgURL + '" height="100%" width="100%"></div></div></div></div>'
    stringHTML += '<a href="#" class="selecionar-heroi-'+(parseInt(i) + 1)+'"><div class="panel-footer"><span class="pull-left">'
    stringHTML += herois[i].Name + '</span><span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div>'
  }

  stringHTML += '</div></div>';
  return stringHTML;
}
