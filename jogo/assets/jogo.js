var isGameRunning = false;
setupControls();
setupColisoes();
window.onload = function () {
  setupTodosMenus();
  setupPontuacao();
  setupObstaculos();
}
//função de start, dá inicio ao game, oculta os menus, cria os obstaculos e mostra pontuação incrementando
function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;
  setupPontuacao();
  atualizaExibePontuacao();
  addObstaculosRandomlyLoop();
  ocultarTodosMenus();
}
//função de game Over, finaliza a partida, mostra pontuação final, e apresenta botão de restart para reiniciar o jogo
function gameOver() {
  isGameRunning = false;
  if (pontuacao == 1) {
    alert('Game Over! Você fez ' + pontuacao + ' ponto.');
  } else {
    alert('Game Over! Você fez ' + pontuacao + ' pontos.');
  }
  zeraObstaculos();
  zeraPontuacao();
  exibirGameOverMenu();
}

// funcao para randomizar os obstaculos
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}