/**
 * Triangle defines the triangle in mathematics. It can be regarded
 * as a group of three points in the space.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Triangle = function(v1, v2, v3) {

  this.v1 = v1;
  this.v2 = v2;
  this.v3 = v3;

}

CHRYSICS.Triangle.prototype = {

  getPosition: function() {

    return new CHRYSICS.Vector3(
      (this.v1.x + this.v2.x + this.v3.x) / 3,
      (this.v1.y + this.v2.y + this.v3.y) / 3,
      (this.v1.z + this.v2.z + this.v3.z) / 3
    );
  
  },

}
