/**
 * Matrix3.js defines the 3x3 matrix.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

/**
 * The matrix is construted as below:
 *
 *  | ma11 ma12 ma13 | 
 *  | ma21 ma22 ma23 |
 *  | ma31 ma32 ma33 |
 *
 * The storage is shown as below:
 *
 *  | element[0]   element[1]   element[2] |
 *  | element[3]   element[4]   element[5] |
 *  | element[6]   element[7]   element[9] |
 *  
 */

CHRYSICS.Matrix3 = function(
  a11, a12, a13, a21, a22, a23, a31, a32, a33) {

  this.elements = new Float32Array(9);

  this.set(
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33
  );

}

CHRYSICS.Matrix3.prototype = {

  $: function(i, j) {

    return this.elements[i * 3 + j];
  
  },

  $$: function(i, j, e) {

    this.elements[i * 3 + j] = e;
  
  },

  set: function(
    a11, a12, a13, 
    a21, a22, a23, 
    a31, a32, a33
  ) {

    var m = this.elements;

    m[0] = a11, m[1] = a12, m[2] = a13;
    m[3] = a21, m[4] = a22, m[5] = a23;
    m[6] = a31, m[7] = a32, m[8] = a33;
  
  },

  setOrientation: function(q) {

    var m = this.elements;
    var w = q.w, x = q.x, y = q.y, z = q.z;

    var xw = x*w*2, xy = x*y*2, xz = x*z*2,
        yw = y*w*2, yz = y*z*2, zw = z*w*2,
        xx = x*x*2, yy = y*y*2, zz = z*z*2;

    m[1] = xy + zw; 
    m[2] = xz - yw;
    m[3] = xy - zw;  
    m[5] = yz + xw;
    m[6] = xz + yw; 
    m[7] = yz - xw; 
    m[0] = 1 - yy - zz;
    m[4] = 1 - xx - zz;
    m[8] = 1 - xx - yy;

  },

  identity: function() {

    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
  
  },

  add: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    return new CHRYSICS.Matrix3(
      ma[0] + mb[0], ma[1] + mb[1], ma[2] + mb[2],
      ma[3] + mb[3], ma[4] + mb[4], ma[5] + mb[5],
      ma[6] + mb[6], ma[7] + mb[7], ma[8] + mb[8]
    );
  
  },

  addMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    ma[0] += mb[0], ma[1] += mb[1], ma[2] += mb[2];
    ma[3] += mb[3], ma[4] += mb[4], ma[5] += mb[5];
    ma[6] += mb[6], ma[7] += mb[7], ma[8] += mb[8];
  
  },

  mulScalar: function(s) {

    var m = this.elements;

    return new CHRYSICS.Matrix3(
      m[0] * s, m[1] * s, m[2] * s,
      m[3] * s, m[4] * s, m[5] * s,
      m[6] * s, m[7] * s, m[8] * s
    );
  
  },

  mulMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    var ma11 = ma[0], ma12 = ma[1], ma13 = ma[2],
        ma21 = ma[3], ma22 = ma[4], ma23 = ma[5],
        ma31 = ma[6], ma32 = ma[7], ma33 = ma[8];

    var mb11 = mb[0], mb12 = mb[1], mb13 = mb[2],
        mb21 = mb[3], mb22 = mb[4], mb23 = mb[5],
        mb31 = mb[6], mb32 = mb[7], mb33 = mb[8];

    return new CHRYSICS.Matrix3(
      ma11*mb11 + ma12*mb21 + ma13*mb31,
      ma11*mb12 + ma12*mb22 + ma13*mb32,
      ma11*mb13 + ma12*mb23 + ma13*mb33,

      ma21*mb11 + ma22*mb21 + ma23*mb31,
      ma21*mb12 + ma22*mb22 + ma23*mb32,
      ma21*mb13 + ma22*mb23 + ma23*mb33,

      ma31*mb11 + ma32*mb21 + ma33*mb31,
      ma31*mb12 + ma32*mb22 + ma33*mb32,
      ma31*mb13 + ma32*mb23 + ma33*mb33
    );

  },

  mulVector3: function(v) {

    var m = this.elements;

    return new CHRYSICS.Vector3(
      v.x*m[0] + v.y*m[1] + v.z*m[2],
      v.x*m[3] + v.y*m[4] + v.z*m[5],
      v.x*m[6] + v.y*m[7] + v.z*m[8]
    );
  
  },

  determinant: function() {

    var m = this.elements;
    var m11 = m[0], m12 = m[1], m13 = m[2],
        m21 = m[3], m22 = m[4], m23 = m[5],
        m31 = m[6], m32 = m[7], m33 = m[8];

    return m11*m22*m33 + m21*m32*m13 + m31*m12*m23 -
           m11*m32*m23 - m31*m22*m13 - m21*m12*m33;
  
  },

  transpose: function() {
  
    var es = this.elements;

    return new CHRYSICS.Matrix3(
      es[0], es[3], es[6],
      es[1], es[4], es[7],
      es[2], es[5], es[8]
    );

  },

  transposeSelf: function() {
  
    var tmp;
    var es = this.elements;

    tmp = es[1], es[1] = es[3], es[3] = tmp;
    tmp = es[2], es[2] = es[6], es[6] = tmp;
    tmp = es[5], es[5] = es[7], es[7] = tmp;

    return this;

  },

  inverse: function() {

    var m = this.elements;
    var m11 = m[0], m12 = m[1], m13 = m[2],
        m21 = m[3], m22 = m[4], m23 = m[5],
        m31 = m[6], m32 = m[7], m33 = m[8];

    var det = this.determinant();

    if (det == 0)
      return;

    return (new CHRYSICS.Matrix3(
      m22*m33 - m23*m32, m13*m32 - m12*m33, m12*m23 - m13*m22,
      m23*m31 - m21*m33, m11*m33 - m13*m31, m13*m21 - m11*m23,
      m21*m32 - m22*m31, m12*m31 - m11*m32, m11*m22 - m12*m21
    )).mulScalar(1 / det);
 
  },

  abs: function() {
  
    var es = this.elements;

    for (var i = 0; i < es.length; ++i)
      if (es[i] < 0)
        es[i] = Math.abs(es[i]);
  
  },

  setFromAxisAngle: function(axis, angle) {

    var x = axis.x,
        y = axis.y,
        z = axis.z,
        c = Math.cos(angle),
        s = Math.sin(angle),
        t = 1 - c;

    var xy = x*y,
        xz = x*z,
        yz = y*z;

    this.set(
      x*x*t + c,  xy*t - z*s, xz*t + y*s,
      xy*t + z*s, y*y*t + c,  yz*t - x*s,
      xz*t - y*s, yz*t + x*s, z*z*t + c
    );
  
  },

  log: function() {
  
    var es = this.elements;

    console.log(
      es[0] + '\t' + es[1] + '\t' + es[2] + '\n' +
      es[3] + '\t' + es[4] + '\t' + es[5] + '\n' +
      es[6] + '\t' + es[7] + '\t' + es[8] + '\n'
    );
  
  }


}

