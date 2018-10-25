const data = require('./data.js');
const html = require('./html-builder.js');
var builder = require('html2json').json2html;

module.exports = {
  renderPuroOld(lista){
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

    console.log(stringHTML);
    accordion.innerHTML = stringHTML;
  },
  renderPuro(lista){

    let jsonHerois = html.heroi('Amazon');

    console.log(jsonHerois)
    console.log(builder({node:'root', child:jsonHerois}))

    let jsonClasse = html.classe('Amazon', jsonHerois, 'pure');

    console.log(jsonClasse);

    let retornoHTML = builder({node:'root', child:jsonClasse});

    console.log(retornoHTML);
  },



  //  CLASSE HIBRIDA
  //               <ul class="nav nav-pills">
  //                   <li class="active"><a href="#home-pills" data-toggle="tab">Home</a>
  //                   </li>
  //                   <li><a href="#profile-pills" data-toggle="tab">Profile</a>
  //                   </li>
  //                   <li><a href="#messages-pills" data-toggle="tab">Messages</a>
  //                   </li>
  //                   <li><a href="#settings-pills" data-toggle="tab">Settings</a>
  //                   </li>
  //               </ul>
  //
  //               <!-- Tab panes -->
  //               <div class="tab-content">
  //                   <div class="tab-pane fade in active" id="home-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="profile-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="messages-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="settings-pills">
  //                       //HEROIS
  //                   </div>
  //               </div>





  renderHibrido(lista){
    let accordion = document.querySelector('#accordion-hybrid-panel');

    let stringHTML = '<div class="panel-group"><div class="row">';

    let stringTab = renderTab(lista);

    for(let i in lista){
      if(i!=0 && i%2 == 0) {
        stringHTML += '</div><div class="row">';
      }

      let classe = lista[i].charAt(0).toUpperCase() + lista[i].slice(1);
      let retorno = renderClasse(classe);

      stringHTML += '<div class="col-lg-6">'

      if(retorno){ stringHTML += '<div class="panel panel-default"><div class="panel-heading">'; }
      else{ stringHTML += '<div class="panel panel-danger"><div class="panel-heading">'; }

      stringHTML += '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-hybrid-panel" href="#hybrid-'+lista[i]+'">'+classe+'</a></h4></div>'
      stringHTML += '<div id="hybrid-'+lista[i]+'" class="panel-collapse collapse"><div class="panel-body"><ul class="nav nav-pills">'

      stringHTML += stringTab;

      if(i == 0){ stringHTML += '<div class="tab-pane fade in active" id="'+lista[i]+'">'; }
      else if(i%3 == 0){ stringHTML += '<div class="tab-pane fade" id="'+lista[i]+'">'; }

      stringHTML = retorno;

      stringHTML += '</div>';

      stringHTML += '</div></div></div></div>';
    }

    stringHTML += '</div></div>';

    accordion.innerHTML = stringHTML;
  }
}


function renderClasse(classe){
  let herois = data.getHerois(classe);

  if(herois.length === 0){
    return;
  }

  let stringHTML = '<div class="row"><div class="col-sm-12">';

  for(let i in herois){
    stringHTML += '<div class="col-lg-4"><div class="panel"><div class="panel-heading"><div class="row"><div class="col-lg-12">'
    stringHTML += '<img src="' + herois[i].imgURL + '" height="100%" width="100%"></div></div></div></div>'
    stringHTML += '<a href="#" class="selecionar-heroi-'+(parseInt(i) + 1)+'"><div class="panel-footer"><span class="pull-left">'
    stringHTML += herois[i].Name + '</span><span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div>'
  }

  stringHTML += '</div></div>';
  return stringHTML;
}

function renderTab(lista){
  let retorno = '<ul class="nav nav-pills">';

  for(let i in lista){

    let classe = lista[i].charAt(0).toUpperCase() + lista[i].slice(1);

    if(i == 0){ retorno += '<li class="active"><a href="#'+lista[i]+'" data-toggle="tab">'+classe+'</a></li>'; }
    else if(i%3 == 0){ retorno += '<li><a href="#'+lista[i]+'" data-toggle="tab">'+classe+'</a></li>'; }

    retorno += '<li><a href="#classe2" data-toggle="tab">Classe2</a></li>';

  }

  retorno += '</ul><div class="tab-content">';

  return retorno;
}
