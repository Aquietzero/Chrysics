/**
 * Plane.js defines plane as the following form:
 *
 *   n . P = 0
 *
 * where `n` is the normal vector of the plane, `X` is an arbitrary
 * point on the plane and `d` is the distance between the plane and
 * the origin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Plane = function(n, point) {

  this.n = n.normalize();
  this.point = point;

}

CHRYSICS.Plane.prototype = {

  getBasics: function() {

    var e1 = this.n;
    var e2 = new CHRYSICS.Vector3(1, 1, -(e1.x + e1.y) / e1.z);
    e2.normalizeSelf();
    var e3 = u1.crossProduct(u2);

    return {
      e1: e1,
      e2: e2,
      e3: e3,
    };
  
  },

}
