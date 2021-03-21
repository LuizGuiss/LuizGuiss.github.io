function fazQuadrado() {
  vPosQuadrado = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosQuadrado);

  var verticeQuadradoPe = [
    1.0, 1.0, 0.0,
    -0.7, 1.0, 0.0,
    1.0, -3.0, 0.0,
    -0.7, -3.0, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeQuadradoPe), gl.STATIC_DRAW);

  vPosQuadrado.itemSize = 3;
  vPosQuadrado.numItems = 4;

  //COR
  vCorQuadrado = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorQuadrado);
  
  cores = []
  for (var i = 0; i < 4; i++) {
    cores = cores.concat([0.8, 0.8, 0.8, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  vCorQuadrado.itemSize = 4;
  vCorQuadrado.numItems = 4;
}

function fazQuadradoBoca() {
  vPosQuadradoBoca = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosQuadradoBoca);

  var verticeQuadradoBoca = [
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    1.0, 0.9, 0.0,
    0.0, 0.9, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeQuadradoBoca), gl.STATIC_DRAW);

  vPosQuadradoBoca.itemSize = 3;
  vPosQuadradoBoca.numItems = 4;

  //COR
  vCorQuadradoBoca = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorQuadradoBoca);

  coresB = []
  for (var i = 0; i < 4; i++) {
    coresB = coresB.concat([1, 1, 1, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coresB), gl.STATIC_DRAW);

  vCorQuadrado.itemSize = 4;
  vCorQuadrado.numItems = 4;
}