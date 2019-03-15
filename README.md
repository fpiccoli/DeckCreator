
  _____            _     _____                _             
 |  __ \          | |   / ____|              | |            
 | |  | | ___  ___| | _| |     _ __ ___  __ _| |_ ___  _ __
 | |  | |/ _ \/ __| |/ / |    | '__/ _ \/ _` | __/ _ \| '__|
 | |__| |  __/ (__|   <| |____| | |  __/ (_| | || (_) | |   
 |_____/ \___|\___|_|\_\\_____|_|  \___|\__,_|\__\___/|_|   


Releases:

    1.7.1 (15/03/2019)
      - Correções de bugs:
          - Listagens de Decks e Efeitos voltaram a serem exibidas em ordem alfabética.
          - Os alertas de confirmação de cadastros de decks voltaram a serem exibidos.
          - Corrigido problema que permitia um usuário cadastrar um deck por cima do deck de outro usuário caso estivessem com o mesmo nome.

    1.7.0 (12/03/2019)
      - Novas Funcionalidades:
          - Agora é possível importar todos os decks que já estiverem cadastrados no seu usuário para a máquina local (pasta do TTS).
      - Novas Classes:
          - Oracle (Beta), com 14 cartas experimentais.
          - Shaman (Beta), com 14 cartas experimentais.
      - Correções de bugs:
          - Corrigido o login sendo Case Sensitive.
          - Corrigido o login que agora aceita a tecla Enter no lugar de clicar no botão de conectar.
          - Corrigido o botão Limpar Cache do TTS não estar funcionando.
      - Cartas alteradas:
          - Shaman (Classe híbrida): Removida provisoriamente.
          - Wisdom (Spell): Removida provisoriamente.
          - Replicate (Spell): Removida provisoriamente.
          - Hyperthmesia (Enchantment): Removida provisoriamente.
          - Aura of Valor (Enchantment): Removida provisoriamente.
          - Foresee (Spell): Transformada em uma nova carta do Oracle.
          - Bloodletting (Spell): Transformada em uma nova carta do Shaman.

    1.7.1b (27/02/2019)
      - Correções de bugs:
          - Corrigido o problema da página Novo Deck remover o cookie de sessão.
          - Corrigida busca de cartas não obter as cartas Spell/Enchantment/Talent com mais de uma página.

    1.7.0b (27/02/2019)
      - Novas Funcionalidades:
          - Migração do Banco de Dados para a nuvem fazendo com que os decks agora não fiquem apenas salvos na máquina local do usuário.
          - Página de login para que os decks sejam vinculados ao seu usuário.
      - Cartas alteradas:
          - Final Breath (Talent): Função alterada (Uso original).

    1.6.1 (02/12/2018)
      - Correções de bugs:
          - Corrigido problema de não aparecerem Spell/Talents defensivos.

    1.6.0 (02/12/2018)
      - Novas Funcionalidades:
          - Ver todas as cartas inseridas no deck (independente da classe escolhida) e removê-las.
          - Salvar Deck Experimental com mais ou menos do que 50 cartas.
          - Página Sobre.
      - Novas Classes:
          - Blacksmith (Beta), com 14 cartas experimentais.
          - Ninja (Beta), com 14 cartas experimentais.
      - Correções de bugs:
          - Agora ao salvar um deck ele permanece corretamente no editor para fazer alterações.
          - Ao excluir um deck, a lista de decks será recarregada corretamente.
          - Refatoração de código.

    1.5.0 (26/11/2018)
      - Novas Funcionalidades:
          - Homepage com FAQ e helpdesk.
      - Melhorias visuais:
          - Novos ícones no menu principal.
          - Melhoria na descrição dos efeitos para os iniciantes com exemplos mais descritivos.

    1.4.0 (25/11/2018)
      - Novas Funcionalidades:
          - Alterar nome do deck.
      - Correções de bugs:
          - Agora a contagem de Enchantments do Deck aparece correta na listagem.
      - Cartas alteradas:
          - Wisdom (Spell): Função alterada novamente (Novo efeito Search).
          - Paralyze (Spell): Função alterada (Afeta todos).
          - Cleansing (Spell): Função alterada (Afeta todos).
          - Replicate (Spell): Nova carta.
          - Clumsiness (Enchantment): Diminuição do custo.
          - Hyperthmesia (Enchantment): Diminuição do efeito.
          - Adrenaline Rush (Berserker): Diminuição do custo.
          - Detect Magic (Warlock): Diminuição do custo.

    1.3.1 (21/11/2018)
      - Correções de bugs:
          - Refatoração de código.

    1.3.0 (21/11/2018)
      - Novas Funcionalidades:
          - Lista de efeitos das cartas.
          - Página com as regras do jogo.

    1.2.0 (19/11/2018)
      - Novas Funcionalidades:
          - Excluir Deck.
          - Limpar Cache do Tabletop Simulator.
      - Melhorias visuais:
          - Mensagens de Sucesso/Aviso.
          - Novos selos em cartas novas ou que foram alteradas recentemente.
          - Agora aparece o tipo da classe ao lado do nome do herói (M/S/U).
      - Cartas alteradas:
          - Knowledge (Talent): Texto corrigido.
          - Wisdom (Spell): Função alterada (Ainda em avaliação).
          - Squeeze (Beast): Nome alterado para Strangle.
      - Correções de bugs:
          - Imagens de híbridos agora aparecem corretamente ao carregar deck.
          - Imagens de híbridos agora aparecem corretamente no menu de decks.


Fonte: http://semver.org/lang/pt-BR/
