const builder = require('./builder.js');

module.exports = {
  html(game){
    let lista;
    let content = [];

    if(game == 'M&D'){
      lista = ['Regras', 'Turnos', 'Cartas', 'Glossário'];
      content.push(regras());
      content.push(turnos());
      content.push(cartas());
      content.push(glossario());
    } else {
      lista = ['Rules', 'Turns', 'Cards', 'Glossary'];
      content.push(regrasEN());
      content.push(turnosEN());
      content.push(cartasEN());
      content.push(glossarioEN());
    }

    let li = listaNav(lista);
    let nav =  builder.element('ul', {class:'nav nav-tabs'}, li);

    let tabContent = builder.element('div', {class:'tab-content'}, content);

    let json = builder.element('div', {class:'panel-body'}, [nav, tabContent]);

    let retorno = builder.build([json]);

    return builder.replaceCamelCase(retorno);
  }
}

function listaNav(menus){
  let json = [];

  menus.forEach(monta);
  function monta(item, index, array){
    let a = builder.element('a', {href:'#nav-'+item.replace('á', 'a').toLowerCase(), dataToggle:'tab'}, [builder.text(item)]);

    let classe = null;
    if (index == 0){
      classe = {class: 'active'}
    }
    json.push(builder.element('li', classe, [a]));
  }
  return json;
}

function regras(){
  let text = [];

  text.push(h3('Batalha'));
  text.push(p('As batalhas são divididas em turnos, como em qualquer outro jogo de cartas. Primeiro, monte um time de três heróis com 50 cartas de habilidade no total da maneira que preferir. É importante notar que se você escolher muitos cards de um herói específico, quando esse herói morrer em uma partida, todos eles se tornarão inúteis durante a mesma. Portanto, você deve considerar a possibilidade de equilibrar a equipe ou usar um herói de suporte para manter outro herói vivo.'));
  text.push(p('Existem duas maneiras de ganhar um jogo que pode ser derrotar os três heróis do oponente (Vitória por nocaute) ou fazer com que o oponente use todas as cartas do seu baralho (Vitória por tempo), fazendo com que ele fique sem as ações restantes.'));

  text.push(h3('Os turnos são divididos entre:'));
  text.push(ul(['TURNO DE COMPRA','TURNO DE ATAQUE','TURNO DE AÇÃO','TURNO DE DEFESA']));

  text.push(h3('Regra de arredondamento:'));
  text.push(p('As cartas que cortam o dano pela metade poderão sofrer arredondamento para cima ou para baixo, dependendo de quando o efeito é inserido:'));

  text.push(h4('Arredondamento para baixo:'));
  text.push(ul(['Em todas as cartas de ataque que usam o efeito Split, por exemplo, caso seja atendido o critério, o arredondamento deve ser feito para baixo.']));

  text.push(h4('Arredondamento para baixo:'));
  text.push(ul(['Para todas as cartas defensiva que se utilizem do tipo de efeito Split, como nos casos do Vampire (Contract) ou Necromancer (Undead Barricade), por exemplo, o arredondamento é feito para cima.','Em casos de efeito Channel que corte o custo pela metade, como a carta Raid, arredonda-se para cima.']));

  return builder.element('div', {class:'tab-pane fade in active', id:'nav-regras'}, text);
}

function regrasEN(){
  let text = [];

  text.push(h3('Battle'));
  text.push(p('The battles are divided into turns, as in any other card game. What differs in Monster Rancher is the deck assembly and the number and order of the turns. First, you set up a team of three monsters with fifty skill cards in total in the way you prefer. It is important to note that if you choose many cards of a specific monster, when that monster dies in a match all of them will become useless during that match. Therefore you must consider the possibility of balancing the team or using a support monster to keep another monster alive.'));
  text.push(p('There is more than one way to win a game, which can vary between defeating the opponent\'s three monsters by KO or having the opponent use all the cards on his deck, causing him to run out of remaining actions.'));

  text.push(h3('The steps are divided between:'));
  text.push(ul(['DRAW STEP','ACTION STEP','GUTS STEP','DEFENSE STEP']));

  text.push(h3('Rounding rule:'));
  text.push(p('Cards that cut damage in half may round up or down depending on when the effect is inserted:'));

  text.push(h4('Round down:'));
  text.push(ul(['For all attack cards that cut damage in half, if the criterion is met, such as Mocchi\'s 1-2 Thrust, rounding must be done downwards.']));

  text.push(h4('Round up:'));
  text.push(ul(['For all defensive cards that cut damage in half, such as Naga\'s Counter or Jell\'s Sponge, rounding is done upwards. ',' In case of card effects that cuts the cost in half, such as Any Monster\'s Raid, rounding must be done downwards.']));

  return builder.element('div', {class:'tab-pane fade in active', id:'nav-rules'}, text);
}

