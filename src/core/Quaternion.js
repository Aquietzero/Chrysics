/**
 * Quaternion is the mathematical presentation of rotations in 
 * three dimensional world.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Quaternion = function(w, x, y, z) {

  this.w = w || 0;
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

}

CHRYSICS.Quaternion.prototype = {

  magnitude: function() {
  
    return this.w * this.w +
           this.x * this.x +
           this.y * this.y +
           this.z * this.z;

  },

  normalize: function() {
  
    var magnitude = this.magnitude();

    if (magnitude > CHRYSICS.Const.ZERO) {
      return new CHRYSICS.Quaternion(
        this.w / magnitude,      
        this.x / magnitude,      
        this.y / magnitude,      
        this.z / magnitude
      );
    } else {
      return new CHRYSICS.Quaternion(1, 0, 0, 0);
    }
  
  },

  normalizeSelf: function() {
  
    var magnitude = this.magnitude();

    if (magnitude > CHRYSICS.Const.ZERO) {
      this.w /= magnitude;
      this.x /= magnitude;
      this.y /= magnitude;
      this.z /= magnitude;
    } else {
      this.r = 1;
    }
  
  },

  add: function(q) {
    
    return new CHRYSICS.Quaternion(
      this.w + q.w,
      this.x + q.x,
      this.y + q.y,
      this.z + q.z
    );
  
  },

  addQuaternion: function(q) {

    this.w += q.w,
    this.x += q.x,
    this.y += q.y,
    this.z += q.z

  },

  mul: function(s) {

    return new CHRYSICS.Quaternion(
      this.w * s,
      this.x * s,
      this.y * s,
      this.z * s
    );

  },

  mulScalar: function(s) {
 
    this.w *= s;
    this.x *= s;
    this.y *= s;
    this.z *= s;

  },

  hamiltonProduct: function(q) {
  
    var w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z,
        w2 = q.w,    x2 = q.x,    y2 = q.y,    z2 = q.z,

    return new CHRYSICS.Quaternion(
      w1*w2 - x1*x2 - y1*y2 - z1*z2,    
      w1*x2 + x1*w2 + y1*z2 - z1*y2,    
      w1*y2 - x1*z2 + y1*w2 + z1*x2,    
      w1*z2 + x1*y2 - y1*x2 + z1*w2,    
    );
  
  },

  hamiltonProductSelf: function(q) {
  
    var w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z,
        w2 = q.w,    x2 = q.x,    y2 = q.y,    z2 = q.z,

    this.w = w1*w2 - x1*x2 - y1*y2 - z1*z2,    
    this.x = w1*x2 + x1*w2 + y1*z2 - z1*y2,    
    this.y = w1*y2 - x1*z2 + y1*w2 + z1*x2,    
    this.z = w1*z2 + x1*y2 - y1*x2 + z1*w2,    
  
  },

  conjugate: function() {
  
    return new CHRYSICS.Quaternion(
      this.w, -this.x, -this.y, -this.z
    );
  
  },

  conjugateSelf: function() {
  
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

  },

}
