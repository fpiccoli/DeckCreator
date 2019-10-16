const builder = require('./builder.js');
const data = require('../data-manager.js');

module.exports = {
  build(type, colunas, puros, lista){
    let html = builder.build(classe(type, colunas, puros, lista));
    html = builder.replaceCamelCase(html);

    if (html == '<div class="row"></div>'){
      html = botaoRecarregar();
    }
    return html;
  }
}

function classe(type, colunas, classes, lista){
  let json = [];

  for (let i in classes){
    let hibridos = data.getHybrid(classes[i].name, lista);
    let child = [];
    let cor = 'panel panel-danger';

    if (type == 'pure'){
      child = content(classes[i], 'selecionar-'+data.getNome(classes[i].name));
      cor = 'panel panel-default'
    }
    else if (hibridos.length > 0){
      child = hibrido(hibridos, classes[i].name);
      cor = 'panel panel-default'
    }

    let text = builder.text(classes[i].name);
    let link = builder.element('a', {dataToggle: 'collapse', dataParent:'#accordion-'+type+'-panel', class:'collapsed', href:'#'+type+'-'+data.getNome(classes[i].name)}, [text]);
    let title = builder.element('div', {class: 'panel-title'}, [link]);
    let heading = builder.element('div', {class: 'panel-heading'}, [title]);

    let col = builder.element('div', {class: 'col-sm-12'}, child)
    let row = builder.element('div', {class: 'row'}, [col])
    let body = builder.element('div', {class: 'panel-body'}, [row])
    let collapse = builder.element('div', {id: type+'-'+data.getNome(classes[i].name), class: 'panel-collapse collapse',  ariaExpanded:'false'}, [body])

    let panel = builder.element('div', {class: cor}, [heading, collapse]);
    json.push(builder.element('div', {class: 'col-lg-'+(12/colunas)}, [panel]));

  }
  return coluna(json, colunas);
}

function hibrido(hibridos, classe){
  let jsonNav = [];
  let jsonContent = [];

  for (let i in hibridos){
    let ativo = '';
    let ativo2 = 'tab-pane fade';

    if(i == 0){
      ativo = 'active';
      ativo2 = 'tab-pane fade in active';
    }

    let sub = '';
    let sub2 = hibridos[i].sub;
    if(hibridos[i].sub == classe){
      sub = ' pull-right';
      sub2 = hibridos[i].main;
    }

    let text = builder.text(hibridos[i].name + '<br />(' + sub2 +')');
    let link = builder.element('a', {href: '#'+data.getNome(classe)+'-'+data.getNome(hibridos[i].name)+'-nav', dataToggle: 'tab'}, [text]);
    jsonNav.push(builder.element('li', {class: 'text-center '+ativo+sub}, [link]));

    let heroi = content(hibridos[i], 'selecionar-'+data.getNome(classe)+'-'+data.getNome(sub2));
    jsonContent.push(builder.element('div', { class: ativo2, id: data.getNome(classe)+'-'+data.getNome(hibridos[i].name)+'-nav' }, heroi));
  }

  return [builder.element('ul', {class: 'nav nav-pills'}, jsonNav), builder.element('div', {class: 'tab-content'}, jsonContent)]
}

function content(classe, selecionarHeroi){
  let json = [];

  for (let i in classe.heroes)
  {
    let img = builder.element('img', {src: 'https://drive.google.com/uc?export=download&id='+classe.heroes[i].imgurl, height: '100%', width: '100%', class:'card-img'}, []);
    let col = builder.element('div', {class: 'col-lg-12'}, [img]);
    let row = builder.element('div', {class: 'row'}, [col]);
    let heading = builder.element('div', {class: 'panel-heading'}, [row]);
    let panel = builder.element('div', {class: 'panel'}, [heading]);

    let text = builder.text(classe.heroes[i].name + ' ('+classe.alligment+')');
    let spanLeft = builder.element('span', {class: 'pull-left'}, [text]);

    let icon = builder.element('i', {class: "fa fa-arrow-circle-right"});
    let spanRight = builder.element('span', {class: 'pull-right'}, [icon]);

    let clearfix = builder.element('span', {class: 'clearfix'}, []);
    let footer = builder.element('div', {class: 'panel-footer'}, [spanLeft, spanRight, clearfix]);
    let link = builder.element('a', {href: '#', class: selecionarHeroi+'-'+data.getNome(classe.heroes[i].cardnumber)}, [footer]);

    json.push(builder.element('div', {class: 'col-lg-4'}, [panel, link]));
  }
  return json;
}

function coluna(json, colunas){
  let retorno = [];
  let i = 0;
  do {
    let child = [];
    let c = 0;

    do{
      if(json[i]){
        child.push(json[i]);
      }
      i++;c++;
    }
    while (c < colunas)

    retorno.push(builder.element('div', {class: 'row'}, child));
  }
  while (i < json.length);

  return retorno;
}

function botaoRecarregar(){
  let icon = builder.element('i', { class: 'fa fa-refresh' }, []);
  let json = builder.element('button', {type: 'button', class: 'btn btn-primary btn-lg btn-block', id:'recarregar-herois'}, [icon, builder.text(' Carregar heróis')]);

  return builder.build(json);
}
