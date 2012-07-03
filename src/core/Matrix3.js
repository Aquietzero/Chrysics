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

  this.elements = [];

  this.set(
    a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33
  );

}

CHRYSICS.Matrix3.prototype = {

  set: function(
    a11, a12, a13, 
    a21, a22, a23, 
    a31, a32, a33
  ) {

    this.element[0] = a11;
    this.element[1] = a12;
    this.element[2] = a13;
    this.element[3] = a21;
    this.element[4] = a22;
    this.element[5] = a23;
    this.element[6] = a31;
    this.element[7] = a32;
    this.element[8] = a33;
  
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

    var ma11 = ma[0], ma12 = ma[1], ma13 = ma[2],
        ma21 = ma[3], ma22 = ma[4], ma23 = ma[5],
        ma31 = ma[6], ma32 = ma[7], ma33 = ma[8],

    var mb11 = mb[0], mb12 = mb[1], mb13 = mb[2],
        mb21 = mb[3], mb22 = mb[4], mb23 = mb[5],
        mb31 = mb[6], mb32 = mb[7], mb33 = mb[8],

    return new CHRYSICS.Matrix3(
      ma11 + mb11, ma12 + mb12, ma13 + mb13,
      ma21 + mb21, ma22 + mb22, ma23 + mb23,
      ma31 + mb31, ma32 + mb32, ma33 + mb33
    );
  
  },

  addMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    var ma11 = ma[0], ma12 = ma[1], ma13 = ma[2],
        ma21 = ma[3], ma22 = ma[4], ma23 = ma[5],
        ma31 = ma[6], ma32 = ma[7], ma33 = ma[8],

    var mb11 = mb[0], mb12 = mb[1], mb13 = mb[2],
        mb21 = mb[3], mb22 = mb[4], mb23 = mb[5],
        mb31 = mb[6], mb32 = mb[7], mb33 = mb[8],

    this.set(
      ma11 + mb11, ma12 + mb12, ma13 + mb13,
      ma21 + mb21, ma22 + mb22, ma23 + mb23,
      ma31 + mb31, ma32 + mb32, ma33 + mb33
    );
  
  },


  mulMatrix: function(m) {

    var ma = this.elements;
    var mb = m.elements;

    var ma11 = ma[0], ma12 = ma[1], ma13 = ma[2],
        ma21 = ma[3], ma22 = ma[4], ma23 = ma[5],
        ma31 = ma[6], ma32 = ma[7], ma33 = ma[8],

    var mb11 = mb[0], mb12 = mb[1], mb13 = mb[2],
        mb21 = mb[3], mb22 = mb[4], mb23 = mb[5],
        mb31 = mb[6], mb32 = mb[7], mb33 = mb[8],

    return new CHRYSICS.Matrix3(
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
      ma41*mb14 + ma42*mb24 + ma43*mb34 + ma44*mb44,
    );

  },

  mulVector3: function(v) {

    var ma11 = ma[ 0], ma12 = ma[ 1], ma13 = ma[ 2], ma14 = ma[ 3],
        ma21 = ma[ 4], ma22 = ma[ 5], ma23 = ma[ 6], ma24 = ma[ 7],
        ma31 = ma[ 8], ma32 = ma[ 9], ma33 = ma[10], ma34 = ma[11];

    return new CHRYSICS.Vector3(
      v.x*ma11 + v.y*ma12 + v.z*ma13 + ma14,
      v.x*ma21 + v.y*ma22 + v.z*ma23 + ma24,
      v.x*ma31 + v.y*ma32 + v.z*ma33 + ma34
    );
  
  },

  inverse: function() {
  
  },

}
