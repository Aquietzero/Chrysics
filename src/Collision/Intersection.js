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

  // TODO beautify this ugly implementation.
  // Intersect ray R(t) = p + t*d against AABB a. When intersecting, 
  // return point q of intersection.
  rayAABB: function(ray, aabb) {

    var tmin = 0;
    var tmax = -Infinity;

    var d = [ray.dir.x,   ray.dir.y,   ray.dir.z];
    var p = [ray.point.x, ray.point.y, ray.point.z];
    var a = {
      min: [aabb.c.x - aabb.rx, aabb.c.y - aabb.ry, aabb.c.z - aabb.rz],
      max: [aabb.c.x + aabb.rx, aabb.c.y + aabb.ry, aabb.c.z + aabb.rz],
    };

    // For all three slabs.
    for (var i = 0; i < 3; ++i) {

      if (CHRYSICS.Utils.ltZero(Math.abs(d[i]))) {
        // Ray is parallel to slab. No hit if origin not within slab.
        if (p[i] < a.min[i] || p[i] > a.max[i]) return;
      } else {
        // Compute intersection t value of ray with near and far plane
        // of slab.
        var ood = 1 / d[i];
        var t1  = (a.min[i] - p[i]) * ood;
        var t2  = (a.max[i] - p[i]) * ood;
        
        if (t1 > t2)
          var temp = t1; t1 = t2; t2 = temp;

        // Compute the intersection of slab intersection intervals.
        if (t1 > tmin) tmin = t1;
        if (t2 > tmax) tmax = t2;
        // Exit with no collision as soon as slab intersection becomes empty.
        if (tmin > tmax) return;

      }
    
    }

    return ray.point.add(ray.dir.mul(tmin));
  
  },

}