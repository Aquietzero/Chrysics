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
  onPlaneToPoint: function(plane, p) {
  
    var n = plane.n;
    var P = plane.point;
    var Q = p;

    var t = n.dotProduct(Q.sub(P)) / n.dotProduct(n);
    return Q.sub(n.mul(t));
  
  },

  onSegmentToPoint: function(segment, p) {
    
    var dir = segment.end.sub(segment.begin);
    var p = p.sub(segment.begin);
    var proj = p.dotProduct(dir.normalize());

    var t = proj / dir.magnitude();

    if (t < 0) t = 0;
    if (t > 1) t = 1;

    return segment.begin.add(dir.mul(t));
  
  },

  /**
   * Given a p in space, return the p on the given AABB
   * which is closest to the given p.
   */
  onAABBToPoint: function(aabb, p) {

    var x_min = aabb.c.x - aabb.rx,
        x_max = aabb.c.x + aabb.rx,
        y_min = aabb.c.y - aabb.ry,
        y_max = aabb.c.y + aabb.ry,
        z_min = aabb.c.z - aabb.rz,
        z_max = aabb.c.z + aabb.rz;

    var x = p.x, y = p.y, z = p.z;

    x = x < x_min ? x_min : x;
    x = x > x_max ? x_max : x;

    y = y < y_min ? y_min : y;
    y = y > y_max ? y_max : y;

    z = z < z_min ? z_min : z;
    z = z > z_max ? z_max : z;

    return new CHRYSICS.Vector3(x, y, z);

  },

  /**
   * Given a point in space, return the point on the triangle which is
   * closest to the given point. In the list of parameters, a, b, c are
   * vertex of the triangle.
   */
  onTriangleToPoint: function(a, b, c, p) {

    // Check if P in vertex region outside A.
    var ab = b.sub(a),
        ac = c.sub(a),
        ap = p.sub(a);
    var d1 = ab.dotProduct(ap);
    var d2 = ac.dotProduct(ap);

    if (d1 <= 0 && d2 <= 0) return a;

    // Check if P in vertex region outside B.
    var bp = p.sub(b);
    var d3 = ab.dotProduct(bp);
    var d4 = ac.dotProduct(bp);

    if (d3 >= 0 && d4 <= d3) return b;

    // Check if P in edge region of AB, if so return projection of P onto AB.
    var vc = d1*d4 - d3*d2;

    if (vc <= 0 && d1 >= 0 && d3 <= 0) {
      var v = d1 / (d1 - d3);
      return a.add(ab.mul(v));
    }

    // Check if P in vertex region outside C.
    var cp = p.sub(c);
    var d5 = ab.dotProduct(cp);
    var d6 = ac.dotProduct(cp);

    if (d6 >= 0 && d5 <= d6) return c;

    // Check if P in edge region of AC, if so return projection of P onto AC.
    var vb = d5*d2 - d1*d6;

    if (vb <= 0 && d2 >= 0 && d6 <= 0) {
      var w = d2 / (d2 - d6);
      return a.add(ac.mul(w));
    }

    // Check if P in edge region of BC, if so return projection of P onto AC.
    var va = d3*d6 - d5*d4;

    if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
      var w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
      return b.add((c.sub(b).mul(w)));
    }

    // P inside face region. Compute Q through its barycentric coordinates (u, v, w).
    var denom = 1.0 / (va + vb +vc);
    var v = vb * denom;
    var w = vc * denom;

    return a.add(ab.mul(v)).add(ac.mul(w));

  },

  /**
   * Computes closest points C1 and C2 of 
   *  
   *  S1(s) = P1 + s*(Q1 - P1) and
   *  S2(t) = P2 + t*(Q2 - P2)
   *
   * returning s and t. 
   */
  betweenSegmentAndSegment: function(s1, s2) {

    var s, t, c1, c2;

    var d1 = s1.end.sub(s1.begin),
        d2 = s2.end.sub(s2.begin),
        r = s1.begin.sub(s2.begin);

    var a = d1.dotProduct(d1),
        e = d2.dotProduct(d2),
        f = d2.dotProduct(r);
    

    // Both segments degenerate into points.
    if (a <= CHRYSICS.Const.SEGMENT_EPSILON &&
        e <= CHRYSICS.Const.SEGMENT_EPSILON) {

      s = t = 0;
      c1 = p1;
      c2 = p2;
    
    }

    if (a <= CHRYSICS.Const.SEGMENT_EPSILON) {

      // First segment degenerates into a point.
      s = 0;
      t = CHRYSICS.Utils.clamp(f / e, 0.0, 1.0);
    
    } else {

      var c = d1.dotProduct(r);
      if (e <= CHRYSICS.Const.SEGMENT_EPSILON) {

        // Second segment degenerates into a point.
        t = 0;
        s = CHRYSICS.Utils.clamp(-c / a, 0.0, 1.0);
      
      } else {

        // The general nondegenerate case.
        var b = d1.dotProduct(d2);
        var denom = a*e - b*b;

        if (denom != 0)
          s = CHRYSICS.Utils.clamp((b*f - c*e) / denom, 0.0, 1.0);
        else
          s = 0;

        t = (b*s + f) / e;

        if (t < 0) {
          t = 0;
          s = CHRYSICS.Utils.clamp(-c / a, 0.0, 1.0);
        } else if (t > 1) {
          t = 1;
          s = CHRYSICS.Utils.clamp((b - c) / a, 0.0, 1.0);
        }
      
      }
    
    }

    return {
      c1 : s1.begin.add(d1.mul(s)),
      c2 : s2.begin.add(d2.mul(t)),
    }
  
  },

}
