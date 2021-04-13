const POSITION_X_ESQUERDA = -0.5;
const POSITION_X_DIREITA = 0.5;
const POSITION_X_CENTRO = 0;
//controle
//0 esquerda
//1 centro
//2 direita
var player_position_index = 1;
function movePlayerTo(position_index) {
  player_position_index = position_index;
  var position = { x: 0, y: 0, z: 0 };
  if (position_index == 0) {
    position.x = POSITION_X_ESQUERDA;
  } else if (position_index == 1) {
    position.x = POSITION_X_CENTRO;
  } else {
    position.x = POSITION_X_DIREITA;
  }
  document.getElementById('player').setAttribute('position', position);
}
function setupControls() {
  AFRAME.registerComponent('lane-controls', {
    tick: function (time, timeDelta) {
      var rotation = this.el.object3D.rotation;
      if (rotation.y > 0.1) {
        movePlayerTo(0);
      } else if (rotation.y < -0.1) {
        movePlayerTo(2);
      } else {
        movePlayerTo(1);
      }
    }
  });
}
//obstaculos
var templateObstaculoEsquerda;
var templateObstaculoCentro;
var templateObstaculoDireita;
var obstaculoContainer;
var numeroDeObstaculos = 0;
var templates;

// pego o modelo dos obstaculos criados no index 
function setupObstaculos() {
  templateObstaculoEsquerda = document.getElementById('template-obstaculo-esquerda');
  templateObstaculoCentro = document.getElementById('template-obstaculo-centro');
  templateObstaculoDireita = document.getElementById('template-obstaculo-direita');
  obstaculoContainer = document.getElementById('obstaculo-container');
  templates = [templateObstaculoEsquerda, templateObstaculoCentro, templateObstaculoDireita];
  removeObstaculo(templateObstaculoEsquerda);
  removeObstaculo(templateObstaculoCentro);
  removeObstaculo(templateObstaculoDireita);
}

function removeObstaculo(obstaculo) {
  obstaculo.parentNode.removeChild(obstaculo);
}

function addObstaculo(el) {
  numeroDeObstaculos += 1;
  el.id = 'obstaculo-' + numeroDeObstaculos;
  obstaculoContainer.appendChild(el);
}

//essa função adiciona obstaculo em uma das pistas especificas
function addObstaculoTo(position_index) {
  var template = templates[position_index];
  addObstaculo(template.cloneNode(true));
}

// adiciono os obstáculos de forma aleatória na plataforma, lembrando que pelo menos uma das pistas tem que estar livre por vez
function addObstaculosRandomly(
  {
    probObstaculoEsquerda = 0.5,
    probObstaculoCentro = 0.5,
    probObstaculoDireita = 0.5,
    maxnumeroObstaculos = 2
  } = {}) {
  var obstaculos = [
    { probability: probObstaculoEsquerda, position_index: 0 },
    { probability: probObstaculoCentro, position_index: 1 },
    { probability: probObstaculoDireita, position_index: 2 },
  ];
  shuffle(obstaculos);
  var numeroDeObstaculosAdded = 0;
  obstaculos.forEach(function (obstaculo) {
    if (Math.random() < obstaculo.probability && numeroDeObstaculosAdded < maxnumeroObstaculos) {
      addObstaculoTo(obstaculo.position_index);
      numeroDeObstaculosAdded += 1;
    }
  });
  return numeroDeObstaculosAdded;
}
var obstaculoTimer;

function zeraObstaculos() {
  clearInterval(obstaculoTimer);
}

function addObstaculosRandomlyLoop({ intervalLength = 750 } = {}) {
  obstaculoTimer = setInterval(addObstaculosRandomly, intervalLength);
}
//colisões
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
//pontuação
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
//menu
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

//game
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
  if(pontuacao == 1) {
    alert('Game Over! Você fez '+pontuacao+' ponto.');
  } else{
    alert('Game Over! Você fez '+pontuacao+ ' pontos.');
  }
  zeraObstaculos();
  zeraPontuacao();
  exibirGameOverMenu();
}
// utilitários
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
