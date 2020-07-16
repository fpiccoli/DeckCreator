DeckCreator

Releases:

    1.13.2 (16/07/2020)
      - Melhorias visuais:
          - Decks agora são salvos com imagem de exibição para o TTS.
          - Decks salvos são carregas na posição correta no TTS.

    1.13.1 (03/07/2020)
      - Melhorias visuais:
          - Cartas aumentam de tamanho no editor ao serem focadas pelo cursor do mouse.
      - Correções de bugs:
          - Correções na exibição de decks públicos.

    1.13.0 (02/07/2020)
      - Novas Funcionalidades:
          - Cadastrar deck público e a possibilidade de importar decks públicos de outros usuários.

    1.12.3 (20/01/2020)
      - Melhorias visuais:
          - Textos informativos para tela de esqueci minha senha.
      - Correões de bugs:
          - Pequena alteração no envio de email.

    1.12.2 (14/01/2020)
      - Melhorias visuais:
          - Textos informativos para tela de registro e ativação.
      - Correões de bugs:
          - Correção no auto-updater.

    1.12.1 (13/01/2020)
      - Correões de bugs:
          - Correção no redirecionamento após registro.

    1.12.0 (12/01/2020)
      - Novas Funcionalidades:
          - Registro de usuário.
          - Esqueci minha senha.
          - Versionamento agora inserido pelo banco de dados.
          - Lançamento da primeira release oficial.

    1.11.2 (11/11/2019)
      - Correções de bugs:
          - Correção de falhas de vulnerabilidade.

    1.11.1 (07/11/2019)
      - Correções de bugs:
          - Correção dos botões de Sync Decks e Clean Cache que estavam com funcionalidades trocadas.
          - Agora imagens das cartas não podem ser arrastadas.

    1.11.0 (30/10/2019)
      - Novas Funcionalidades:
          - Implementação das funcionalidades beta após correções de bugs.
          - Todo o sistema agora foi traduzido para o inglês.

    1.10.5-beta (29/10/2019)
      - Correções de bugs:
          - Correções no menu da página editor.
          - Correções nos fundos das cartas MRBC.
          - Correções no botão Alterar Herói.

    1.10.4-beta (29/10/2019)
      - Correções de bugs:
          - Correções na contagem de cartas na listagem de decks.

    1.10.3-beta (23/10/2019)
      - Novas Funcionalidades:
          - Possibilidade de criar decks para o jogo M&D e também MRBC.

    1.10.2 (16/10/2019)
      - Correção de bugs:
          - Correção das funções que dependiam de mensagens e que foram quebradas na atualização da versão do electron.
          - Refatoração dos ícones.

    1.10.1 (14/10/2019)
      - Correção de bugs:
          - Alteração no verificador de atualizações para mostrar o update com um ícone ao invés de exibir uma mensagem.
          - Correção no acesso ao banco.

    1.10.0 (11/10/2019)
      - Novas Funcionalidades:
          - Agora o aplicativo verifica se há atualizações e realiza o download automaticamente toda vez que for iniciado (Windows).

    1.9.1 (10/10/2019)
      - Correções de bugs:
          - Correção no botão de alterar nome do deck.

    1.9.0 (09/10/2019)
      - Novas Funcionalidades:
          - Agora é possível agrupar os deck similares, evitando confusão quando se tem muitos decks cadastrados.
      - Novas Classes:
          - Witch (Beta), com 14 cartas experimentais.
      - Cartas alteradas:
          - Wisdom (Spell): Retorna ao jogo com o efeito alterado.

    1.8.0 (02/10/2019)
      - Novas Funcionalidades:
          - Agora é possível usar a aplicação para criar decks no Linux.
      - Correções de bugs:
          - Refatoração do esquema de estrutura de pastas.

    1.7.2 (18/03/2019)
      - Correções de bugs:
          - Corrigido problema que ocorria nos decks importados pelo botão Importar Decks para o TTS.

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
          - Shaman (Classe híbrida): Removida.
          - Wisdom (Spell): Removida.
          - Replicate (Spell): Removida.
          - Hyperthmesia (Enchantment): Removida.
          - Aura of Valor (Enchantment): Removida.
          - Foresee (Spell): Transformada em uma nova carta do Oracle.
          - Bloodletting (Spell): Transformada em uma nova carta do Shaman.

    1.7.1-beta (27/02/2019)
      - Correções de bugs:
          - Corrigido o problema da página Novo Deck remover o cookie de sessão.
          - Corrigida busca de cartas não obter as cartas Spell/Enchantment/Talent com mais de uma página.

    1.7.0-beta (27/02/2019)
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
