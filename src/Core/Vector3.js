/**
 * Vector3 ----- A 3 dimensional vector
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Vector3 = function(x, y, z) {

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

}

CHRYSICS.Vector3.prototype = {

  set: function(x, y, z) {

    this.x = x;  
    this.y = y;  
    this.z = z;  

  },

  setX: function(x) {

    this.x = x;
  
  },

  setY: function(y) {

    this.y = y;
  
  },

  setZ: function(z) {

    this.z = z;
  
  },

  copy: function(v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
  
  },

  equalsTo: function(v) {

    return CHRYSICS.Utils.isZero(this.x - v.x) && 
           CHRYSICS.Utils.isZero(this.y - v.y) && 
           CHRYSICS.Utils.isZero(this.z - v.z);
  
  },

  inverse: function() {
    
    return new CHRYSICS.Vector3(
      -this.x, -this.y, -this.z
    );

  },

  inverseSelf: function() {

    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
  
  },

  add: function(v) {
  
    return new CHRYSICS.Vector3(
      this.x + v.x,
      this.y + v.y,
      this.z + v.z
    );
  
  },

  addVector: function(v) {

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

  },

  addScaledVector: function(v, s) {

    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
  
  },
 
  sub: function(v) {
  
    return new CHRYSICS.Vector3(
      this.x - v.x,
      this.y - v.y,
      this.z - v.z
    );
  
  },

  subVector: function(v) {

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

  },
  
  mul: function(s) {
  
    return new CHRYSICS.Vector3(
      this.x * s,
      this.y * s,
      this.z * s
    );
  
  },

  mulScalar: function(s) {

    this.x *= s;
    this.y *= s;
    this.z *= s;

  },

  div: function(s) {
  
    if (!CHRYSICS.Utils.isZero(s)) {
      return new CHRYSICS.Vector3(
        this.x / s,
        this.y / s,
        this.z / s
      );
    } else {
      return new CHRYSICS.Vector3();
    }
  
  },

  divScalar: function(s) {

    if (!CHRYSICS.Utils.isZero(s)) {
      this.x /= s;
      this.y /= s;
      this.z /= s;
    }

  },

  dotProduct: function(v) {

    return this.x * v.x + this.y * v.y + this.z * v.z;
    
  },

  /**
   * 6 multiplications and 3 additions.
   */
  crossProduct: function(v) {

    return new CHRYSICS.Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  
  },

  /*
   * 5 multiplications and 8 additions.
  crossProduct: function(v) {

    var t1 = this.x - this.y,
        t2 = v.y + y.z,
        t3 = this.x * v.z,
        t4 = t1 * t2 - t3;

    return new CHRYSICS.Vector3(
      v.y * (t1 - this.z) - t4,
      this.z * v.x - t3,
      t4 - this.y * (v.x - t2)
    );
  
  },
  */

  magnitudeSquare: function() {

    return this.x * this.x + this.y * this.y + this.z * this.z;

  },

  magnitude: function() {
  
    return Math.sqrt(this.magnitudeSquare());
  
  },

  normalize: function() {

    var magnitude = this.magnitude();

    if (magnitude > CHRYSICS.Const.ZERO)
      return this.div(magnitude);
    else
      return new CHRYSICS.Vector3(0, 0, 0);
 
  },

  normalizeSelf: function() {
  
    var magnitude = this.magnitude();

    if (magnitude > CHRYSICS.Const.ZERO)
      this.divScalar(magnitude);

  },

  log: function() {
  
    console.log(this.x, this.y, this.z);
  
  },

}