function turnos(){
  let text = [];

  text.push(h3('TURNO DE COMPRA'));
  text.push(p('Toda vez que o turno do adversário acabar, este será o seu turno inicial. O objetivo deste turno é sempre lhe deixar com 5 cartas na mão antes de iniciar o Turno de Ataque. Caso você possua 2 cartas na mão, compre mais 3 e assim por diante, baseado em quantas cartas você possuir em sua mão. Importante ressaltar, caso você já possua 5 cartas na mão, a primeira carta do deck automaticamente virará AP. Após ter 5 cartas na mão, o Turno de Ataque será iniciado automaticamente.'));

  text.push(h3('TURNO DE ATAQUE'));
  text.push(p('Neste turno, cada jogador só pode usar cartões marcados com o tipo vermelho, que podem ser ATK, TEC, SKL ou DOM. E as cartas só podem ser usadas se você tiver a quantidade de AP acumulada para poder consumir enquanto estiver usando determinada ação. Cada herói pode executar apenas uma ação por turno, a menos que tenha uma carta SKL ou Spell/Enchantment que altere isso. Também existe uma ação extra de Magia exclusiva para o uso de uma carta Spell/Enchantment. Ao executar todas as ações do turno, ou se você não tiver AP suficientes para fazer algo, você deve prosseguir para o próximo turno, o Turno de Ação.'));

  text.push(h3('TURNO DE AÇÃO'));
  text.push(p('Este é o turno onde você pode acumular os AP necessários para realizar qualquer ação no jogo, seja ataque ou defesa. Você precisará escolher quantas cartas quiser, até cinco, e descartá-las do jogo para poder transformá-las em AP. É uma espécie de sacrifício, onde você joga fora certas ações para executar outras. É por isso que seu time deve ter uma variedade de movimentos equilibrados para que você possa ter uma diversidade maior de estratégias no mesmo jogo. É muito importante considerar que se você jogar fora muitas cartas ao mesmo tempo para tentar usar seus ataques mais poderosos, o oponente pode usar muitas cartas de defesa também, e você pode acabar perdendo por falta de cartas. Após encerrar o seu turno de ação, será a vez de seu adversário.'));

  text.push(h3('TURNO DE DEFESA'));
  text.push(p('Por último, mas não menos importante, a vez da defesa ocorre toda vez que seu oponente utilizar qualquer tipo de carta vermelha (ATK, TEC, SKL ou DOM). O jogo entrará automaticamente em seu turno defesa, onde você pode interferir com a ação tomada se tiver quaisquer cartas correspondentes, que são as cartas marcadas em azul (GRD e EVD). Em geral, os cartões GRD podem funcionar melhor contra ATK e, muitas vezes, apenas removem um pouco dds dano. Os cartões EVD, por outro lado, podem funcionar melhor para outros tipos de ataques, geralmente melhores contra ataques mais fortes, sofrendo dano mais facilmente contra os ataques fracos. Existem também algumas cartas de defesa que cancelam as ações DOM ou SKL.'));

  return builder.element('div', {class:'tab-pane fade', id:'nav-turnos'}, text)
}

