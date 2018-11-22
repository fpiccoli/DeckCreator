const data = require('../data.js');
const teste = require('./teste.js');
const json2html = require('html2json').json2html;

module.exports = {
  efeitos(){
    let efeitos = data.listEffect();
    let json = [];

    efeitos.forEach(build);
    function build(efeito, index, array){
      let childs = [];

      let nome = teste.text(efeito.nameEN);
      let link = teste.element('a', {dataToggle:'collapse', dataParent:'#efeitos', href:'#efeito'+index, ariaExpanded:'false', class:'collapsed'}, [nome]);
      let title = teste.element('h4', {class: 'panel-title'}, [link]);
      let heading = teste.element('div', {class: 'panel-heading'}, [title]);

      let descricao = teste.text(efeito.descriptionBR);
      let body = teste.element('div', {class: 'panel-body'}, [descricao]);
      let collapse = teste.element('div', {id: 'efeito'+index, class:'panel-collapse collapse', ariaExpanded:'false'}, [body]);

      childs.push(heading);
      childs.push(collapse);
      json.push(teste.element('div', {class: 'panel panel-default'}, childs));
    }
    let html = teste.build(json);

    html = teste.replaceAll(html,"dataToggle", "data-toggle");
    html = teste.replaceAll(html,"dataParent", "data-parent");
    html = teste.replaceAll(html,"ariaExpanded", "aria-expanded");

    return html;
  }
}
