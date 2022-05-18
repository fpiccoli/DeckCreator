const builder = require('./builder.js');

module.exports = { cartas, lista, statusbar } 

function cartas(lista, game){
  let colunas = 5;
  let cards = [];

  lista.forEach(addCard);

  function addCard(card, index, array){
    let childs = [];
    let cardClass = card.class.toLowerCase().replace(' ','');

    childs.push(builder.element('img', {src:'../img/'+game+'/cards/'+cardClass+'/'+card.id+'.png', draggable:"false", height: '100%', width: '100%', class:'card-img'}, []));

    if(card.stamp){
      childs.push(builder.element('img', {class:'selo-novidade', src:'../img/stamp-'+card.stamp+'.png', draggable:"false", height: '20%', width: '25%'}, []));
    }
    childs.push(builder.element('h4', {id:'card-text-'+card.cardnumber, class:'qtde-cards'}, [builder.text('0')]));

    let zoom = builder.element('div', {class: 'zoom'}, childs);
    cards.push(builder.element('div', {id:'card-'+card.cardnumber, class: 'col-lg-2'}, [zoom]));
  }

  let rows = [];
  rows.push(builder.element('div', {class: 'row'}, cards));


  return builder.build([{ node: 'element', tag: 'div', attr:{class: 'col-lg-12'}, child: rows}]);
}

function lista(lista, game){
  let cards = [];

  lista.forEach(addCard);

  function addCard(card, index, array){
    let childs = [];

    let imgName = card.class.toLowerCase().replace(' ','')+'/'+card.id+'.png';

    childs.push(builder.element('img', {src:'../img/'+game+'/cards/'+imgName, draggable:"false", height: '100%', width: '100%', class:'card-img'}, []));

    if(card.stamp){
      childs.push(builder.element('img', {class:'selo-novidade', src:'../img/stamp-'+card.stamp+'.png', draggable:"false", height: '20%', width: '25%'}, []));
    }
    let removeButton = builder.element('i', {class:'fa fa-times fa-fw'}, );
    childs.push(builder.element('h4', {id:'card-text-'+index, class:'remove-cards', title:'Clique para remover'}, [removeButton]));

    let zoom = builder.element('div', {class: 'zoom'}, childs);
    cards.push(builder.element('div', {id:'card-'+index, class: 'col-lg-2'}, [zoom]));
  }

  let rows = [];
  rows.push(builder.element('div', {class: 'row'}, cards));


  return builder.build([{ node: 'element', tag: 'div', attr:{class: 'col-lg-12'}, child: rows }]);
}

function statusbar(percentual){
  let color = 'info';
  if (percentual == 100) {
    color = 'success'
  }
  else if (percentual > 100) {
    color = 'danger'
  }
  let json = builder.element('div', {class:'progress-bar progress-bar-'+color, role:'progressbar', ariaValuenow: percentual, ariaValuemin:'0', ariaValuemax:'100', style:'width: '+percentual+'%'}, []);
  let html = builder.build([json]);
  return builder.replaceCamelCase(html);
}
