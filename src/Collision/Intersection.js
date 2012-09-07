/**
 * Intersection.js defines a bunch of method to calculate the
 * intersections between two primitives if exists.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.Intersection = {

  // Returns the intersection point if the segment intersects the plane.
  segmentPlane: function(segment, p) {

    var dir = segment.end.sub(segment.begin);
    var dorminator = p.n.dotProduct(p.point.sub(segment.begin))
    var numerator  = p.n.dotProduct(dir);

    var t = dorminator / numerator;

    if (t >= 0 && t <= 1)
      return segment.begin.add(dir.mul(t));
  
  },

  // Intersects ray r = p + td, |d| = 1, with sphere s and, if intersecting,
  // returns t value of intersection and intersection point q.
  raySphere: function(ray, s) {

    var m = ray.point.sub(s.c);
    var c = m.dotProduct(m) - s.r*s.r;
    var b = m.dotProduct(ray.dir);

    // Exit if r's origin outside s (c > 0) and r pointing away from s (b > 0).
    if (c > 0 && b > 0) return;

    // No solutions to the intersection equation.
    var delta = b*b - c;
    if (delta < 0) return;
    
    // Select the smallest t value of intersection.
    t = -b - Math.sqrt(delta);
    // If t is negative, ray started inside sphere so clamp t to zero.
    if (t < 0) t = 0;

    return ray.point.add(ray.dir.mul(t));

  },


}
