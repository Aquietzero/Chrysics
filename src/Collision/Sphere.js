/**
 * Sphere is another kind of bounding volume. Its best advantage is
 * rotationally invariant, which means that they are trival to transform.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.Sphere = function(ps) {

  // The center of the bounding sphere.
  this.c = new CHRYSICS.Vector3();

  // The radius of the bouding sphere.
  this.r = 0;

}

/**
 * Test to see if two bounding sphere collide or not.
 */
CHRYSICS.BV.Sphere.isCollide = function(a, b) {

  var c_dist = a.c.sub(b.c).magnitude();
  var r_sum  = a.r + b.r;

  return c_dist.dotProduct(c_dist) <= r_sum * r_sum;

}


