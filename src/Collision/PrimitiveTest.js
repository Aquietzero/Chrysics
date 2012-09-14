/**
 * PrimitiveTest.js defines some methods to test whether two primitives
 * collide with each other or not in 3D space.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.PrimitiveTest = {

  INTERSECT : 'INTERSECT',
  INSIDE    : 'INSIDE',
  OUTSIDE   : 'OUTSIDE',

  EPSILON   : 0.00001,

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
  sphereTriangle: function(s, a, b, c) {

    var p = CHRYSICS.BV.ClosestPoint.onTriangleToPoint(a, b, c, s.c);
    var dist = p.sub(s.c);

    return dist.dotProduct(dist) <= s.r * s.r;
  
  },

  // Returns true if the segment intersects the plane.
  segmentPlane: function(segment, p) {

    var dir = segment.end.sub(segment.begin);
    var dorminator = p.n.dotProduct(p.point.sub(segment.begin))
    var numerator  = p.n.dotProduct(dir);

    var t = dorminator / numerator;

    if (t >= 0 && t <= 1) return true;
  
  },

  // Returns true if triangle t intersects AABB aabb.
  AABBTriangle: function(aabb, a, b, c) {

    var Abs = Math.abs;
    var Max = Math.max;
    var Min = Math.min;
    
    var p0, p1, p2, r;

    // Get the center and extends of the bounding box.
    var e0 = aabb.rx;
    var e1 = aabb.ry;
    var e2 = aabb.rz;

    // Translate triangle as conceptually moving AABB to origin.
    var v0 = a.sub(aabb.c);
    var v1 = b.sub(aabb.c);
    var v2 = c.sub(aabb.c);

    // Compute the edge vectors of the triangle.
    var f0 = v1.sub(v0);
    var f1 = v2.sub(v1);
    var f2 = v0.sub(v2);

    /**
     * Category 3:
     * Test all the cross products between the face normals of the
     * AABB and the edge vectors of the triangle.
     */

    // Test axis a00 = u0 x f0 = (0, -f0z, f0y)
    p0 = v0.z*v1.y - v0.y*v1.z;
    p2 = v2.z*(v1.y - v0.y) - v2.z*(v1.z - v0.z);
    r  = e1*Abs(f0.z) + e2*Abs(f0.y);
    if (Max(-Max(p0, p2), Min(p0, p2)) > r) return false;
  
    // Test axis a01 = u0 x f1 = (0, -f1z, f1y)
    p0 = v0.z*(v2.y - v1.y) - v0.y*(v2.z - v1.z);
    p1 = v1.z*v2.y - v1.y*v2.z;
    r  = e1*Abs(f1.z) + e2*Abs(f1.y);
    if (Max(-Max(p0, p1), Min(p0, p1)) > r) return false;
 
    // Test axis a02 = u0 x f2 = (0, -f2z, f2y)
    p1 = v1.z*(v0.y - v2.y) - v1.y*(v0.z - v2.z);
    p2 = v0.y*v2.z - v0.z*v2.y;
    r  = e1*Abs(f2.z) + e2*Abs(f2.y);
    if (Max(-Max(p1, p2), Min(p1, p2)) > r) return false;

    // Test axis a10 = u1 x f0 = (f0z, 0, -f0x)
    p0 = v0.x*v1.z - v0.z*v1.x;
    p2 = v2.x*(v1.z - v0.z) - v2.z*(v1.x - v0.x);
    r  = e0*Abs(f0.z) + e2*Abs(f0.x);
    if (Max(-Max(p0, p2), Min(p0, p2)) > r) return false;
  
    // Test axis a11 = u1 x f1 = (f1z, 0, -f1x)
    p0 = v0.x*(v2.z - v1.z) - v0.z*(v2.x - v1.x);
    p1 = v1.x*v2.z - v1.z*v2.x;
    r  = e0*Abs(f1.z) + e2*Abs(f1.x);
    if (Max(-Max(p0, p1), Min(p0, p1)) > r) return false;
 
    // Test axis a11 = u1 x f2 = (f2z, 0, -f2x)
    p1 = v1.x*(v0.z - v2.z) - v1.z*(v0.x - v2.x);
    p2 = v0.z*v2.x - v0.x*v2.z;
    r  = e0*Abs(f2.z) + e2*Abs(f2.x);
    if (Max(-Max(p1, p2), Min(p1, p2)) > r) return false;

    // Test axis a20 = u2 x f0 = (-f0y, f0x, 0)
    p0 = v0.y*v1.x - v0.x*v1.y;
    p2 = v2.y*(v1.x - v0.x) - v2.x*(v1.y - v0.y);
    r  = e0*Abs(f0.y) + e1*Abs(f0.x);
    if (Max(-Max(p0, p2), Min(p0, p2)) > r) return false;
  
    // Test axis a21 = u2 x f1 = (-f1y, f1x, 0)
    p0 = v0.y*(v2.x - v1.x) - v0.x*(v2.y - v1.y);
    p1 = v1.y*v2.x - v1.x*v2.y;
    r  = e0*Abs(f1.y) + e1*Abs(f1.x);
    if (Max(-Max(p0, p1), Min(p0, p1)) > r) return false;
 
    // Test axis a21 = u2 x f2 = (-f2y, f2x, 0)
    p1 = v1.y*(v0.x - v2.x) - v1.x*(v0.y - v2.y);
    p2 = v0.x*v2.y - v0.y*v2.x;
    r  = e0*Abs(f2.y) + e1*Abs(f2.x);
    if (Max(-Max(p1, p2), Min(p1, p2)) > r) return false;


    /**
     * Category 1:
     * Test the three axes corresponding to the face normals of AABB.
     */
    if (Max(v0.x, v1.x, v2.x) < -e0 || Min(v0.x, v1.x, v2.x) > e0) return false;
    if (Max(v0.y, v1.y, v2.y) < -e1 || Min(v0.y, v1.y, v2.y) > e1) return false;
    if (Max(v0.z, v1.z, v2.z) < -e2 || Min(v0.z, v1.z, v2.z) > e2) return false;


    /**
     * Category 2:
     * Since v0 has already been traslated to the origin, so it can
     * not be used to define the plane.
     */
    var plane = new CHRYSICS.Plane(f0.crossProduct(f2), a);
    return this.AABBPlane(aabb, plane);

  },

  // Test if ray r = p + td intersects sphere s
  raySphere: function(ray, s) {

    var m = ray.point.sub(s.c);
    var c = m.dotProduct(m) - s.r*s.r;

    // There is at least on root if the origin of the ray is
    // inside the sphere.
    if (c <= 0) return true;

    // The origin of the ray is outside the sphere and the ray
    // is pointing outwards.
    var b = m.dotProduct(ray.dir);
    if (b > 0) return false;

    // No solution in the intersection equation.
    var delta = b*b - c;
    if (delta < 0) return false;

    return true;
  
  },

  segmentAABB: function(segment, aabb) {

    var Abs = Math.abs;

    var c = aabb.c;
    var dir = segment.end.sub(segment.begin);
    var d = dir.mul(0.5);
    var m = segment.begin.add(d);

    // Translate box and segment to origin.
    m.subVector(c);

    var adx = Abs(d.x);
    if (Abs(m.x) > aabb.rx + adx) return false;
    var ady = Abs(d.y);
    if (Abs(m.y) > aabb.ry + ady) return false;
    var adz = Abs(d.z);
    if (Abs(m.z) > aabb.rz + adz) return false;

    // Add in an epsilon term to counteract arithmetic errors when segment
    // is (near) parallel to a coordinate axis.
    adx += this.EPSILON;
    ady += this.EPSILON;
    adz += this.EPSILON;

    if (Abs(m.y*d.z - m.z*d.y) > aabb.ry*adz + aabb.rz*ady) return false;
    if (Abs(m.z*d.x - m.x*d.z) > aabb.rx*adz + aabb.rz*adx) return false;
    if (Abs(m.x*d.y - m.y*d.x) > aabb.rx*ady + aabb.ry*adx) return false;

    return true;
  
  },

}
