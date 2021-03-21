var cabecaQuadrada_vertex_posicao_b;
var cabecaQuadrada_vertex_cor_b;
var CabecaQuadrada = 0;

function bufferPosCabeca() {
  cabecaQuadrada_vertex_posicao_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cabecaQuadrada_vertex_posicao_b);

  vertices = [
    // Frente
    -1.5, -1.5, 1.5,
    1.5, -1.5, 1.5,
    1.5, 1.5, 1.5,
    -1.5, 1.5, 1.5,

    // Trás
    -1.5, -1.5, -1.5,
    -1.5, 1.5, -1.5,
    1.5, 1.5, -1.5,
    1.5, -1.5, -1.5,

    // Topo
    -1.5, 1.5, -1.5,
    -1.5, 1.5, 1.5,
    1.5, 1.5, 1.5,
    1.5, 1.5, -1.5,

    // Base
    -1.5, -1.5, -1.5,
    1.5, -1.5, -1.5,
    1.5, -1.5, 1.5,
    -1.5, -1.5, 1.5,

    // Direita
    1.5, -1.5, -1.5,
    1.5, 1.5, -1.5,
    1.5, 1.5, 1.5,
    1.5, -1.5, 1.5,

    // Esquerda
    -1.5, -1.5, -1.5,
    -1.5, -1.5, 1.5,
    -1.5, 1.5, 1.5,
    -1.5, 1.5, -1.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  cabecaQuadrada_vertex_posicao_b.itemSize = 3;
  cabecaQuadrada_vertex_posicao_b.numItems = 24;
}

function bufferCorCabeca() {
  cabecaQuadrada_vertex_cor_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cabecaQuadrada_vertex_cor_b);

  c1 = Math.random()
  c2 = Math.random()

  cores = [];
  for (var i = 0; i < 24; i++) {
    cores = cores.concat([c1, c2, c2, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  cabecaQuadrada_vertex_cor_b.itemSize = 4;
  cabecaQuadrada_vertex_cor_b.numItems = 24; 
}

function desenhar_cabecaQuadrada() {
  var translation = vec3.create();
  vec3.set(translation, -0.0, -3.5, -1.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);
  gl.bindBuffer(gl.ARRAY_BUFFER, cabecaQuadrada_vertex_posicao_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cabecaQuadrada_vertex_posicao_b.itemSize, gl.FLOAT, false, 0, 0);

  mat4.rotate(mMatrix, mMatrix, degToRad(Corpo), [0, 1, 0]);  

  gl.bindBuffer(gl.ARRAY_BUFFER, cabecaQuadrada_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cabecaQuadrada_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, cabecaQuadrada_vertex_posicao_b.numItems);
}