function turnosEN(){
  let text = [];

  text.push(h3('DRAW STEP'));
  text.push(p('Whenever your opponent\'s turn ends, your draw step starts. The objective of this step is to always have you with 5 cards in hand before starting the Attack Step. If you have 2 cards in your hand, draw 3 more and so on, based on how many cards you have in your hand. Importantly, if you already have 5 cards in hand, the first card in the deck will automatically become GUTS. After you have 5 cards in hand, the Attack Step will start automatically.'));

  text.push(h3('ACTION STEP'));
  text.push(p('In this turn, each player may only use cards marked with a red type, which may be POW, INT, SPE or ENV. The cards can only be used if you have the amount of GUTS accumulated for the cost of certain actions, much like the original Monster Rancher games. Each monster can perform only one action per turn, unless it has a special card to override it, as does the breeder themselves. Once you\'ve executed all the actions of the turn, or if you do not have sufficient GUTS to do something, you must proceed to the next turn, the turn of GUTS.'));

  text.push(h3('GUTS STEP'));
  text.push(p('This is the turn where you can accumulate the GUTS needed to perform any action in the game, either attack or defense. You\'ll need to choose as many cards as you want, up to five, and discard them from the game so you can turn them into GUTS. It\'s a kind of sacrifice, where you throw away certain actions in order to execute others. That\'s why your team must have a variety of balanced moves so you can have a greater diversity of strategies in the same game. It\'s very important to consider that if you throw away many cards at once to try to use your most powerful attacks, the opponent can use a lot of defense cards too, and you can end up losing for lack of cards.'));

  text.push(h3('DEFENSE STEP'));
  text.push(p('Last but not least, the turn of defense occurs every time your opponent tries to perform any kind of action. The game automatically moves to your turn of defense where you can interfere with the action taken if you have any corresponding cards, which are the cards marked in blue (BLK and DGE). In general, BLK cards can work better against POW moves and often only remove some of the damage. DGE cards, on the other hand, may work better for other types of attacks, usually stronger attacks, dealing damage from weak attacks more easily. There are also a few defense cards that cancel ENV or SPE actions.'));

  return builder.element('div', {class:'tab-pane fade', id:'nav-turns'}, text)
}

function cartas(){
  let text = [];

  text.push(h3('Tipos de Cartas'));
  text.push(p('Todas as cartas possuem atributos de Classe, que indica a qual classe pertence aquela carta, e Custo, que indica quantos AP são necessário para utilizar aquela carta. A Classe da carta pode ser Spell ou Talent que tem atribuições especiais. Talents podem ser usadas por qualquer classe de heróis, consumindo o turno daquele herói. Spells/Enchantments podem ser utilizadas gastando o turno de Magia. Cada carta também possui uma descrição com efeito único (Leia a seção de Efeitos para maiores informações).'));

  text.push(h4('ATK (Attack)'));
  text.push(p('As cartas de ataque possuem o atributo de dano, que indica quantos HP será infligido caso o ataque acerte o seu alvo.'));

  text.push(h4('TEC (Technique)'));
  text.push(p('As cartas de técnica comportam-se exatamente como as cartas de ATK. A única diferença é a natureza do ataque que faz ela ser mais difícil de ser evadida ou bloqueada, na maioria das vezes.'));

  text.push(h4('SKL (Skill)'));
  text.push(p('As cartas de habilidade não possuem dano, porém possuem um efeito único para cada classe, delimitando assim a principal diferença entre elas.'));

  text.push(h4('EVD (Evade)'));
  text.push(p('As cartas de evasão só podem ser usadas no turno de defesa e servem para evitar algum ataque direto, escapando do mesmo.'));

  text.push(h4('GRD (Guard)'));
  text.push(p('As cartas de guarda comportam-se exatamente como as cartas de EVD. A única diferença é a natureza da defesa que faz ela não ser tão eficiente quanto uma evasão, bloqueando apenas parte do ataque, na maioria das vezes.'));

  text.push(h4('DOM (Domain)'));
  text.push(p('As cartas de domínio são Spells que se mantém durante todo o jogo. Esta carta altera a dinâmica do combate com uma regra única que só será alterada caso algum outro domínio o substitua.'));

  return builder.element('div', {class:'tab-pane fade', id:'nav-cartas'}, text);
}

