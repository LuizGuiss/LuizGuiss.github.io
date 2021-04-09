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

  if(position_index == 0) {
    position.x = POSITION_X_ESQUERDA;
  } else if(position_index == 1) {
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


//game

setupControls();