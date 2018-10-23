const { ipcRenderer } = require('electron');
const panel = require('./panel-heroes.js');

let linkFechar = document.querySelector("#link-fechar");
let classesPuras = ['alchemist','amazon','barbarian','bard','beast','berserker','cleric','demon','druid',
'fighter','goblin','gremlim','guardian','jester','knight','monk','necromancer','paladin','ranger','sorcerer',
'thief','vampire','warlock','warrior','wizard'];
let classesHibridas = ['acolyte','arcanist','assassin','beastmaster','bloodmancer','bloodrager','brawler',
'celt','champion','efreet','eldritchknight','ghoul','gipsy','heretic','hobgoblin','hun','hunter','illusionist',
'imp','infernalist','lich','necrolic','nymph','occultist','oni','preacher','revenant','rogue','runesoldier',
'scavenger','shaman','shieldmaiden','skald','slayer','spellblade','squire','succubus','troll','valkyrie','witch'];

renderizar(classesPuras, '#pure-');
renderizar(classesHibridas, '#hybrid-');

function renderizar(classes, tipo){
  for(let i in classes){
    console.log(tipo+classes[i]);
    let obj = document.querySelector(tipo+classes[i]);
    if(obj){
      obj.addEventListener('click', function () {
        panel.render(obj);
      })
    }
  }
}

window.onload = function(){
}

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-herois');
})
