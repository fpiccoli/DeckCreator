const json2html = require('html2json').json2html;
const dataManager = require('../manager/array.js');

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
  replaceCamelCase(html){
    html = dataManager.replaceAll(html,"dataToggle", "data-toggle");
    html = dataManager.replaceAll(html,"dataTarget", "data-target");
    html = dataManager.replaceAll(html,"dataParent", "data-parent");
    html = dataManager.replaceAll(html,"ariaExpanded", "aria-expanded");
    html = dataManager.replaceAll(html,"ariaValuenow", "aria-valuenow");
    html = dataManager.replaceAll(html,"ariaValuemin", "aria-valuemin");
    html = dataManager.replaceAll(html,"ariaValuemax", "aria-valuemax");
    return html;
  },
  loading(){
    return '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">LOADING...</button>';
  }
}
