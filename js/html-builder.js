const data = require('./data.js');
const json2html = require('html2json').json2html;
const html2json = require('html2json').html2json;

module.exports = {
    heroi(classe, selecionarHeroi){
      let jsonHerois = [];

      for (let i in classe.heroes)
      {
          let json = {
            node: 'element', tag: 'div', attr: { class: 'col-lg-4' },
                child: [{node: 'element', tag: 'div', attr: { class: 'panel' },
                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                        child: [{node: 'element', tag: 'div', attr: { class: 'row' },
                                                    child: [{node: 'element', tag: 'div', attr: { class: 'col-lg-12' },
                                                                child: [{node: 'element', tag: 'img', attr: { src: 'https://gdurl.com/'+classe.heroes[i].imgurl, height: '100%', width: '100%' }, child: [] }]
                                                            }]
                                                }]
                                    }]
                        },
                        {node: 'element', tag: 'a', attr: { href: '#', class: selecionarHeroi+'-'+classe.heroes[i].number.toLowerCase() },
                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-footer' },
                                        child: [{node: 'element', tag: 'span', attr: { class: 'pull-left' },
                                                    child:[{ node: 'text', text: classe.heroes[i].name }]},
                                                {node: 'element', tag: 'span', attr: { class: 'pull-right' },
                                                    child:[{node: 'element', tag: 'i', attr: { class: "fa fa-arrow-circle-right" }, child: []} ]},
                                                {node: 'element', tag: 'div', attr: { class: 'clearfix' }, child:[] }]
                                  }]
                        }]
          };
          jsonHerois.push(json);
      }

  return jsonHerois;

},
    hibrido(hibridos, classe){
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

          jsonNav.push({
            node: 'element', tag: 'li', attr: { class: 'text-center '+ativo+sub },
                child: [{node: 'element', tag: 'a', attr: { href: '#'+classe.toLowerCase()+'-'+hibridos[i].name.toLowerCase().replace(' ','')+'-nav', dataToggle: 'tab' },
                            child: [{ node: 'text', text: hibridos[i].name + '<br />(' + sub2 +')' }]
                        }]
          });
          jsonContent.push ({
            node: 'element', tag: 'div', attr: { class: ativo2, id: classe.toLowerCase()+'-'+hibridos[i].name.toLowerCase().replace(' ','')+'-nav' },
                child: this.heroi(hibridos[i], 'selecionar-'+classe.toLowerCase()+'-'+sub2.toLowerCase())
          });
      }

      return [{node: 'element', tag: 'ul', attr: { class: 'nav nav-pills' }, child: jsonNav},
              {node: 'element', tag: 'div', attr: { class: 'tab-content' }, child: jsonContent}];
  },
    classe(type, colunas){
      let classes = data.listByType('Pure');
      let json = [];

      for (let i in classes){
        let hibridos = data.getHybrid(classes[i].name);
        let child = [];
        let cor = 'panel panel-danger';


        if (type == 'pure'){
          child = this.heroi(classes[i], 'selecionar-'+classes[i].name.toLowerCase());
          cor = 'panel panel-default'
        }
        else if (hibridos.length > 0){
          child = this.hibrido(hibridos, classes[i].name);
          cor = 'panel panel-default'
        }

        json.push({node: 'element', tag: 'div', attr: { class: 'col-lg-'+(12/colunas) },
                    child: [{node: 'element', tag: 'div', attr: { class: cor },
                                child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-title' },
                                                        child:[{node: 'element', tag: 'a', attr: { dataToggle: 'collapse', dataParent:'#accordion-'+type+'-panel',  ariaExpanded:'false', class:'collapsed', href:'#'+type+'-'+classes[i].name.toLowerCase() },
                                                                    child: [{ node: 'text', text: classes[i].name }]
                                                                }]
                                                    }]
                                        },
                                        {node: 'element', tag: 'div', attr: { id: type+'-'+classes[i].name.toLowerCase(), class: 'panel-collapse collapse',  ariaExpanded:'false' },
                                                    child: [{node: 'element', tag: 'div', attr: { class: 'panel-body' },
                                                                child: [{node: 'element', tag: 'div', attr: { class: 'row' },
                                                                            child: [{node: 'element', tag: 'div', attr: { class: 'col-sm-12' }, child: child }]
                                                                        }]
                                                            }]
                                        }]
                            }]

        });

      }

      return this.coluna(json, colunas);
    },
  build(type, colunas){
    let html = json2html({node:'root', child: this.classe(type, colunas)});

    html = replaceAll(html,"dataToggle", "data-toggle");
    html = replaceAll(html,"dataParent", "data-parent");
    html = replaceAll(html,"ariaExpanded", "aria-expanded");

    if (html == '<div class="row"></div>'){
      html = this.botaoRecarregar();
    }
    return html;
  },
  coluna(json, colunas){
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

    retorno.push({node: 'element', tag: 'div', attr: { class: 'row' },
                child: child
                  });
    }
    while (i < json.length);

    return retorno;
  },
  menuItem(sidemenu, classes){
    let json = [];
    sidemenu.child.push({node: 'element', tag:'li', attr:{ class:'sidebar-search' },
        child:[{ node:'element', tag:'div', attr:{ class:'input-group custom-search-form' },
                    child:[{ node:'element', tag:'input', attr:{type:'text', class:'form-control', placeholder:'Nome do Time' } },
                           { node:'element', tag:'span', attr:{ class:'input-group-btn' },
                                  child: [{node:'element', tag:'button', attr:{ class:'btn btn-default', type:'button' },
                                              child:[{ node:'element', tag:'i', attr:{ class: 'fa fa-edit' } }]
                                          }]
                            }]
               }]
    });
    for (let i in classes){
      classes[i];
      sidemenu.child.push({ node: 'element', tag: 'li',
                  child:[{node: 'element', tag: 'a', 'attr':{ href:'#', class: 'text-center', id:'cards-'+classes[i].toLowerCase() },
                              child:[{ node: 'element', tag: 'img', attr:{ src: '../icons/'+classes[i].toLowerCase()+'.svg', height: '50%', width: '25%' }},
                              {node: 'element', tag: 'div', attr: { class: 'text-center' }, child:[{ node: 'text', text: classes[i]}]} ]
                     }]
        });
      }
      return sidemenu;
  },
  cartas(classe){
    let colunas = 5;
    let lista = data.getCardsByClass(classe);
    let cards = [];

    lista.sort(function (a, b) {
      if (a.number > b.number) {
        return 1;
      }
      if (a.number < b.number) {
        return -1;
      }
      return 0;
    });

    for(let i in lista){
      cards.push({ node: 'element', tag: 'div', attr:{ class: 'col-lg-2 qtde-cards' },
                      child:[{ node: 'element', tag: 'img', attr: { src:'https://gdurl.com/'+lista[i].imgurl, height: '100%', width: '100%' } },
                             { node: 'element', tag: 'h4', attr: { class:'text-center' },
                                  child:[{ node: 'text', text: 'Quantidade: 0'}] } ]
                  });
    }

    let rows = [];
    rows.push({ node: 'element', tag:'div', attr:{ class: 'row' }, child:cards });

    let json = {node: 'root',
                    child:[{ node: 'element', tag: 'div', attr:{ class: 'col-lg-12' }, child: rows }]
    }

return json2html(json);
  },
  returnJSON(html){
    html = replaceAll(html, '\n', '');
    html = replaceAll(html, '> ', '>');
    html = replaceAll(html, ' <', '<');
    return html2json(html);
  },
  returnHTML(json){
    return json2html(json);
  },
  botaoRecarregar(){
    let json = [{node: 'element', tag: 'button', attr: { type: 'button', class: 'btn btn-primary btn-lg btn-block', id:'recarregar-herois' },
                    child: [{node: 'element', tag: 'i', attr: { class: 'fa fa-refresh' }, child: []}, {node: 'text', text: ' Carregar heróis'}]
                }];

    return json2html({node:'root', child: json});
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
