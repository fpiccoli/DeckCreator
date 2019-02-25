const builder = require('./builder.js');

module.exports = {
  cartas(lista){
    let colunas = 5;
    let cards = [];

    lista.forEach(addCard);

    function addCard(card, index, array){
      let childs = [];

      // childs.push(builder.element('img', {src:'../img/cards/'+card.class.toLowerCase()+'/'+card.id+'-'+card.name.toLowerCase()+'-min.png', height: '100%', width: '100%'}, []));
      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+card.imgurl, height: '100%', width: '100%'}, []));

      if(card.stamp){
        // childs.push(builder.element('img', {class:'selo-novidade', src:'../img/stamp/'+card.stamp+'.png', height: '25%', width: '30%'}, []));
        childs.push(builder.element('img', {class:'selo-novidade', src:'https://drive.google.com/uc?export=download&id='+card.stamp, height: '25%', width: '30%'}, []));
      }
      childs.push(builder.element('h4', {id:'card-text-'+card.cardnumber, class:'qtde-cards'}, [builder.text('0')]));

      cards.push(builder.element('div', {id:'card-'+card.cardnumber, class: 'col-lg-2'}, childs));
    }

    let rows = [];
    rows.push(builder.element('div', {class: 'row'}, cards));

    return builder.build([{ node: 'element', tag: 'div', attr:{class: 'col-lg-12'}, child: rows}]);
  },
  lista(lista){
    let colunas = 5;
    let cards = [];

    lista.forEach(addCard);

    function addCard(card, index, array){
      let childs = [];

      // childs.push(builder.element('img', {src:'../img/cards/'+card.class.toLowerCase()+'/'+card.id+'-'+card.name.toLowerCase()+'-min.png', height: '100%', width: '100%'}, []));
      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id=+card.imgurl', height: '100%', width: '100%'}, []));

      if(card.stamp){
        // childs.push(builder.element('img', {class:'selo-novidade', src:'../img/stamp/'+card.stamp+'.png', height: '25%', width: '30%'}, []));
        childs.push(builder.element('img', {class:'selo-novidade', src:'https://drive.google.com/uc?export=download&id='+card.stamp, height: '25%', width: '30%'}, []));
      }
      let removeButton = builder.element('i', {class:'fa fa-times fa-fw'}, );
      childs.push(builder.element('h4', {id:'card-text-'+index, class:'remove-cards', title:'Clique para remover'}, [removeButton]));

      cards.push(builder.element('div', {id:'card-'+index, class: 'col-lg-2'}, childs));
    }

    let rows = [];
    rows.push(builder.element('div', {class: 'row'}, cards));

    return builder.build([{ node: 'element', tag: 'div', attr:{class: 'col-lg-12'}, child: rows }]);
  },
  statusbar(percentual){
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
}
