/**
 * Matrix4.js defines the 4x4 matrix.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

/**
 * The matrix is construted as below:
 *
 *  | ma11 ma12 ma13 ma14 | 
 *  | ma21 ma22 ma23 ma24 |
 *  | ma31 ma32 ma33 ma34 |
 *  | ma41 ma42 ma43 ma44 |
 *
 * The storage is shown as below:
 *
 *  | element[ 0]   element[ 1]   element[ 2]   element[ 3] |
 *  | element[ 4]   element[ 5]   element[ 6]   element[ 7] |
 *  | element[ 8]   element[ 9]   element[10]   element[11] |
 *  | element[12]   element[13]   element[14]   element[15] |
 *  
 */

CHRYSICS.Matrix4 = function(
  a11, a12, a13, a14,
  a21, a22, a23, a24,
  a31, a32, a33, a34,
  a41, a42, a43, a44) {

  this.elements = new Float32Array(16);

  this.set(
    a11, a12, a13, a14,
    a21, a22, a23, a24,
    a31, a32, a33, a34,
    a41, a42, a43, a44
  );

}

CHRYSICS.Matrix4.prototype = {

  set: function(
    a11, a12, a13, a14,
    a21, a22, a23, a24,
    a31, a32, a33, a34,
    a41, a42, a43, a44
  ) {

    var m = this.elements;

    m[ 0] = a11, m[ 1] = a12, m[ 2] = a13, m[ 3] = a14;
    m[ 4] = a21, m[ 5] = a22, m[ 6] = a23, m[ 7] = a24;
    m[ 8] = a31, m[ 9] = a32, m[10] = a33, m[11] = a34;
    m[12] = a41, m[13] = a42, m[14] = a43, m[15] = a44;
  
  },

  setOrientationAndPosition: function(q, p) {

    var m = this.elements;
    var w = q.w, x = q.x, y = q.y, z = q.z;

    var xw = x*w*2, xy = x*y*2, xz = x*z*2,
        yw = y*w*2, yz = y*z*2, zw = z*w*2,
        xx = x*x*2, yy = y*y*2, zz = z*z*2;

    m[ 1] = xy + zw; 
    m[ 2] = xz - yw;
    m[ 4] = xy - zw;  
    m[ 6] = yz + xw;
    m[ 8] = xz + yw; 
    m[ 9] = yz - xw; 
    m[ 0] = 1 - yy - zz;
    m[ 5] = 1 - xx - zz;
    m[10] = 1 - xx - yy;

    m[3] = p.x, m[7] = p.y, m[11] = p.z;

  },

  identity: function() {

    this.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  
  },

  add: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    return new CHRYSICS.Matrix4(
      ma[ 0] + mb[ 0], ma[ 1] + mb[ 1], ma[ 2] + mb[ 2], ma[ 3] + mb[ 3],
      ma[ 4] + mb[ 4], ma[ 5] + mb[ 5], ma[ 6] + mb[ 6], ma[ 7] + mb[ 7],
      ma[ 8] + mb[ 8], ma[ 9] + mb[ 9], ma[10] + mb[10], ma[11] + mb[11],
      ma[12] + mb[12], ma[13] + mb[13], ma[14] + mb[14], ma[15] + mb[15]
    );
 
  },

  addMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    this.set(
      ma[ 0] + mb[ 0], ma[ 1] + mb[ 1], ma[ 2] + mb[ 2], ma[ 3] + mb[ 3],
      ma[ 4] + mb[ 4], ma[ 5] + mb[ 5], ma[ 6] + mb[ 6], ma[ 7] + mb[ 7],
      ma[ 8] + mb[ 8], ma[ 9] + mb[ 9], ma[10] + mb[10], ma[11] + mb[11],
      ma[12] + mb[12], ma[13] + mb[13], ma[14] + mb[14], ma[15] + mb[15]
    );
  
  },

  mulScalar: function(s) {
  
    var m = this.elements;

    return new CHRYSICS.Matrix4(
      m[ 0] * s, m[ 1] * s, m[ 2] * s, m[ 3] * s,
      m[ 4] * s, m[ 5] * s, m[ 6] * s, m[ 7] * s,
      m[ 8] * s, m[ 9] * s, m[10] * s, m[11] * s,
      m[12] * s, m[13] * s, m[14] * s, m[15] * s
    );
  
  },

  mulMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    var ma11 = ma[ 0], ma12 = ma[ 1], ma13 = ma[ 2], ma14 = ma[ 3],
        ma21 = ma[ 4], ma22 = ma[ 5], ma23 = ma[ 6], ma24 = ma[ 7],
        ma31 = ma[ 8], ma32 = ma[ 9], ma33 = ma[10], ma34 = ma[11],
        ma41 = ma[12], ma42 = ma[13], ma43 = ma[14], ma44 = ma[15];

    var mb11 = mb[ 0], mb12 = mb[ 1], mb13 = mb[ 2], mb14 = mb[ 3],
        mb21 = mb[ 4], mb22 = mb[ 5], mb23 = mb[ 6], mb24 = mb[ 7],
        mb31 = mb[ 8], mb32 = mb[ 9], mb33 = mb[10], mb34 = mb[11],
        mb41 = mb[12], mb42 = mb[13], mb43 = mb[14], mb44 = mb[15];

    return new CHRYSICS.Matrix4(

      ma11*mb11 + ma12*mb21 + ma13*mb31 + ma14*mb41,
      ma11*mb12 + ma12*mb22 + ma13*mb32 + ma14*mb42,
      ma11*mb13 + ma12*mb23 + ma13*mb33 + ma14*mb43,
      ma11*mb14 + ma12*mb24 + ma13*mb34 + ma14*mb44,

      ma21*mb11 + ma22*mb21 + ma23*mb31 + ma24*mb41,
      ma21*mb12 + ma22*mb22 + ma23*mb32 + ma24*mb42,
      ma21*mb13 + ma22*mb23 + ma23*mb33 + ma24*mb43,
      ma21*mb14 + ma22*mb24 + ma23*mb34 + ma24*mb44,

      ma31*mb11 + ma32*mb21 + ma33*mb31 + ma34*mb41,
      ma31*mb12 + ma32*mb22 + ma33*mb32 + ma34*mb42,
      ma31*mb13 + ma32*mb23 + ma33*mb33 + ma34*mb43,
      ma31*mb14 + ma32*mb24 + ma33*mb34 + ma34*mb44,

      ma41*mb11 + ma42*mb21 + ma43*mb31 + ma44*mb41,
      ma41*mb12 + ma42*mb22 + ma43*mb32 + ma44*mb42,
      ma41*mb13 + ma42*mb23 + ma43*mb33 + ma44*mb43,
      ma41*mb14 + ma42*mb24 + ma43*mb34 + ma44*mb44

    );

  },

  mulVector3: function(v) {

    var m = this.elements;

    return new CHRYSICS.Vector3(
      v.x*m[0] + v.y*m[1] + v.z*m[ 2] + m[ 3],
      v.x*m[4] + v.y*m[5] + v.z*m[ 6] + m[ 7],
      v.x*m[8] + v.y*m[9] + v.z*m[10] + m[11]
    );
  
  },

  /**
   * When the matrix is used to transform a normal vector, or direction
   * vector into the world coordinate from its local coordinate, then
   * no translation should be added.
   */
  transformDirection: function(n) {

    var m = this.elements;

    return new CHRYSICS.Vector3(
      v.x*m[0] + v.y*m[1] + v.z*m[ 2],
      v.x*m[4] + v.y*m[5] + v.z*m[ 6],
      v.x*m[8] + v.y*m[9] + v.z*m[10]
    );
  
  },

  transformInverseDirection: function(n) {
 
    var m = this.elements;

    return new CHRYSICS.Vector3(
      v.x*m[0] + v.y*m[4] + v.z*m[ 8],
      v.x*m[1] + v.y*m[5] + v.z*m[ 9],
      v.x*m[2] + v.y*m[6] + v.z*m[10]
    );
 
  },

  transpose: function() {
  
    var tmp;
    var es = this.elements;

    tmp = es[1], es[1] = es[4], es[4] = tmp;
    tmp = es[2], es[2] = es[8], es[8] = tmp;
    tmp = es[6], es[6] = es[9], es[9] = tmp;

    tmp = es[3],  es[3]  = es[12], es[12] = tmp;
    tmp = es[7],  es[7]  = es[13], es[13] = tmp;
    tmp = es[11], es[11] = es[14], es[14] = tmp;

    return this;

  },

  determinant: function() {

    var m = this.elements;
    var m11 = m[ 0], m12 = m[ 1], m13 = m[ 2], m14 = m[ 3],
        m21 = m[ 4], m22 = m[ 5], m23 = m[ 6], m24 = m[ 7],
        m31 = m[ 8], m32 = m[ 9], m33 = m[10], m34 = m[11],
        m41 = m[12], m42 = m[13], m43 = m[14], m44 = m[15];

    var det1 = m33*m44 - m34*m43,
        det2 = m32*m44 - m34*m42,
        det3 = m32*m43 - m33*m42,
        det4 = m31*m44 - m34*m41,
        det5 = m31*m43 - m33*m41,
        det6 = m31*m42 - m32*m41;

    return m11 * (m22*det1 - m23*det2 + m24*det3) -
           m12 * (m21*det1 - m23*det4 + m24*det5) +
           m13 * (m21*det2 - m22*det4 + m24*det6) -
           m14 * (m21*det3 - m22*det5 + m23*det6);
 
  },
  
  inverse: function() {

    var m = this.elements;
    var m11 = m[ 0], m12 = m[ 1], m13 = m[ 2], m14 = m[ 3],
        m21 = m[ 4], m22 = m[ 5], m23 = m[ 6], m24 = m[ 7],
        m31 = m[ 8], m32 = m[ 9], m33 = m[10], m34 = m[11],
        m41 = m[12], m42 = m[13], m43 = m[14], m44 = m[15];

    var det = this.determinant();

    if (det == 0)
      return;

    return (new CHRYSICS.Matrix4(

      m23*m34*m42 - m24*m33*m42 + m24*m32*m43 - m22*m34*m43 - m23*m32*m44 + m22*m33*m44,
      m14*m33*m42 - m13*m34*m42 - m14*m32*m43 + m12*m34*m43 + m13*m32*m44 - m12*m33*m44,
      m13*m24*m42 - m14*m23*m42 + m14*m22*m43 - m12*m24*m43 - m13*m22*m44 + m12*m23*m44,
      m14*m23*m32 - m13*m24*m32 - m14*m22*m33 + m12*m24*m33 + m13*m22*m34 - m12*m23*m34,

      m24*m33*m41 - m23*m34*m41 - m24*m31*m43 + m21*m34*m43 + m23*m31*m44 - m21*m33*m44,
      m13*m34*m41 - m14*m33*m41 + m14*m31*m43 - m11*m34*m43 - m13*m31*m44 + m11*m33*m44,
      m14*m23*m41 - m13*m24*m41 - m14*m21*m43 + m11*m24*m43 + m13*m21*m44 - m11*m23*m44,
      m13*m24*m31 - m14*m23*m31 + m14*m21*m33 - m11*m24*m33 - m13*m21*m34 + m11*m23*m34,

      m22*m34*m41 - m24*m32*m41 + m24*m31*m42 - m21*m34*m42 - m22*m31*m44 + m21*m32*m44,
      m14*m32*m41 - m12*m34*m41 - m14*m31*m42 + m11*m34*m42 + m12*m31*m44 - m11*m32*m44,
      m12*m24*m41 - m14*m22*m41 + m14*m21*m42 - m11*m24*m42 - m12*m21*m44 + m11*m22*m44,
      m14*m22*m31 - m12*m24*m31 - m14*m21*m32 + m11*m24*m32 + m12*m21*m34 - m11*m22*m34,

      m23*m32*m41 - m22*m33*m41 - m23*m31*m42 + m21*m33*m42 + m22*m31*m43 - m21*m32*m43,
      m12*m33*m41 - m13*m32*m41 + m13*m31*m42 - m11*m33*m42 - m12*m31*m43 + m11*m32*m43,
      m13*m22*m41 - m12*m23*m41 - m13*m21*m42 + m11*m23*m42 + m12*m21*m43 - m11*m22*m43,
      m12*m23*m31 - m13*m22*m31 + m13*m21*m32 - m11*m23*m32 - m12*m21*m33 + m11*m22*m33

    )).mulScalar(1 / det);

  },

  log: function() {

    var es = this.elements;

    console.log(
      es[0]  + '\t' + es[1]  + '\t' + es[2]  + '\t' + es[3]  + '\n' +
      es[4]  + '\t' + es[5]  + '\t' + es[6]  + '\t' + es[7]  + '\n' +
      es[8]  + '\t' + es[9]  + '\t' + es[10] + '\t' + es[11] + '\n' +
      es[12] + '\t' + es[13] + '\t' + es[14] + '\t' + es[15] + '\n'
    );
  
  }

}
