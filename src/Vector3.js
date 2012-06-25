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

  add: function(v) {

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;

  },

  sub: function(v) {

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;

  },

  mul: function(s) {

    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;

  },

  div: function(s) {

    this.x /= s;
    this.y /= s;
    this.z /= s;

    return this;
 
  },

  magnitudeSquare: function() {

    return this.x * this.x + this.y * this.y + this.z * this.z;

  },

  magnitude: function() {
  
    return Math.sqrt(this.magnitudeSquare());
  
  },

  normalize: function() {
  
    var magnitude = this.magnitude();
    return magnitude > 0 ? this.div(magnitude) : 0;

  },

}