/**
 * 2-by-2 Symmetric Schur decomposition. Given and n-by-n symmetric matrix
 * and indices p, q such that 1 <= p < q <= n, computes a sine-cosine pair
 * (s, c) such that if B = Transpose(J(p, q, theta)) A J(p, q, theta), then
 * b_pq = b_qp = 0.
 *
 * See Golub, Van Loan, Matrix Computations, 3rd ed, p428.
 */
CHRYSICS.Matrix3.SymmetricSchur2 = function(m3, p, q) {

  var c, s, t;

  if (Math.abs(m3.$(p, q)) > CHRYSICS.Const.ZERO) {

    r = (m3.$(q, q) - m3.$(p, p)) / (2.0 * m3.$(p, q));

    if (CHRYSICS.Utils.gteZero(r))
      t = 1.0 / (r + Math.sqrt(1.0 + r*r));
    else
      t = -1.0 / (-r + Math.sqrt(1.0 + r*r));

    c = 1.0 / Math.sqrt(1.0 + t*t);
    s = t * c;
  
  } else {

    c = 1.0;
    s = 0.0;
  
  }

  return { sin: s, cos: c };

}

/**
 * Computes the eigenvectors and eigenvalues of the symmetric matrix A using
 * the classic Jacobi method of iteratively updating A as A = J^T * A * J,
 * where J = J(p, q, theta) is the Jacobi rotation matrix.
 *
 * On exit, v will contain the eigenvectors, and the diagonal elements of a
 * are the corresponding eigenvalues.
 *
 * Specifically, the input matrix A here is 3x3.
 *
 * See Golub, Van Loan, Matrix Computations, 3rd ed, p428.
 */
CHRYSICS.Matrix3.Jacobi = function(A, max_iter) {

  var p, q;
  var preoff, rotation;

  var J = new CHRYSICS.Matrix3();
  var V = new CHRYSICS.Matrix3(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  );

  for (var n = 0; n < max_iter; ++n) {

    // Find the largest off-diagonal absolute element A[p][q].
    p = 0; q = 1;

    for (var i = 0; i < 3; ++i) {
      for (var j = 0; j < 3; ++j) {

        if (i == j) continue;
        if (Math.abs(A.$(i, j) > Math.abs(A.$(i, j)))) {
          p = i;
          q = j;
        }
      
      }
    }

    // Compute the Jacobi rotation matrix J(p, q, theta)
    rotation = CHRYSICS.Matrix3.SymmetricSchur2(A, p, q);
    J.identity();
    J.$$(p, p,  rotation.cos);
    J.$$(p, q,  rotation.sin);
    J.$$(q, p, -rotation.sin);
    J.$$(q, q,  rotation.cos);

    // Compute rotations into what will contain the eigenvectors.
    V = V.mulMatrix(J);    

    // Make A more diagonal, until just eigenvalues remain on diagonal.
    A = J.transpose().mulMatrix(A).mulMatrix(J);

    // Compute the norm of off-diagonal elements.
    var off = 0.0;

    for (var i = 0; i < 3; ++i) {
      for (var j = 0; j < 3; ++j) {
      
        if (i == j) continue;
        off += A.$(i, j) * A.$(i, j);
      
      }
    }

    // Stop when norm no longer decreasing.
    if (n > 2 && off >= prevoff)
      break;

    prevoff == off;
  
  }

  return { eigenValues: A, eigenVectors: V };

}
