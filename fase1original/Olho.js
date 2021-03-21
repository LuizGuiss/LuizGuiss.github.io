Olho = 0;

function criandoCirculoOlho(radius, nroVertices) {
  nroVerticesAux = nroVertices;

  olho_vertex_position_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_position_b);

  var olhoVertices = [];

  for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / nroVertices) {
    olhoVertices.push(Math.cos(i) * radius, Math.sin(i) * radius, 0);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(olhoVertices), gl.STATIC_DRAW);

  olho_vertex_position_b.itemSize = 3;
  olho_vertex_position_b.numItems = nroVertices;
}

function definindoCoresOlho() {
  olho_vertex_color_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_color_b);

  cores = []
  for (var i = 0; i < nroVerticesAux; i++) {
    cores = cores.concat([1, 1, 1, 1.0]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  olho_vertex_color_b.itemSize = 4;
  olho_vertex_color_b.numItems = nroVerticesAux;
}

function desenharOlhoDireito() {
  var translation = vec3.create();
  vec3.set(translation, 0.5, 0, 2.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);

  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_position_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, olho_vertex_position_b.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_color_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, olho_vertex_color_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_FAN, 0, olho_vertex_position_b.numItems);
  mPopMatrix()
}

function desenharOlhoEsquerdo() {
  var translation = vec3.create();
  vec3.set(translation, -0.5, 0, 2.0);

  mPushMatrix();
  mat4.translate(mMatrix, mMatrix, translation);

  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_position_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, olho_vertex_position_b.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, olho_vertex_color_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, olho_vertex_color_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_FAN, 0, olho_vertex_position_b.numItems);
  mPopMatrix()
}