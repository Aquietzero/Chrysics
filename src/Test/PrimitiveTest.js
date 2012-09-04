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
  spherePlane: function(s, p) {

    var c = s.c.sub(p.point);
    var dist = c.dotProduct(p.n);

    if (dist < -s.r)
      return this.INSIDE;
    if (Math.abs(dist) <= s.r)
      return this.INTERSECT;
    return this.OUTSIDE;
  
  },

  // Determine whether plane p intersects an AABB.
  AABBPlane: function(aabb, p) {

    // Compute the center and positive extend of AABB.
    var c = aabb.c;
    var e = new CHRYSICS.Vector3(
      aabb.rx,
      aabb.ry,
      aabb.rz
    );

    var r = e.dotProduct(p.n.abs());
    var s = c.sub(p.point).dotProduct(p.n);

    return Math.abs(s) <= r;
  
  },
  
  // Returns true if sphere s intersects AABB aabb.
  sphereAABB: function(s, aabb) {

    var p = CHRYSICS.BV.ClosestPoint.onAABBToPoint(aabb, s.c);
    var dist = p.sub(s.c);

    return dist.dotProduct(dist) <= s.r * s.r;
  
  },

  // Returns true if shpere s intersects triangle ABC.
  shpereTriangle: function(s, a, b, c) {

    var p = CHRYSICS.BV.ClosestPoint.onTriangleToPoint(a, b, c, s.c);
    var dist = p.sub(s.c);

    return dist.dotProduct(dist) <= s.r * s.r;
  
  },

}
