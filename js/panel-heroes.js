const data = require('./data.js');
const html = require('./html-builder.js');

module.exports = {

  renderPuro(){
    let panelPuro = document.querySelector("#accordion-pure-panel");

    let classes = data.listByType('Pure');

    stringHTML = html.build(html.classe(classes, 'pure'));

    stringHTML = replaceAll(stringHTML,"dataToggle", "data-toggle");
    stringHTML = replaceAll(stringHTML,"dataParent", "data-parent");
    stringHTML = replaceAll(stringHTML,"ariaExpanded", "aria-expanded");

    panelPuro.innerHTML = stringHTML;
  },
  renderHibrido(){
    let panelHibrido = document.querySelector("#accordion-hybrid-panel");

    let classes = data.listByType('Pure');

    stringHTML = html.build(html.classeHibrido(classes, 'hybrid'));

    stringHTML = replaceAll(stringHTML,"dataToggle", "data-toggle");
    stringHTML = replaceAll(stringHTML,"dataParent", "data-parent");
    stringHTML = replaceAll(stringHTML,"ariaExpanded", "aria-expanded");

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
