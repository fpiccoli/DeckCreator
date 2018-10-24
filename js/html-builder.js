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
                                                                child: [{node: 'element', tag: 'img', attr: { src: herois[i].imgURL, height: '100%', width: '100%' }, child: [] }]
                                                            }]
                                                }]
                                    }]
                        },
                        {node: 'element', tag: 'a', attr: { href: '#', class: 'selecionar-heroi-'+herois[i].CardId },
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
  classe(classes, jsonHerois, type){

    let jsonClasses = [];

    for (let i in classes){

      let json = {
        node: 'element', tag: 'div', attr: { class: 'row' },
            child: [{node: 'element', tag: 'div', attr: { class: 'col-lg-6' },
                        child: [{node: 'element', tag: 'div', attr: { class: 'panel panel-default' },
                                    child: [{node: 'element', tag: 'div', attr: { class: 'panel-heading' },
                                                child: [{node: 'element', tag: 'a', attr: { dataToggle: 'collapse', dataParent:'#accordion-pure-panel', href:'#'+type+'-'+classes[i].Class },
                                                            child:[{node: 'element', tag: 'i', attr: { class: "fa fa-arrow-circle-right" },
                                                                        child: [{ node: 'text', text: classes[i].Name }]
                                                                   }]
                                                        }]
                                            },
                                            {

                                            }
                                          ]
                                }]
                    },
      };

    return;
  }
}

// A CADA CLASSE
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
//                         <div class="panel">
//                            <div class="panel-heading">
//                               <div class="row">
//                                  <div class="col-lg-12"><img src="https://gdurl.com/Zzi1" height="100%" width="100%"></div>
//                               </div>
//                            </div>
//                         </div>


//                         <a href="#" class="selecionar-heroi-3">
//                            <div class="panel-footer">
//                               <span class="pull-left">
//                                    Morgan
//                               </span>
//                               <span class="pull-right">
//                                    <i class="fa fa-arrow-circle-right"></i>
//                               </span>
//                               <div class="clearfix"></div>
//                            </div>
//                         </a>


//                      </div>
//                   </div>
//                </div>
//             </div>


//          </div>
//       </div>
//    </div>

// </div>
// </div>
