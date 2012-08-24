/**
 * PrimitiveTest.js defines some methods to test whether two primitives
 * collide with each other or not in 3D space.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.PrimitiveTest = {

  INTERSECT : 'INTERSECT',
  INSIDE    : 'INSIDE',
  OUTSIDE   : 'OUTSIDE',

  // Determine whether plane p intersects sphere s.
  testSpherePlane: function(s, p) {

    var c = s.c.sub(p.point);
    var dist = c.dotProduct(p.n);

    if (dist < -s.r)
      return this.INSIDE;
    if (Math.abs(dist) <= s.r)
      return this.INTERSECT;
    return this.OUTSIDE;
  
  },

}
