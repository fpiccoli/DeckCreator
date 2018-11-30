const builder = require('./builder.js');

module.exports = {
  html(){
    let li = listaNav(['Regras', 'Turnos', 'Cartas', 'Glossário'])
    let nav =  builder.element('ul', {class:'nav nav-tabs'}, li);

    let content = [];
    content.push(regras());
    content.push(turnos());
    content.push(cartas());
    content.push(glossario());

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
    let a = builder.element('a', {href:'#nav-'+item.replace('á','a').toLowerCase(), dataToggle:'tab'}, [builder.text(item)]);

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

  text.push(h3('Os turnos são divididos entre:'));
  text.push(p('As cartas que cortam o dano pela metade poderão sofrer arredondamento para cima ou para baixo, dependendo de quando o efeito é inserido:'));

  text.push(h4('Arredondamento para baixo:'));
  text.push(ul(['Em todas as cartas de ataque que usam o efeito Split, por exemplo, caso seja atendido o critério, o arredondamento deve ser feito para baixo.']));

  text.push(h4('Arredondamento para baixo:'));
  text.push(ul(['Para todas as cartas defensiva que se utilizem do tipo de efeito Split, como nos casos do Vampire (Contract) ou Necromancer (Undead Barricade), por exemplo, o arredondamento é feito para cima.','Em casos de efeito Channel que corte o custo pela metade, como a carta Raid, arredonda-se para cima.']));

  return builder.element('div', {class:'tab-pane fade in active', id:'nav-regras'}, text);
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

  return builder.element('div', {class:'tab-pane fade', id:'nav-cartas'}, text)
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
