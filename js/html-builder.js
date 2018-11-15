const data = require('./data.js');
const conta = require('./conta.js');
const load = require('./loadJSON.js');
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
  menuItem(sidemenu, buttons){

    let json = [];
    sidemenu.child.push({node: 'element', tag:'li', attr:{ class:'sidebar-search' },
        child:[{ node:'element', tag:'div', attr:{ class:'input-group custom-search-form' },
                    child:[{ node:'element', tag:'input', attr:{ id:'campo-nome', type:'text', class:'form-control', placeholder:'Nome do Deck' } },
                           { node:'element', tag:'span', attr:{ class:'input-group-btn' },
                                  child: [{node:'element', tag:'button', attr:{ id:'update-nome', class:'btn btn-default', type:'button' },
                                              child:[{ node:'element', tag:'i', attr:{ class: 'fa fa-edit' } }]
                                          }]
                            }]
               }]
    });
    for (let i in buttons){
      let child = [];

      if (buttons[i].type == 'Hybrid'){
        child.push({ node: 'element', tag: 'img', attr:{ src: '../icons-full/'+buttons[i].main.toLowerCase()+'.svg', height: '50%', width: '25%' }});
        child.push({ node: 'element', tag: 'img', attr:{ src: '../icons-full/'+buttons[i].sub.toLowerCase()+'.svg', height: '50%', width: '25%' }});
      }else{
        child.push({ node: 'element', tag: 'img', attr:{ src: '../icons-full/'+buttons[i].class.toLowerCase()+'.svg', height: '50%', width: '25%' }});
      }
      child.push({node: 'element', tag: 'div', attr: { class: 'text-center' }, child:[{ node: 'text', text: buttons[i].class}]});

      sidemenu.child.push({ node: 'element', tag: 'li',
                  child:[{node: 'element', tag: 'a', 'attr':{ href:'#', class: 'text-center', id:'cards-'+buttons[i].class.toLowerCase().toLowerCase().replace(' ','') },
                              child: child }]
        });
      }
      return sidemenu;
  },
  cartas(lista){
    let colunas = 5;
    let cards = [];

    // main.sort(dynamicSort('number'));
    // sub.sort(dynamicSort('number'));

    lista.forEach(addCard);
    // sub.forEach(addCard);

    function addCard(card, index, array){
      cards.push({ node: 'element', tag: 'div', attr:{ id:'card-'+card.number, class: 'col-lg-2' },
                      child:[{ node: 'element', tag: 'img', attr: { src:'https://gdurl.com/'+card.imgurl, height: '100%', width: '100%' } },
                             { node: 'element', tag: 'h4', attr: { id:'card-text-'+card.number, class:'qtde-cards' },
                                  child:[{ node: 'text', text: '0'}] } ]
                  });
    }

    let rows = [];
    rows.push({ node: 'element', tag:'div', attr:{ class: 'row' }, child:cards });

    let json = {node: 'root',
                    child:[{ node: 'element', tag: 'div', attr:{ class: 'col-lg-12' }, child: rows }]
    }

    return json2html(json);
  },
  menuDecks(decks){
    let json = [];
    let panels = [];

    decks.forEach(build);

    function build(deck, index, array) {
    let herois = [];
    let cartas = [];

    let rowTitle = { node: 'element', tag:'div', attr:{ class: 'row' },
                        child: [{ node: 'element', tag: 'div', attr:{ class:'col-lg-12' },
                                      child: [{ node: 'element', tag: 'div', attr:{ class:'huge text-center' }, child: [{ node: 'text', text: deck.Nickname }]
                                                }]
                                }]
    };

    let retornoLoad = load.montaObj(deck);
    if (retornoLoad){
      herois = retornoLoad.herois;
      cartas = retornoLoad.cartas;
    }

    herois.push({class:'Spell', main:'Spell' });
    herois.push({class:'Enchantment', main:'Enchantment' });
    herois.push({class:'Talent', main:'Talent' });

    let elements = [];

    herois.forEach(function (heroi, index, array){
      let main = heroi.main.toLowerCase();
      let atk = conta.mainClass(cartas, heroi);
      let def = conta.subClass(cartas, heroi);

      elements.push({node: 'element', tag: 'div', attr:{ class:'col-xs-2 text-center' },
                          child:[{ node: 'element', tag: 'img', attr:{ src:'../icons-full/'+main+'.svg', height:'40%', width:'40%' }, child: [] },
                                 { node: 'element', tag: 'div', child: [{ node: 'text', text: heroi.class }] },
                                 { node: 'element', tag: 'div', child: [{ node: 'text', text: atk+'/'+def+' ('+(atk+def)+')' }] }]
                     });

      childDeck = { node: 'element', tag: 'div', attr:{ class:'col-xs-9 text-right' }, child: elements };
    });

    let childs = [];
    let botoes = [];

    botoes.push({node: 'element', tag: 'div', attr:{ class:'col-xs-4 text-center' },
                    child:[{ node: 'element', tag: 'button', attr:{ class:'btn btn-info btn-circle btn-xl', title: 'Alterar Nome' },
                                child:[{ node: 'element', tag: 'span', attr:{ class:'glyphicon glyphicon-tags' }, child: [] }]
                           }]
                 });
    botoes.push({node: 'element', tag: 'div', attr:{ class:'col-xs-4 text-center' },
                    child:[{ node: 'element', tag: 'button', attr:{ id:'botao-editar-'+index, class:'btn btn-primary btn-circle btn-xl', title: 'Editar Deck' },
                                child:[{ node: 'element', tag: 'i', attr:{ class:'fa fa-edit' }, child: [] }]
                           }]
                });
    botoes.push({node: 'element', tag: 'div', attr:{ class:'col-xs-4 text-center' },
                    child:[{ node: 'element', tag: 'button', attr:{ class:'btn btn-danger btn-circle btn-xl', title: 'Excluir Deck' },
                                child:[{ node: 'element', tag: 'i', attr:{ class:'fa fa-trash' }, child: [] }]
                           }]
                 });

     childBotoes = { node: 'element', tag: 'div', attr:{ class:'col-xs-3 text-right' }, child: botoes };

     childs.push(rowTitle);
     childs.push(childDeck);
     childs.push(childBotoes);

     let rowContent = { node: 'element', tag:'div', attr:{ class: 'row' }, child: childs };

     json.push(rowContent);
    }

    json.forEach(function (obj, index, array){
      let child = [];
      child.push(obj);
         panels.push({ node: 'element', tag:'div', attr:{ class: 'col-lg-12' },
                           child: [{ node: 'element', tag:'div', attr:{ class: 'col-lg-12' },
                                       child: [{ node: 'element', tag:'div', attr:{ class: 'panel panel-default' },
                                                     child: [{ node: 'element', tag:'div', attr:{ class: 'panel-heading' },
                                                                   child: child
                                                             }]
                                               }]
                                  }]
                     });
    });

    return json2html({node:'root', child: panels});
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
