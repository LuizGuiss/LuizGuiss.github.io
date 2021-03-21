function criandoRetanguloBoca() {
  retanguloBoca_02_vertex_position_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, retanguloBoca_02_vertex_position_b);

  var q_02_vertices = [
    0.08, 0.08, 0.0,
    -0.48, 0.08, 0.0,
    0.08, -0.0, 0.0,
    -0.48, -0.0, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(q_02_vertices), gl.STATIC_DRAW);

  retanguloBoca_02_vertex_position_b.itemSize = 3;
  retanguloBoca_02_vertex_position_b.numItems = 4;
}

function coresRetanguloBoca() {
  retanguloBoca_02_vertex_color_b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, retanguloBoca_02_vertex_color_b);

  cores = [];
  cores = cores.concat([1, 1, 1, 1.0]);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

  retanguloBoca_02_vertex_color_b.itemSize = 4;
  retanguloBoca_02_vertex_color_b.numItems = 4;
}

function desenharRetanguloBoca() {
  var translation = vec3.create();
  vec3.set(translation, 0.11, -4.42, 1.0);
  mPushMatrix();

  mat4.translate(mMatrix, mMatrix, translation);
  mat4.rotate(mMatrix, mMatrix, degToRad(Corpo), [0, 1, 0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, retanguloBoca_02_vertex_position_b);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, retanguloBoca_02_vertex_position_b.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, retanguloBoca_02_vertex_color_b);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, retanguloBoca_02_vertex_color_b.itemSize, gl.FLOAT, false, 0, 0);

  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, retanguloBoca_02_vertex_position_b.numItems);
  mPopMatrix()
}

var ultimoBoca = 0;
var testeBoca = false;
function animar_boca() {
  var agora = new Date().getTime();
  if (ultimoBoca != 0) {
    //calculos para atualizar os ângulos
    var diferenca = agora - ultimoBoca;
    if (testeBoca == false) {
      Boca += ((90 * diferenca) / 1000.0) % 360.0;
    }
    if (testeBoca == true) {
      Boca -= ((90 * diferenca) / 1000.0) % 360.0;
    }
    if (Boca >= 40) {
      testeBoca = true;
    }
    if (Boca <= -10) {
      testeBoca = false;
    }
  }
  ultimoBoca = agora;
}