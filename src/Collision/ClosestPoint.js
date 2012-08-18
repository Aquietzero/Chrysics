/**
 * ClosestPoint.js defines many methods that calculates the
 * closest point between certain sort of things such as between
 * a point and a plane, between a point and a line and so on.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.ClosestPoint = {

  /**
   * Q is an arbitrary point in space. The closest point R on the 
   * plane n.(X - P) = 0 to Q is the orthogonal projection of Q
   * onto the plane. That is, R = Q - tn.
   *
   *         n.(Q - P)
   *    t = -----------
   *            n.n
   *
   *    R = Q - tn
   */
  onPlaneToPoint: function(plane, point) {
  
    var n = plane.n;
    var P = plane.point;
    var Q = point;

    var t = n.dotProduct(Q.sub(P)) / n.dotProduct(n);
    return Q.sub(n.mul(t));
  
  },

  onSegmentToPoint: function(segment, point) {
    
    var dir = segment.end.sub(segment.begin);
    var p = point.sub(segment.begin);
    var proj = p.dotProduct(dir.normalize());

    var t = proj / dir.magnitude();

    if (t < 0) t = 0;
    if (t > 1) t = 1;

    return segment.begin.add(dir.mul(t));
  
  },

  /**
   * Given a point in space, return the point on the given AABB
   * which is closest to the given point.
   */
  onAABBToPoint: function(aabb, point) {

    var x_min = aabb.c.x - aabb.rx,
        x_max = aabb.c.x + aabb.rx,
        y_min = aabb.c.y - aabb.ry,
        y_max = aabb.c.y + aabb.ry,
        z_min = aabb.c.z - aabb.rz,
        z_max = aabb.c.z + aabb.rz;

    var x = point.x, y = point.y, z = point.z;

    x = x < x_min ? x_min : x;
    x = x > x_max ? x_max : x;

    y = y < y_min ? y_min : y;
    y = y > y_max ? y_max : y;

    z = z < z_min ? z_min : z;
    z = z > z_max ? z_max : z;

    return new CHRYSICS.Vector3(x, y, z);

  },

}
