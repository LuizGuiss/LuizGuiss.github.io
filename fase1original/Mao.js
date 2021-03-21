var mao_vertex_position_b;
var mao_vertex_cor_b;
Mao = 0;

function bufferPosMao() {
  mao_vertex_position_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_position_b);

  var vertices = [
    // Frente
    0.0, -1.0, 0.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    // Direita
    0.0, -1.0, 0.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    // Trás
    0.0, -1.0, 0.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    // Esquerda
    0.0, -1.0, 0.0,
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  mao_vertex_position_b.itemSize = 3;
  mao_vertex_position_b.numItems = 12;
}

function bufferCorMao() {
  mao_vertex_cor_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_cor_b);

  cores = []
  for (var i = 0; i < 6; i++) {
    cores = cores.concat([0.5, 0.5, 1.0, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  mao_vertex_cor_b.itemSize = 4;
  mao_vertex_cor_b.numItems = 12;
}

function desenhaMaoDireita() {
  var translation = vec3.create();
  vec3.set(translation, 3.7, -0.5, -10.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);
  mat4.rotate(mMatrix, mMatrix, degToRad(Mao), [0, -1, 1]);

  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_position_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mao_vertex_position_b.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, mao_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLES, 0, mao_vertex_position_b.numItems);
  mPopMatrix();
}

function desenhaMaoEsquerda() {
  var translation = vec3.create();
  vec3.set(translation, -3.7, -0.5, -10.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);
  mat4.rotate(mMatrix, mMatrix, degToRad(Mao), [0, 1, -1]);

  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_position_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mao_vertex_position_b.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, mao_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, mao_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLES, 0, mao_vertex_position_b.numItems);
  mPopMatrix();
}

var ultimoMao = 0;
var testeMao = false;
function animarMao() {
  var agora = new Date().getTime();
  if (ultimoMao != 0) {
    //calculos para atualizar os ângulos
    var diferenca = agora - ultimoMao;
    if (testeMao == false) {
      Mao += ((90 * diferenca) / 1000.0) % 360.0;
    }
    if (testeMao == true) {
      Mao -= ((90 * diferenca) / 1000.0) % 360.0;
    }
  }
  ultimoMao = agora;
}