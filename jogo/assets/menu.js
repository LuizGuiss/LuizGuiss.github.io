var menuStart;
var menuGameOver;
var menuContainer;
var isGameRunning = false;
var startButton;
var restartButton;

// Funções para deixar menus visiveis ou não
function ocultaEntity(el) {
  el.setAttribute('visible', false);
}

function exibeEntity(el) {
  el.setAttribute('visible', true);
}
// função para obter informações do index sobre todos os menus
function setupTodosMenus() {
  menuStart = document.getElementById('start-menu');
  menuGameOver = document.getElementById('game-over');
  menuContainer = document.getElementById('menu-container');
  startButton = document.getElementById('start-button');
  restartButton = document.getElementById('restart-button');
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);
  exibeStartMenu();
}
//função para ocultar todos os menus, durante o jogo
function ocultarTodosMenus() {
  ocultaEntity(menuContainer);
  startButton.classList.remove('clickable');
  restartButton.classList.remove('clickable');
}
//função para exibir menu de game over do jogo, restart
function exibirGameOverMenu() {
  exibeEntity(menuContainer);
  ocultaEntity(menuStart);
  exibeEntity(menuGameOver);
  startButton.classList.remove('clickable');
  restartButton.classList.add('clickable');
}
//função para exibir menu de Start do jogo
function exibeStartMenu() {
  exibeEntity(menuContainer);
  ocultaEntity(menuGameOver);
  exibeEntity(menuStart);
  startButton.classList.add('clickable');
  restartButton.classList.remove('clickable');
}