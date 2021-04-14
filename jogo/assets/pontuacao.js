var pontuacao;
var contadorObstaculo;
var exibePontuacao;
var gameOverExibePontuacao;

// Nessa funçao iremos busca a informação da pontuaçao do player, seu "score" no index, que inicialmente 
// estará como 0
function setupPontuacao() {
  pontuacao = 0;
  contadorObstaculo = new Set();
  exibePontuacao = document.getElementById('score');
  gameOverExibePontuacao = document.getElementById('game-score');
}
// Essa funçao é reponsavel por zerar a pontuação do player quando ele perde, ou seja, no game over
function zeraPontuacao() {
  exibePontuacao.setAttribute('value', '');
  gameOverExibePontuacao.setAttribute('value', pontuacao);
}
// Essa função incrementa a pontuação do player de acordo com o número de obstáculos que ele passa
function addPontuacaoParaObstaculo(obstaculo_id) {
  if (contadorObstaculo.has(obstaculo_id)) return;
  pontuacao = pontuacao + 1;
  contadorObstaculo.add(obstaculo_id);
}
// Essa função atualiza o valor da pontuação do player no index para ser exibido na tela
function atualizaExibePontuacao() {
  exibePontuacao.setAttribute('value', pontuacao);
}