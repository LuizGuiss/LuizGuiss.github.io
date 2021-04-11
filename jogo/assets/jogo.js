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




//arvores

var templateTreeLeft;
var templateTreeCenter;
var templateTreeRight;

var treeContainer;
var numberOfTrees = 0;

var templates;

function setupTrees() {
  templateTreeLeft = document.getElementById('template-tree-left');
  templateTreeCenter = document.getElementById('template-tree-center');
  templateTreeRight = document.getElementById('template-tree-right');
  treeContainer = document.getElementById('tree-container');

  templates = [templateTreeLeft, templateTreeCenter, templateTreeRight];

  removeTree(templateTreeLeft);
  removeTree(templateTreeCenter);
  removeTree(templateTreeRight);
}

function removeTree(tree) {
  tree.parentNode.removeChild(tree);
}

function addTree(el) {
  numberOfTrees += 1;
  el.id = 'tree-' + numberOfTrees;
  treeContainer.appendChild(el);
}

function addTreeTo(position_index) {
  var template = templates[position_index];
  addTree(template.cloneNode(true));
}

function addTreesRandomly(
  {
    probTreeLeft = 0.5,
    probTreeCenter = 0.5,
    probTreeRight = 0.5,
    maxNumberTrees = 2
  } = {}) {
    var trees = [
      {probability: probTreeLeft, position_index: 0},
      {probability: probTreeCenter, position_index: 1},
      {probability: probTreeRight, position_index: 2},
    ];
    shuffle(trees);

    var numberOfTreesAdded = 0;
    trees.forEach(function (tree) {
      if(Math.random() < tree.probability && numberOfTreesAdded < maxNumberTrees) {
        addTreeTo(tree.position_index);
        numberOfTreesAdded += 1;
      }
    }); 

    return numberOfTreesAdded;
  }

  var treeTimer;

  function teardownnTrees() {
    clearInterval(treeTimer);
  }

  function addTreesRandomlyLoop({intervalLength = 750} = {}) {
    treeTimer = setInterval(addTreesRandomly, intervalLength);
  }

//game

setupControls();

window.onload = function () {
  setupTrees();

  addTreesRandomlyLoop();
}


// utilities

function shuffle(a) {
  var j, x, i;
  for(i = a.length -1; i > 0; i --){
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}