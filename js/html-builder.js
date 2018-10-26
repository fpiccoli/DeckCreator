const data = require('./data.js');
const json2html = require('html2json').json2html;

module.exports = {
    heroi(classe){
      let jsonHerois = [];

      for (let i in classe.heroes)
      {
          let json = {
            node: 'element', tag: 'div', attr: { class: 'col-lg-4' },
                child: [{node: 'element', tag: 'div', attr: { class: 'panel' },
                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                        child: [{node: 'element', tag: 'div', attr: { class: 'row' },
                                                    child: [{node: 'element', tag: 'div', attr: { class: 'col-lg-12' },
                                                                child: [{node: 'element', tag: 'img', attr: { src: classe.heroes[i].imgurl, height: '100%', width: '100%' }, child: [] }]
                                                            }]
                                                }]
                                    }]
                        },
                        {node: 'element', tag: 'a', attr: { href: '#', class: 'selecionar-heroi' },
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
          if(hibridos[i].sub == classe){
            sub = ' pull-right';
          }

          jsonNav.push({
            node: 'element', tag: 'li', attr: { class: ativo+sub },
                child: [{node: 'element', tag: 'a', attr: { href: '#'+classe.toLowerCase()+'-'+hibridos[i].name.toLowerCase()+'-nav', dataToggle: 'tab' },
                            child: [{ node: 'text', text: hibridos[i].name }]
                        }]
          });
          jsonContent.push ({
            node: 'element', tag: 'div', attr: { class: ativo2, id: classe.toLowerCase()+'-'+hibridos[i].name.toLowerCase()+'-nav' },
                child: this.heroi(hibridos[i])
          });
      }

      return [{node: 'element', tag: 'ul', attr: { class: 'nav nav-pills' }, child: jsonNav},
              {node: 'element', tag: 'div', attr: { class: 'tab-content' }, child: jsonContent}];
  },
    classe(classes, type){
      let json = [];

      for(let i in classes){

        json.push({node: 'element', tag: 'div', attr: { class: 'col-lg-6' },
                    child: [{node: 'element', tag: 'div', attr: { class: 'panel panel-default' },
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
                                                                            child: [{node: 'element', tag: 'div', attr: { class: 'col-sm-12' }, child: this.heroi(classes[i]) }]
                                                                        }]
                                                            }]
                                        }]
                            }]

        });

      }
      let retorno = [];
      let i = 0;
      do {
        let child = [];
        if(json[i]){
          child.push(json[i]);
        }
        if(json[i+1]){
          child.push(json[i+1]);
        }
      retorno.push({node: 'element', tag: 'div', attr: { class: 'row' },
                  child: child
                    });
        i++;i++;
      }
      while (i < json.length);

      return retorno;
    },
    classeHibrido(classes, type){
      let json = [];

      for(let i in classes){
        let hibridos = data.getHybrid(classes[i].name);
        let child = [];
        let cor = 'panel panel-danger';

        if (hibridos.length > 0){
          child = this.hibrido(hibridos, classes[i].name);
          cor = 'panel panel-default'
        }

        json.push({node: 'element', tag: 'div', attr: { class: 'col-lg-6' },
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
      let retorno = [];
      let i = 0;
      do {
        let child = [];
        if(json[i]){
          child.push(json[i]);
        }
        if(json[i+1]){
          child.push(json[i+1]);
        }
      retorno.push({node: 'element', tag: 'div', attr: { class: 'row' },
                  child: child
                    });
        i++;i++;
      }
      while (i < json.length);

      return retorno;
    },

  build(json){
    return json2html({node:'root', child:json});
  }
}
