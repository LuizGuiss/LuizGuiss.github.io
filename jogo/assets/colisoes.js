const POSICAO_SEM_VISAO = 1;
const POSICAO_INICIO_DE_LINHA = 0.6;
const POSICAO_FINAL_DE_LINHA = 0.7;
// Essa função determina se o player colidiu ou não com algum obstáculo
// Será feito da seguinte maneira, pegaremos as informações do obstaculo, se o obstaculo estiver fora de visao
// entao ele não poderá colidir com o player, entao removemos esse obstaculo da verificação
// depois verificamos se o jogo está em execuçao, se nao houver a verificação para, após verificar que 
// o jogo esta sendo executado, verificamos se o player e o obstaculo compartilham a mesma posiçao, se sim
// chamamos a funçao gameOver
function setupColisoes() {
  AFRAME.registerComponent('player', {
    tick: function () {
      document.querySelectorAll('.obstaculo').forEach(function (obstaculo) {
        position = obstaculo.getAttribute('position');
        obstaculo_position_index = obstaculo.getAttribute('data-obstaculo-position-index');
        obstaculo_id = obstaculo.getAttribute('id');
        if (position.z > POSICAO_SEM_VISAO) {
          removeObstaculo(obstaculo);
        }
        if (!isGameRunning) return;
        if (POSICAO_INICIO_DE_LINHA < position.z && position.z < POSICAO_FINAL_DE_LINHA
          && obstaculo_position_index == player_position_index) {
          gameOver();
        }
        if (position.z > POSICAO_FINAL_DE_LINHA) {
          addPontuacaoParaObstaculo(obstaculo_id);
          atualizaExibePontuacao();
        }
      })
    }
  })
}