function fazTriangulo() {
  
  vPosTriangulo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosTriangulo);

  var verticesTrianguloChapeu = [
    0.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesTrianguloChapeu), gl.STATIC_DRAW);

  vPosTriangulo.itemSize = 3;
  vPosTriangulo.numItems = 3;


  vCorTrianguloChapeu = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorTrianguloChapeu);

  coresChapeu = []
  for (var i = 0; i < 3; i++) {
    coresChapeu = coresChapeu.concat([0.5, 0.8, 0.8, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coresChapeu), gl.STATIC_DRAW);

  vCorTrianguloChapeu.itemSize = 4;
  vCorTrianguloChapeu.numItems = 3;
}

function fazTrianguloC() {
  vPosTrianguloC = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosTrianguloC);

  var verticesTriangulo = [
    0.0, 2.0, 0.0,
    -2.0, -2.0, 0.0,
    2.0, -2.0, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesTriangulo), gl.STATIC_DRAW);

  vPosTrianguloC.itemSize = 3;
  vPosTrianguloC.numItems = 3;


  vCorTriangulo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorTriangulo);

  cores = []
  for (var i = 0; i < 3; i++) {
    cores = cores.concat([0.1, 0.1, 0.1, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  vCorTriangulo.itemSize = 4;
  vCorTriangulo.numItems = 3;
}

//mao direita
function fazTrianguloMD() {
  vPosTrianguloMD = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosTrianguloMD);
  //vertices do trinagulo da mao direita
  var verticesTMD = [
    -1.0, 0.5, -2.5,
    -0.4, -0.7, -2.5,
    1.0, 0.5, -2.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesTMD), gl.STATIC_DRAW); //cpu para gpu
  vPosTrianguloMD.itemSize = 3; // 3 vértices
  vPosTrianguloMD.numItems = 3; // 3 dimensões

  vCorTriangulo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorTriangulo);

  cores = []
  for (var i = 0; i < 3; i++) {
    cores = cores.concat([0.9, 0.9, 0.9, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  vCorTriangulo.itemSize = 4;
  vCorTriangulo.numItems = 3;
}

//mao esquerda
function fazTrianguloME() {
  vPosTrianguloME = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosTrianguloME);
  //vertices do triangulo da mao esquerda
  var verticesTME = [
    -1.0, 0.9, 0.0,
    0.4, -0.7, 0.0,
    1.0, 0.5, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesTME), gl.STATIC_DRAW); 
  vPosTrianguloME.itemSize = 3; // 3 vértices
  vPosTrianguloME.numItems = 3; // 3 dimensões

  vCorTriangulo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorTriangulo);

  cores = []
  for (var i = 0; i < 3; i++) {
    cores = cores.concat([0.5, 0.6, 0.6, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  vCorTriangulo.itemSize = 4;
  vCorTriangulo.numItems = 3;
}