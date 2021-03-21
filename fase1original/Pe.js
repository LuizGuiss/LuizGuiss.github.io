var pe_vertex_posicao_b;
var pe_vertex_cor_b;

function bufferPosPe() {
  pe_vertex_posicao_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_posicao_b);

  vertices = [
    // Frente
    0.0, -0.3, 0.3,
    0.3, -0.3, 0.3,
    0.3, 0.3, 0.3,
    0.0, 0.3, 0.3,

    // Trás
    0.0, -0.3, -0.3,
    0.0, 0.3, -0.3,
    0.3, 0.3, -0.3,
    0.3, -0.3, -0.3,

    // Topo
    0.0, 0.3, -0.3,
    0.0, 0.3, 0.3,
    0.3, 0.3, 0.3,
    0.3, 0.3, -0.3,

    // Base
    0.0, -0.3, -0.3,
    0.3, -0.3, -0.3,
    0.3, -0.3, 0.3,
    0.0, -0.3, 0.3,

    // Direita
    0.3, -0.3, -0.3,
    0.3, 0.3, -0.3,
    0.3, 0.3, 0.3,
    0.3, -0.3, 0.3,

    // Esquerda
    -0.0, -0.3, -0.3,
    -0.0, -0.3, 0.3,
    -0.0, 0.3, 0.3,
    -0.0, 0.3, -0.3,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  pe_vertex_posicao_b.itemSize = 3;
  pe_vertex_posicao_b.numItems = 24;
}

function bufferCorPeDir() {
  pe_vertex_cor_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_cor_b);

  var cores = corPes();

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  pe_vertex_cor_b.itemSize = 4;
  pe_vertex_cor_b.numItems = 24;
}

function bufferCorPeEsq() {
  pe_vertex_cor_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_cor_b);

  var cores = corPes();

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);
  pe_vertex_cor_b.itemSize = 4;
  pe_vertex_cor_b.numItems = 24;
}

//função para dar cor aos pés
function corPes() {
  cores = [];
  c1 = Math.random();
  c2 = Math.random();
  c3 = Math.random();
  for (var i = 0; i < 24; i++) {
    cores = cores.concat([c1, c2, c3, 1.0]);
  }

  return cores;
}

var dDireito = 0;
function desenharPeDireito() {
  var translation = vec3.create();
  vec3.set(translation, 0.6 + dDireito, -1.5, 1);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);


  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_posicao_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pe_vertex_posicao_b.itemSize, gl.FLOAT, false, 0, 0);


  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pe_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);


  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, pe_vertex_posicao_b.numItems);
  mPopMatrix();
}

var dEsquerdo = 0;
function desenharPeEsquerdo() {
  var translation = vec3.create();
  vec3.set(translation, -0.6 - dEsquerdo, -1.5, 1);

  mPushMatrix();

  mat4.translate(mMatrix, mMatrix, translation);
  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_posicao_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pe_vertex_posicao_b.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, pe_vertex_cor_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pe_vertex_cor_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, pe_vertex_posicao_b.numItems);
  mPopMatrix();
}

ultimoPe = 0;
PeEsquerdo = false;
function animarPeEsquerdo() {
  var agora = new Date().getTime();
  if (ultimoPe != 0) {
    //calculos para atualizar os ângulos
    var diferenca = agora - ultimoPe;
    if (PeEsquerdo == false) {
      dEsquerdo += ((50 * diferenca) / 100000.0);
    }
    if (PeEsquerdo == true) {
      dEsquerdo -= ((50 * diferenca) / 100000.0);
    }
    if (Corpo >= 40) {
      PeEsquerdo = true;
    }
    if (Corpo <= -10) {
      PeEsquerdo = false;
    }
  }
  ultimoPe = agora;
}

ultimoPeEsq = 0;
PeDireito = false;
function animarPeDireito() {
  var agora = new Date().getTime();
  if (ultimoPeEsq != 0) {
    //calculos para atualizar os ângulos
    var diferenca = agora -ultimoPeEsq;
    if (PeDireito == false) {
      dDireito += ((50 * diferenca) / 100000.0);
    }
    if (PeDireito == true) {
      dDireito -= ((50 * diferenca) / 100000.0);
    }
    if (Corpo >= 40) {
      PeDireito = true;
    }
    if (Corpo <= -10) {
      PeDireito = false;
    }
  }
  ultimoPeEsq = agora;
}