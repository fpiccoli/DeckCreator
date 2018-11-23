const { ipcRenderer }  = require('electron');
const file = require('./file-manager.js');
const alert = require('./alert-message.js');
const load = require('./loadJSON.js');
const html = require('./html/menu-decks.js');

module.exports = {
  navbar(documento){
    documento.querySelector("#link-fechar").addEventListener('click', function () {
      ipcRenderer.send('fechar-janela-principal');
    });
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      ipcRenderer.send('get-path', 'documents');
      ipcRenderer.on('return-path', (event, path) => {
        file.clearCache(path);
        alert.message(documento.querySelector("#alert-message"), 'Cache do <b>Tabletop Simulator</b> limpo com sucesso!', 'success');
      });
    });
    documento.querySelector("#lista-efeitos").addEventListener('click', function () {
      ipcRenderer.send('abrir-janela-efeitos');
    });
  },
  sidebar(documento){
    documento.querySelector('#load-decks').addEventListener('click' , function(){
      ipcRenderer.send('get-path', 'documents');
      ipcRenderer.on('return-path', (event, path) => {
        let json = file.readDir(path);
        console.log(html.menu(json));
        documento.querySelector('#menu-content').innerHTML = html.menu(json);

        json.forEach(build);
        function build(deck, index, array) {
          let herois = [];
          let cartas = [];

          let retornoLoad = load.montaObj(deck);
          if (retornoLoad){
            herois = retornoLoad.herois;
            cartas = retornoLoad.cartas;
          }
          documento.querySelector('#botao-editar-'+index).addEventListener('click' , function(){
            ipcRenderer.send('set-nome-cookie', array[index].Nickname);
            ipcRenderer.send('set-card-cookie', cartas);
            ipcRenderer.send('set-herois-cookie', herois);
            ipcRenderer.send('pagina-editor');
          });
          documento.querySelector('#botao-excluir-'+index).addEventListener('click' , function(){
            file.delete(path, array[index].Nickname);
            renderDecks();
          });
          // document.querySelector('#botao-alterar-nome-'+index).addEventListener('click' , function(){
          //   console.log('Altera Nome');
          //   // file.save(path, array[index].Nickname, json);
          //   renderDecks();
          // });
        }
      });
    });
    documento.querySelector('#novo-deck').addEventListener('click' , function(){
      ipcRenderer.send('clear-cookies');
      ipcRenderer.send('pagina-editor');
    });
    documento.querySelector('#editor-deck').addEventListener('click' , function(){
      ipcRenderer.send('pagina-editor');
    });
    documento.querySelector("#regras-panel").addEventListener('click', function () {
      let htmlText =
              `<div class="panel-body">
                  <!-- Nav tabs -->
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#regras" data-toggle="tab">Regras</a>
                    </li>
                    <li><a href="#turnos" data-toggle="tab">Turnos</a>
                    </li>
                    <li><a href="#cartas" data-toggle="tab">Cartas</a>
                    </li>
                    <li><a href="#glossario" data-toggle="tab">Glossário</a>
                    </li>
                  </ul>

                  <!-- Tab panes -->
                  <div class="tab-content">
                    <div class="tab-pane fade in active" id="regras">
                      <h3>Batalha</h3>
                      <p>
                        As batalhas são divididas em turnos, como em qualquer outro jogo de cartas.
                        Primeiro, monte um time de três heróis com 50 cartas de habilidade no total da maneira que preferir.
                        É importante notar que se você escolher muitos cards de um herói específico, quando esse herói morrer em uma partida, todos eles se tornarão inúteis durante a mesma.
                        Portanto, você deve considerar a possibilidade de equilibrar a equipe ou usar um herói de suporte para manter outro herói vivo.
                      </p>
                      <p>
                        Existem duas maneiras de ganhar um jogo que pode ser derrotar os três heróis do oponente (Vitória por nocaute) ou fazer com que o oponente use
                        todas as cartas do seu baralho (Vitória por tempo), fazendo com que ele fique sem as ações restantes.
                      </p>
                      <h3>Os turnos são divididos entre:</h3>
                      <ul>
                        <li>TURNO DE COMPRA</li>
                        <li>TURNO DE ATAQUE</li>
                        <li>TURNO DE AÇÃO</li>
                        <li>TURNO DE DEFESA</li>
                      </ul>

                      <h3>Regra de Arredondamento:</h3>
                      <p>As cartas que cortam o dano pela metade poderão sofrer arredondamento para cima ou para baixo, dependendo de quando o efeito é inserido:</p>

                      <h4>Arredondamento para baixo:</h4>
                      <p>- Em todas as cartas de ataque que usam o efeito Split, por exemplo, caso seja atendido o critério, o arredondamento deve ser feito para baixo.</p>

                      <h4>Arredondamento para cima:</h4>
                      <ul>
                        <li>Para todas as cartas defensiva que se utilizem do tipo de efeito Split, como nos casos do Vampire (Contract) ou Necromancer (Undead Barricade), por exemplo, o arredondamento é feito para cima.</li>
                        <li>Em casos de efeito Channel que corte o custo pela metade, como a carta Raid, arredonda-se para cima.</li>
                      </ul>

                    </div>
                    <div class="tab-pane fade" id="turnos">
                      <h3>TURNO DE COMPRA</h3>
                      <p>
                        Toda vez que o turno do adversário acabar, este será o seu turno inicial. O objetivo deste turno é sempre lhe deixar com 5 cartas na mão antes de iniciar o Turno de Ataque. Caso você possua 2 cartas na mão, compre mais 3 e assim por diante, baseado em quantas cartas você possuir em sua mão. Importante ressaltar, caso você já possua 5 cartas na mão, a primeira carta do deck automaticamente virará AP. Após ter 5 cartas na mão, o Turno de Ataque será iniciado automaticamente.
                      </p>
                      <h3>TURNO DE ATAQUE</h3>
                      <p>
                        Neste turno, cada jogador só pode usar cartões marcados com o tipo vermelho, que podem ser ATK, TEC, SKL ou DOM. E as cartas só podem ser usadas se você tiver a quantidade de AP acumulada para poder consumir enquanto estiver usando determinada ação. Cada herói pode executar apenas uma ação por turno, a menos que tenha uma carta SKL ou Spell/Enchantment que altere isso. Também existe uma ação extra de Magia exclusiva para o uso de uma carta Spell/Enchantment. Ao executar todas as ações do turno, ou se você não tiver AP suficientes para fazer algo, você deve prosseguir para o próximo turno, o Turno de Ação.
                      </p>
                      <h3>TURNO DE AÇÃO</h3>
                      <p>
                        Este é o turno onde você pode acumular os AP necessários para realizar qualquer ação no jogo, seja ataque ou defesa. Você precisará escolher quantas cartas quiser, até cinco, e descartá-las do jogo para poder transformá-las em AP. É uma espécie de sacrifício, onde você joga fora certas ações para executar outras. É por isso que seu time deve ter uma variedade de movimentos equilibrados para que você possa ter uma diversidade maior de estratégias no mesmo jogo. É muito importante considerar que se você jogar fora muitas cartas ao mesmo tempo para tentar usar seus ataques mais poderosos, o oponente pode usar muitas cartas de defesa também, e você pode acabar perdendo por falta de cartas. Após encerrar o seu turno de ação, será a vez de seu adversário.
                      </p>
                      <h3>TURNO DE DEFESA</h3>
                      <p>
                        Por último, mas não menos importante, a vez da defesa ocorre toda vez que seu oponente utilizar qualquer tipo de carta vermelha (ATK, TEC, SKL ou DOM). O jogo entrará automaticamente em seu turno defesa, onde você pode interferir com a ação tomada se tiver quaisquer cartas correspondentes, que são as cartas marcadas em azul (GRD e EVD). Em geral, os cartões GRD podem funcionar melhor contra ATK e, muitas vezes, apenas removem um pouco dds dano. Os cartões EVD, por outro lado, podem funcionar melhor para outros tipos de ataques, geralmente melhores contra ataques mais fortes, sofrendo dano mais facilmente contra os ataques fracos. Existem também algumas cartas de defesa que cancelam as ações DOM ou SKL.
                      </p>
                    </div>
                    <div class="tab-pane fade" id="cartas">
                      <h3>Tipos de Cartas</h3>
                      <p>
                        Todas as cartas possuem atributos de Classe, que indica a qual classe pertence aquela carta, e Custo, que indica quantos AP são necessário para utilizar aquela carta.
                        A Classe da carta pode ser Spell ou Talent que tem atribuições especiais. Talents podem ser usadas por qualquer classe de heróis, consumindo o turno daquele herói.
                        Spells/Enchantments podem ser utilizadas gastando o turno de Magia. Cada carta também possui uma descrição com efeito único (Leia a seção de Efeitos para maiores informações).
                      </p>

                      <h4>ATK (Attack)</h4>
                      <p>As cartas de ataque possuem o atributo de dano, que indica quantos HP será infligido caso o ataque acerte o seu alvo.</p>

                      <h4>TEC (Technique)</h4>
                      <p>As cartas de técnica comportam-se exatamente como as cartas de ATK. A única diferença é a natureza do ataque que faz ela ser mais difícil de ser evadida ou bloqueada, na maioria das vezes.</p>

                      <h4>SKL (Skill)</h4>
                      <p>As cartas de habilidade não possuem dano, porém possuem um efeito único para cada classe, delimitando assim a principal diferença entre elas.</p>

                      <h4>EVD (Evade)</h4>
                      <p>As cartas de evasão só podem ser usadas no turno de defesa e servem para evitar algum ataque direto, escapando do mesmo.</p>

                      <h4>GRD (Guard)</h4>
                      <p>As cartas de guarda comportam-se exatamente como as cartas de EVD. A única diferença é a natureza da defesa que faz ela não ser tão eficiente quanto uma evasão, bloqueando apenas parte do ataque, na maioria das vezes.</p>

                      <h4>DOM (Domain)</h4>
                      <p>As cartas de domínio são Spells que se mantém durante todo o jogo. Esta carta altera a dinâmica do combate com uma regra única que só será alterada caso algum outro domínio o substitua.</p>
                    </div>
                    <div class="tab-pane fade" id="glossario">

                      <div class="table-responsive">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Description</th>
                              <th>Tradução</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>AP</td>
                              <td>Action Points</td>
                              <td>Pontos de Vida</td>
                            </tr>
                            <tr>
                              <td>Talent</td>
                              <td>Talent</td>
                              <td>Talento</td>
                            </tr>
                            <tr>
                              <td>Spell</td>
                              <td>Spell</td>
                              <td>Feitiço</td>
                            </tr>
                            <tr>
                              <td>Enchantment</td>
                              <td>Enchantment</td>
                              <td>Encantamento</td>
                            </tr>
                            <tr>
                              <td>ATK</td>
                              <td>Attack</td>
                              <td>Ataque Simples</td>
                            </tr>
                            <tr>
                              <td>TEC</td>
                              <td>Technique</td>
                              <td>Técnica</td>
                            </tr>
                            <tr>
                              <td>SKL</td>
                              <td>Skill</td>
                              <td>Habilidade</td>
                            </tr>
                            <tr>
                              <td>EVD</td>
                              <td>Evade</td>
                              <td>Evasão</td>
                            </tr>
                            <tr>
                              <td>GRD</td>
                              <td>Guard</td>
                              <td>Guarda</td>
                            </tr>
                            <tr>
                              <td>DOM</td>
                              <td>Domain</td>
                              <td>Domínio</td>
                            </tr>
                            <tr>
                              <td>S</td>
                              <td>Spiritual</td>
                              <td>Espiritual</td>
                            </tr>
                            <tr>
                              <td>M</td>
                              <td>Mundane</td>
                              <td>Mundano</td>
                            </tr>
                            <tr>
                              <td>U</td>
                              <td>Undead</td>
                              <td>Morto-vivo</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>`;
        documento.querySelector('#menu-content').innerHTML = htmlText;
    });
  }
}
