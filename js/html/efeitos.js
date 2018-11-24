const data = require('../data.js');
const builder = require('./builder.js');
const json2html = require('html2json').json2html;

module.exports = {
  efeitos(){
    let efeitos = data.listEffect();
    let json = [];

    efeitos.forEach(build);
    function build(efeito, index, array){
      let childs = [];

      let nome = builder.text(efeito.nameEN);
      let link = builder.element('a', {dataToggle:'collapse', dataParent:'#efeitos', href:'#efeito'+index, ariaExpanded:'false', class:'collapsed'}, [nome]);
      let title = builder.element('h4', {class: 'panel-title'}, [link]);
      let heading = builder.element('div', {class: 'panel-heading'}, [title]);

      let descricao = builder.text(efeito.descriptionBR);
      let body = builder.element('div', {class: 'panel-body'}, [descricao]);
      let collapse = builder.element('div', {id: 'efeito'+index, class:'panel-collapse collapse', ariaExpanded:'false'}, [body]);

      childs.push(heading);
      childs.push(collapse);
      json.push(builder.element('div', {class: 'panel panel-default'}, childs));
    }
    let html = builder.build(json);

    html = builder.replaceCamelCase(html);

    return html;
  }
}
