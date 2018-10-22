let panelBody = document.querySelector('.panel-body');

module.exports = {
  render(cards, codigo){

    if(cards.Decks[codigo].Cards){
      let stringHTML = '<div class="col-lg-12">';

      for(let i in cards.Decks[codigo].Cards){
          if(i==0){
              stringHTML += '<div class="row"><div class="col-lg-1"></div>';
          }
          else if (i%5 == 0) {
              stringHTML += '<div class="col-lg-1"></div></div><div class="row"><div class="col-lg-1"></div>';
          }
          stringHTML += '<div class="col-lg-2"><img src="' + cards.Decks[codigo].Cards[i].imgURL + '" height="100%" width="100%"></div>';
      }
      stringHTML += '</div></div>';

      panelBody.innerHTML = stringHTML;
      }
  }
}
