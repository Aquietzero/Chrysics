/**
 * Distance.js defines some methods to calculate the distance between
 * two primitives in many situations. Since in primitive testing, 
 * exact distance is not needed for most of the times, so the square
 * distance is returned for most of the cases.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Distance = {

  /**
   * Calculate the distance between a point C to a segment AB.
   */
  pointToSegment: function(segment, point) {

    var ab = segment.end.sub(segment.begin),
        ac = point.sub(segment.begin),
        bc = point.sub(segment.end);

    var e = ab.dotProduct(ac);
    if (e <= 0)
      return ac.dotProduct(ac);

    var f = ab.dotProduct(ab);
    if (e >= f)
      return bc.dotProduct(bc);

    return ac.dotProduct(ac) - e * e / f;
  
  },

  /**
   * Calculate the distance between a point P to a AABB.
   */
  pointToAABB: function(aabb, point) {

    var x_min = aabb.c.x - aabb.rx,
        x_max = aabb.c.x + aabb.rx,
        y_min = aabb.c.y - aabb.ry,
        y_max = aabb.c.y + aabb.ry,
        z_min = aabb.c.z - aabb.rz,
        z_max = aabb.c.z + aabb.rz;

    var x = point.x, y = point.y, z = point.z;
    var dist = 0;

    if (x < x_min) dist += (x_min - x) * (x_min - x);
    if (x > x_max) dist += (x - x_max) * (x - x_max);

    if (y < y_min) dist += (y_min - y) * (y_min - y);
    if (y > y_max) dist += (y - y_max) * (y - y_max);

    if (z < z_min) dist += (z_min - z) * (z_min - z);
    if (z > z_max) dist += (z - z_max) * (z - z_max);

    return dist;

  },


}