function cartasEN(){
  let text = [];

  text.push(h3('Types of Cards'));
  text.push(p('All cards have attributes that indicates which Monster that card belongs to, and Cost, which indicates how many GUTS are required to use that card. The Card Type can be Breeder or Any Monster that has special assignments. Any Monster cards, as the name says, can be used by any monster, consuming that monster\'s turn. Breeder cards can be used by spending the Breeder turn. Each card also may have a unique effect description.'));

  text.push(h4('POW (Power)'));
  text.push(p('Power moves have the damage attribute, which indicates how many HP will be inflicted if the move hits its target.'));

  text.push(h4('INT (Intelligence)'));
  text.push(p('Intelligence moves behave exactly like POW cards. The only difference is the nature of the move that makes it more difficult to be dodged or blocked, most of the time.'));

  text.push(h4('SPE (Special)'));
  text.push(p('Special moves have no damage, but have a unique effect for each monster, thus delimiting the main difference between them.'));

  text.push(h4('DGE (Dodge)'));
  text.push(p('Dodge moves can only be used in the defense step and are used to prevent any direct attack by escaping it.'));

  text.push(h4('BLK (Block)'));
  text.push(p('Block moves behave exactly like DGE moves. The only difference is the nature of the defense that makes it not as effective as a dodge, blocking only part of the attack, most of the time.'));

  text.push(h4('ENV (Environment)'));
  text.push(p('Environment cards have effects that hold throughout the game. This card changes the dynamics of combat with a single rule that will only change if some other ENV replaces it.'));

  return builder.element('div', {class:'tab-pane fade', id:'nav-cards'}, text);
}

function glossario(){
  let head = tr('thead', 'th', [{item:'Item', description:'Description', traducao:'Tradução'}]);
  let body = tr('tbody', 'td', [{item:'AP', description:'Action Points', traducao:'Pontos de Vida'},
  {item:'Talent', description:'Talent', traducao:'Talento'},
  {item:'Spell', description:'Spell', traducao:'Feitiço'},
  {item:'Enchantment', description:'Enchantment', traducao:'Encantamento'},
  {item:'ATK', description:'Attack', traducao:'Ataque Simples'},
  {item:'TEC', description:'Technique', traducao:'Técnica'},
  {item:'SKL', description:'Skill', traducao:'Habilidade'},
  {item:'EVD', description:'Evade', traducao:'Evasão'},
  {item:'GRD', description:'Guard', traducao:'Guarda'},
  {item:'DOM', description:'Domain', traducao:'Domínio'},
  {item:'S', description:'Spiritual', traducao:'Espiritual'},
  {item:'M', description:'Mundane', traducao:'Mundano'},
  {item:'U', description:'Undead', traducao:'Morto-vivo'}]);

  let table = builder.element('table', {class:'table table-hover'}, [head, body]);
  let div = builder.element('div', {class:'table-responsive'}, [table]);
  return builder.element('div', {class:'tab-pane fade', id:'nav-glossario'}, [div]);
}

function glossarioEN(){
  let head = tr('thead', 'th', [{item:'Item', description:'Description', traducao:'PT-BR'}]);
  let body = tr('tbody', 'td', [
  {item:'Any Monster', description:'Any Monster', traducao:'Qualquer monstro'},
  {item:'Breeder', description:'Breeder', traducao:'Criador/Treinador'},
  {item:'POW', description:'Power', traducao:'Poder'},
  {item:'INT', description:'Intelligence', traducao:'Inteligência'},
  {item:'SPE', description:'Special', traducao:'Especial'},
  {item:'DGE', description:'Dodge', traducao:'Esquiva'},
  {item:'BLK', description:'Block', traducao:'Bloqueio'},
  {item:'ENV', description:'Environment', traducao:'Ambiente'},
  {item:'G', description:'Ground', traducao:'Terreste'},
  {item:'A', description:'Aerial', traducao:'Aéreo'},
  {item:'W', description:'Water', traducao:'Aquático'}]);

  let table = builder.element('table', {class:'table table-hover'}, [head, body]);
  let div = builder.element('div', {class:'table-responsive'}, [table]);
  return builder.element('div', {class:'tab-pane fade', id:'nav-glossary'}, [div]);
}

function p(string){
  return builder.element('p', null, [builder.text(string)]);
}

function h3(string){
  return builder.element('h3', null, [builder.text(string)]);
}

function h4(string){
  return builder.element('h4', null, [builder.text(string)]);
}

function ul(lista){
  let li = [];
  lista.forEach(monta);
  function monta(item, index, array){
    li.push(builder.element('li', null, [builder.text(item)]));
  }
  return builder.element('ul', null, li);
}

function tr(head, element, lista){
  let tr = [];
  lista.forEach(function (obj, index, array){
    let t = [];
    t.push(builder.element(element, null, [builder.text(obj.item)]));
    t.push(builder.element(element, null, [builder.text(obj.description)]));
    t.push(builder.element(element, null, [builder.text(obj.traducao)]));
    tr.push(builder.element('tr', null, t));
  });
  return builder.element(head, null, tr);
}
