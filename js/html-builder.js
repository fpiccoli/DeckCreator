const data = require('./data.js');

module.exports = {
    heroi(nomeDaClasse){

      let herois = data.getHerois(nomeDaClasse);

      let jsonHerois = [];

      for (let i in herois)
      {
          let json = {
            node: 'element', tag: 'div', attr: { class: 'col-lg-4' },
                child: [{node: 'element', tag: 'div', attr: { class: 'panel' },
                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                        child: [{node: 'element', tag: 'div', attr: { class: 'row' },
                                                    child: [{node: 'element', tag: 'div', attr: { class: 'col-lg-12' },
                                                                child: [{node: 'element', tag: 'img', attr: { src: herois[i].imgurl, height: '100%', width: '100%' }, child: [] }]
                                                            }]
                                                }]
                                    }]
                        },
                        {node: 'element', tag: 'a', attr: { href: '#', class: 'selecionar-heroi-'+herois[i].id },
                            child: [{node: 'element', tag: 'div', attr: { class: 'panel-footer' },
                                        child: [{node: 'element', tag: 'span', attr: { class: 'pull-left' },
                                                    child:[{ node: 'text', text: nomeDaClasse }]},
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
  classe(classe, jsonHerois, type){

      return {
        node: 'element', tag: 'div', attr: { class: 'row' },
            child: [{node: 'element', tag: 'div', attr: { class: 'col-lg-6' },
                        child: [{node: 'element', tag: 'div', attr: { class: 'panel panel-default' },
                                    child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                                child: [{node: 'element', tag: 'div', attr: { class: 'panel-title' },
                                                            child:[{node: 'element', tag: 'a', attr: { dataToggle: 'collapse', dataParent:'#accordion-'+type+'-panel', href:'#'+type+'-'+classe.toLowerCase() },
                                                                        child: [{ node: 'text', text: classe }]
                                                                    }]
                                                        }]
                                            },
                                            {node: 'element', tag: 'div', attr: { id: type+'-'+classe.toLowerCase(), class: 'panel-collapse collapse' },
                                                        child: [{node: 'element', tag: 'div', attr: { class: 'panel-body' },
                                                                    child: [{node: 'element', tag: 'div', attr: { class: 'row' },
                                                                                child: [{node: 'element', tag: 'div', attr: { class: 'col-sm-12' }, child: [jsonHerois] }]
                                                                            }]
                                                                }]
                                            }]
                                }]
                    }]
      };

  }
}

// A CADA JSON
// <div class="panel-group">

// A CADA 2 CLASSE
// <div class="row">


// <div class="row">
//    <div class="col-lg-6">
//       <div class="panel panel-default">

//          <div class="panel-heading">
//             <h4 class="panel-title">
//                <a data-toggle="collapse" data-parent="#accordion-pure-panel" href="#pure-alchemist">Alchemist</a>
//             </h4>
//          </div>

//          <div id="pure-alchemist" class="panel-collapse collapse">
//             <div class="panel-body">
//                <div class="row">
//                   <div class="col-sm-12">
// HEROIS


//                      </div>
//                   </div>
//                </div>
//             </div>


//          </div>
//       </div>
//    </div>

// </div>
// </div>
