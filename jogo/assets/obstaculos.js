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