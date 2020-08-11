const json2html = require('html2json').json2html;
const dataManager = require('../manager/string.js');

module.exports = { element, text, build, replaceCamelCase, loading }

function element(tag, attr, child) {
  return { node: 'element', tag: tag, attr: attr, child: child };
}

function text(texto){
  return { node: 'text', text: texto };
}

function build(json){
  return json2html({node: 'root', child: json });
}

function replaceCamelCase(html){
  html = dataManager.replaceAll(html,"dataToggle", "data-toggle");
  html = dataManager.replaceAll(html,"dataTarget", "data-target");
  html = dataManager.replaceAll(html,"dataParent", "data-parent");
  html = dataManager.replaceAll(html,"ariaExpanded", "aria-expanded");
  html = dataManager.replaceAll(html,"ariaValuenow", "aria-valuenow");
  html = dataManager.replaceAll(html,"ariaValuemin", "aria-valuemin");
  html = dataManager.replaceAll(html,"ariaValuemax", "aria-valuemax");
  return html;
}

function loading(){
  return '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">LOADING...</button>';
}
