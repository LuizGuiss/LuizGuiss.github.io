var chapeu_vertex_posicao_b;
var chapeu_vertex_cor_b;
var Chapeu = 0;

function bufferPosChapeu() {
  chapeu_vertex_posicao_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, chapeu_vertex_posicao_b);

  vertices = [
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
  chapeu_vertex_posicao_b.itemSize = 3;
  chapeu_vertex_posicao_b.numItems = 12;
}

function bufferCorChapeu() {
  chapeu_vertex_cor_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, chapeu_vertex_cor_b);

  c1 = Math.random();
  c2 = Math.random();
  c3 = Math.random();
  cores = [];
  for (var i = 0; i < 12; i++) {
    cores = cores.concat([c1, c2, c3, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  chapeu_vertex_cor_b.itemSize = 4;
  chapeu_vertex_cor_b.numItems = 12;
}

function desenharChapeu() {
  var translation = vec3.create();
  vec3.set(translation, 0.1, 6.75, -8.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);
  gl.bindBuffer(gl.ARRAY_BUFFER, chapeu_vertex_posicao_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, chapeu_vertex_posicao_b.itemSize, gl.FLOAT, false, 0, 0);

  mat4.rotate(mMatrix, mMatrix, degToRad(Corpo), [0, 1, 0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, chapeu_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, chapeu_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, chapeu_vertex_posicao_b.numItems);
}