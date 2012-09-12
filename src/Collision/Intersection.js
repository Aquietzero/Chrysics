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

  // Given line pq and ccw triangle abc, return whether line pierces triangle.
  // If so, also return the barycentric coordinates (u, v, w) of the intersection
  // point.
  lineTriangle: function(p, q, a, b, c) {

    var pq = q.sub(p);
    var pa = a.sub(p);
    var pb = b.sub(p);
    var pc = c.sub(p);

    // Test if pq is inside the edges bc, ca and ab. Done by testing that the
    // signed tetrahedral volumes, computed using scalar triple products, are
    // all positive.
 
    /*
    // An optimized version. Save one cross product only.
    var m = pq.crossProduct(pc);
    var u = pb.dotProduct(m);
    if (u < 0) return;
    var v = -pa.dotProduct(m);
    if (v < 0) return;
    var w = CHRYSICS.Vector3.ScalarTriple(pq, pb, pa);
    if (w < 0) return;
    */
   
    var u = CHRYSICS.Vector3.ScalarTriple(pq, pc, pb);
    if (u < 0) return;
    var v = CHRYSICS.Vector3.ScalarTriple(pq, pa, pc);
    if (v < 0) return;
    var w = CHRYSICS.Vector3.ScalarTriple(pq, pb, pa);
    if (w < 0) return;

    // The line is on the plane of the triangle.
    if (CHRYSICS.Utils.isZero(u) &&
        CHRYSICS.Utils.isZero(v) &&
        CHRYSICS.Utils.isZero(v))
      return;

    // Compute the barycentric coordinates (u, v, w) determining the intersection
    // point r, r = u*a + v*b +w*c.
    var denom = 1 / (u + v + w);

    u *= denom;
    v *= denom;
    w *= denom;

    return a.mul(u).add(b.mul(v)).add(c.mul(w));
  
  },

  // Given segment pq and triangle abc, returns whether segment intersects triangle
  // and if so, also returns the intersection point on the triangle and on the 
  // segment.
  segmentTriangle: function(segment, a, b, c) {

    var ab = b.sub(a);
    var ac = c.sub(a);
    var qp = segment.begin.sub(segment.end);

    // Compute triangle normal. Can be precalculted or cached if interesting
    // multiple segments against the same triangle.
    var n = ab.crossProduct(ac);

    // Compute denominator d. If d <= 0, segment is parallel to or points
    // away from triangle, so exit early.
    var d = qp.dotProduct(n);
    if (d <= 0) return false;

    // Compute intersection t value of pq with plane of triangle. A ray intersects
    // iff 0 <= t. Segment interests iff 0 <= t <= 1. Delay dividing by d until
    // intersection has been found to pierce triangle.
    var ap = segment.begin.sub(a);
    var t = ap.dotProduct(n);
    if (t < 0) return false;
    if (t > d) return false; // Only for segment.

    // Compute barycentric coordinate components and test if within bounds.
    var e = qp.crossProduct(ap);
    var v = ac.dotProduct(e);
    if (v < 0 || v > d) return false;
    var w = -ab.dotProduct(e);
    if (w < 0 || v + w > d) return false;

    // Segment intersects triangle. Perform delayed division and compute the last
    // barycentric coordinate component.
    var ood = 1 / d;
    t *= ood;
    v *= ood;
    w *= ood;
    u = 1 - v - w;

    return a.mul(u).add(b.mul(v)).add(c.mul(w));

  }

}
