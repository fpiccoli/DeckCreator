const builder = require('./builder.js');

module.exports = {
  items(buttons){
    let json = [];

    json.push(search());

    buttons.forEach(montaJson);
    function montaJson(button, index, array){
      let childs = [];
      let elements = [];

      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+button.bg, height:'50%', width:'25%'}, []));
      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+button.icon, height:'50%', width:'25%', class:'center-icon-menu'}, []));

      childs.push(builder.element('div', {class: 'text-center'}, [builder.text(button.class)]));
      elements.push(builder.element('a', {href:'#', class: 'text-center', id:'cards-'+button.class.toLowerCase().toLowerCase().replace(' ','')}, childs));

      json.push(builder.element('li', null, elements));
    }
    return builder.build(json);
  }
}

function search(){
  let icon = builder.element('i', { class: 'fa fa-edit' }, []);
  let btn = builder.element('button', { id:'update-nome', class:'btn btn-default', type:'button' }, [icon]);
  let input = builder.element('input', { id:'campo-nome', type:'text', class:'form-control', placeholder:'Nome do Deck' }, []);
  let span = builder.element('span', { class:'input-group-btn' }, [btn]);
  let inputGroup = builder.element('div', {class: 'input-group custom-search-form'}, [input, span]);

  return builder.element('li', {class: 'sidebar-search'}, [inputGroup]);
}
