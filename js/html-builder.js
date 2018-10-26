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
    heroiHibrido(classe){

      let jsonNav = [];
      let jsonContent = [];

      for (let i in classe){
        console.log();
          jsonNav.push({
            node: 'element', tag: 'li', attr: { class: 'active' },
                child: [{node: 'element', tag: 'a', attr: { href: '#'+classe[i].name.toLowerCase()+'-nav', dataToggle: 'tab' },
                            child: [{ node: 'text', text: classe[i].name }]
                        }]
          });
          jsonContent.push ({
            node: 'element', tag: 'div', attr: { class: 'tab-pane fade in active', id: classe[i].name.toLowerCase()+'-nav' },
                child: this.heroi(classe)
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
                                                        child:[{node: 'element', tag: 'a', attr: { dataToggle: 'collapse', dataParent:'#accordion-'+type+'-panel', href:'#'+type+'-'+classes[i].name.toLowerCase() },
                                                                    child: [{ node: 'text', text: classes[i].name }]
                                                                }]
                                                    }]
                                        },
                                        {node: 'element', tag: 'div', attr: { id: type+'-'+classes[i].name.toLowerCase(), class: 'panel-collapse collapse' },
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
      retorno.push({node: 'element', tag: 'div', attr: { class: 'row' },
                  child: [ json[i], json[i+1] ] //INCREMENTAR COM VALIDACAO DE UNDEFINED
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
