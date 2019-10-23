const htmlCartas = require('../html/cartas.js');
const conta = require('../conta.js');

module.exports = {
  heroPanels(listaDeCartas, user, herois, documento){
    for(let i in herois){
      let valor = conta.mainClass(listaDeCartas, herois[i], user.game) + conta.subClass(listaDeCartas, herois[i], user.game);
      documento.querySelector('#qtde-heroi-'+herois[i].panel).textContent = valor;
    }
  },
  cardPanels(carta, listaDeCartas, documento){
    documento.querySelector('#card-text-'+carta.cardnumber).textContent = conta.obj(listaDeCartas, carta);
  },
  otherPanels(listaDeCartas, user, documento){
    let talentStyle;
    let spellStyle;
    let talentIcon;
    let spellIcon;
    let talentText;
    let spellText;
    let qtdeTalent = 0;
    let qtdeSpell = 0;

    let percentual = listaDeCartas.length*100/50;
    documento.querySelector('#all-cards').textContent = listaDeCartas.length;
    documento.querySelector('#status-value').textContent = percentual+'%';
    documento.querySelector('#status-bar').innerHTML = htmlCartas.statusbar(percentual);

    if(user.game == 'M&D'){
      qtdeTalent = conta.class(listaDeCartas, 'Talent', user.game);
      qtdeSpell = conta.class(listaDeCartas, 'Spell', user.game) + conta.class(listaDeCartas, 'Enchantment', user.game);
      talentStyle = 'style="color: white;background-color: #c0c0c0;"';
      spellStyle = 'style="color: white;background-color: #B57EDC;"';
      talentIcon = '<img src="https://drive.google.com/uc?export=download&id=1WrooGrmv1Uand440zPn9QojbY_SA6WzB" height="300%" width="300%"/>';
      spellIcon = '<img src="https://drive.google.com/uc?export=download&id=12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV" height="150%" width="150%"/><img src="https://drive.google.com/uc?export=download&id=1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW" height="150%" width="150%"/>';
      talentText = 'Talent</br>All Classes';
      spellText = 'Spell +</br>Enchantment';
    } else if(user.game == 'MRBC'){
      qtdeTalent = conta.class(listaDeCartas, 'Any Monster', user.game);
      qtdeSpell = conta.class(listaDeCartas, 'Breeder', user.game);
      talentStyle = 'style="color: black;background-color: #f7f7f9;"';
      spellStyle = 'style="color: white;background-color: #483939;"';
      talentIcon = '<img src="https://drive.google.com/uc?export=download&id=1cTOPQh_UbGKeWzEkUuCjPjxYSTeqTseJ" height="300%" width="300%"/>';
      spellIcon = '<img src="https://drive.google.com/uc?export=download&id=1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ" height="300%" width="300%"/>';
      talentText = 'Any Monster';
      spellText = 'Breeder';
    }

    let talentHtml = '<div class="panel-heading" '+talentStyle+'><div class="row"><div class="col-xs-3">'+talentIcon+'</div><div class="col-xs-9 text-right"><div class="huge">'+qtdeTalent+'</div><div>'+talentText+'</div></div></div></div>';
    let spellHtml = '<div class="panel-heading" '+spellStyle+'"><div class="row"><div class="col-xs-3">'+spellIcon+'</div><div class="col-xs-9 text-right"><div class="huge">'+qtdeSpell+'</div><div>'+spellText+'</div></div></div></div>';

    documento.querySelector('#talent-panel').innerHTML = talentHtml;
    documento.querySelector('#spell-panel').innerHTML = spellHtml;
  }
}
