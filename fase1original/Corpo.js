var corpoVertexPositionBuffer;
var corpoVertexColorBuffer;
var Corpo = 0;

function bufferPosCorpo() {
  corpoVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, corpoVertexPositionBuffer);

  var vertices = [
    // Frente
    0.0, 1.0, 0.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    // Direita
    0.0, 1.0, 0.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    // Trás
    0.0, 1.0, 0.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    // Esquerda
    0.0, 1.0, 0.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  corpoVertexPositionBuffer.itemSize = 3;
  corpoVertexPositionBuffer.numItems = 12;
}

function bufferCorCorpo() {
  corpoVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, corpoVertexColorBuffer);

  cores = [];
  for (var i = 0; i < 12; i++) {
    cores = cores.concat([0.5, 0.5, 0.5, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  corpoVertexColorBuffer.itemSize = 4;
  corpoVertexColorBuffer.numItems = 12;
}

function desenhaCorpo() {
  var translation = vec3.create();
  vec3.set(translation, 0.0, -1.0, -7.0);
  mat4.translate(mMatrix, mMatrix, translation);

  mPushMatrix();
  mat4.rotate(mMatrix, mMatrix, degToRad(Corpo), [1, -1, 0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, corpoVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, corpoVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, corpoVertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, corpoVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLES, 0, corpoVertexPositionBuffer.numItems);

  mPopMatrix();
}

var ultimo = 0;
var teste = false;
function animarCorpo() {
  var agora = new Date().getTime();
  if (ultimo != 0) {
    //calculos para atualizar os ângulos
    var diferenca = agora - ultimo;
    if (teste == false) {
      Corpo += ((90 * diferenca) / 1000.0) % 360.0;
    }
    if (teste == true) {
      Corpo -= ((90 * diferenca) / 1000.0) % 360.0;
    }
    if (Corpo >= 40) {
      teste = true;
    }
    if (Corpo <= -10) {
      teste = false;
    }
  }
  ultimo = agora;
}