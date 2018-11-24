const data = require('../data.js');
const json2html = require('html2json').json2html;

module.exports = {
  element(tag, attr, child) {
    return { node: 'element', tag: tag, attr: attr, child: child };
  },
  text(texto){
    return { node: 'text', text: texto };
  },
  build(json){
    return json2html({node: 'root', child: json });
  },
  replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
      str = str.replace(de, para);
      pos = str.indexOf(de);
    }
    return (str);
  },
  replaceCamelCase(html){
    html = this.replaceAll(html,"dataToggle", "data-toggle");
    html = this.replaceAll(html,"dataParent", "data-parent");
    html = this.replaceAll(html,"ariaExpanded", "aria-expanded");
    html = this.replaceAll(html,"ariaValuenow", "aria-valuenow");
    html = this.replaceAll(html,"ariaValuemin", "aria-valuemin");
    html = this.replaceAll(html,"ariaValuemax", "aria-valuemax");
    return html;
  },
  loading(){
    return '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';
  }
}
