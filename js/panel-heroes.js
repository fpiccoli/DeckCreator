const data = require('./data.js');
const html = require('./html-builder.js');

module.exports = {

  renderPuro(){
    let panelPuro = document.querySelector("#accordion-pure-panel");

    let classes = data.listByType('Pure');
    let jsonHerois;
    let jsonClasse;
    // let stringHTML = '<div class="panel-group"><div class="row">';
    //
    // for(let i in classes){
    //   if(i%2 == 0 && i != 0){
    //     stringHTML += '</div><div class="row">';
    //   }
    //   jsonHerois = html.heroi(classes[i]);
    //   jsonClasse = html.classe(classes[i], jsonHerois, 'pure');
    //   stringHTML += html.builder(jsonClasse);
    // }
    //
    // stringHTML += '</div></div>';

    console.log(html.classe(classes, 'pure'));

    stringHTML = html.build(html.classe(classes, 'pure'));

    stringHTML = replaceAll(stringHTML,"dataToggle", "data-toggle");
    stringHTML = replaceAll(stringHTML,"dataParent", "data-parent");

    console.log(stringHTML);

    panelPuro.innerHTML = stringHTML;
  },
  renderHibrido(){
    let panelHibrido = document.querySelector("#accordion-hybrid-panel");

    let classes = data.listByType('Hybrid');
    let jsonHerois;
    let jsonClasse;
    let stringHTML = '<div class="panel-group"><div class="row">';

    for(let i in classes){
      if(i%2 == 0 && i != 0){
        stringHTML += '</div><div class="row">';
      }
      jsonHerois = html.heroiHibrido(classes);
      jsonClasse = html.classe(classes[i], jsonHerois, 'hybrid');
      stringHTML += html.builder(jsonClasse);
    }

    stringHTML += '</div></div>';

    stringHTML = replaceAll(stringHTML,"dataToggle", "data-toggle");
    stringHTML = replaceAll(stringHTML,"dataParent", "data-parent");

    console.log(stringHTML);

    panelHibrido.innerHTML = stringHTML;
  }
}

function replaceAll(str, de, para){
  var pos = str.indexOf(de);
  while (pos > -1){
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return (str);
}
