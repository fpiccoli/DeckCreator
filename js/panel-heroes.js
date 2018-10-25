const data = require('./data.js');
const html = require('./html-builder.js');

module.exports = {
  renderPuro(){

    let classes = data.listByType('Pure');

    for(let i in classes){
      console.log(classes[i]);
    }

    // for (let i in herois){
    //
    //   let jsonHerois = html.heroi(herois[i].class);
    //
    // }

    // let jsonHerois = html.heroi('Amazon');
    //
    // console.log(html.builder(jsonHerois));
    //
    // let jsonClasse = html.classe('Amazon', jsonHerois, 'pure');
    //
    // let retornoHTML = html.builder(jsonClasse);
    //
    // console.log(retornoHTML);
  }



  //  CLASSE HIBRIDA
  //               <ul class="nav nav-pills">
  //                   <li class="active"><a href="#home-pills" data-toggle="tab">Home</a>
  //                   </li>
  //                   <li><a href="#profile-pills" data-toggle="tab">Profile</a>
  //                   </li>
  //                   <li><a href="#messages-pills" data-toggle="tab">Messages</a>
  //                   </li>
  //                   <li><a href="#settings-pills" data-toggle="tab">Settings</a>
  //                   </li>
  //               </ul>
  //
  //               <!-- Tab panes -->
  //               <div class="tab-content">
  //                   <div class="tab-pane fade in active" id="home-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="profile-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="messages-pills">
  //                       //HEROIS
  //                   </div>
  //                   <div class="tab-pane fade" id="settings-pills">
  //                       //HEROIS
  //                   </div>
  //               </div>

}
