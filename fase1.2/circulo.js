function fazCirculo() {
  vPosCirculo = gl.createBuffer(); //vertice do circulo
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosCirculo);

  var verticeCiruclo = [];

  for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / 50) {
    verticeCiruclo.push(Math.cos(i) * 3, Math.sin(i) * 3, 0);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeCiruclo), gl.STATIC_DRAW);

  vPosCirculo.itemSize = 3;
  vPosCirculo.numItems = 50;

  //COR
  vCorCirculo = gl.createBuffer(); //cores
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorCirculo);

  cores = []
  for (var i = 0; i < 100; i++) {
    cores = cores.concat([0.3, 0.3, 0.3, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  vCorCirculo.itemSize = 4;
  vCorCirculo.numItems = 50;
}

function fazCirculoOlhos() {
  vPosCirculoOlhos = gl.createBuffer(); //vertice do circulo
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosCirculoOlhos);

  var verticeCirculoOlhos = [];

  for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / 50) {
    verticeCirculoOlhos.push(Math.cos(i) * 0.3, Math.sin(i) * 0.2, 0);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeCirculoOlhos), gl.STATIC_DRAW);

  vPosCirculoOlhos.itemSize = 3;
  vPosCirculoOlhos.numItems = 50;

  //COR
  vCorCirculoOlhos = gl.createBuffer(); //cores
  gl.bindBuffer(gl.ARRAY_BUFFER, vCorCirculoOlhos);

  coresOlhos = []
  for (var i = 0; i < 5; i++) {
    coresOlhos = coresOlhos.concat([1.0, 1.0, 1.0, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coresOlhos), gl.STATIC_DRAW);

  vCorCirculoOlhos.itemSize = 4;
  vCorCirculoOlhos.numItems = 50;
}