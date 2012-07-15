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

  this.init(ps);

}

CHRYSICS.BV.Sphere.prototype = {

  init: function(ps) {
  
    this.sphereFromDistantPoints(ps); 

    for (var i = 0; i < ps.length; ++i)
      this.expandSphere(ps[i]);
  
  },

  /**
   * Using the initial approximate AABB to obtain the first guest of
   * the bounding sphere.
   */
  sphereFromDistantPoints: function(ps) {

    var distantPoints = CHRYSICS.BV.mostSeparatedPointsOnAABB(ps);

    var min = distantPoints.min;
    var max = distantPoints.max;

    this.c = min.add(max).mul(0.5);
    this.r = max.sub(min).magnitude() / 2;
  
  },

  /**
   * Expand the sphere to encompass all the points outside the current
   * guest bounding sphere.
   *
   *                   c                      p
   *   (---------------*---------------)      *
   *                   |------d(dist)-------->|
   *   (-------------------*------------------)
   *                       c'
   *                       |----new_r-------->|
   */
  expandSphere: function(p) {
  
    var d  = p.sub(this.c);
    var d2 = d.magnitudeSquare();

    if (d2 > this.r * this.r) {
    
      dist = Math.sqrt(d2);
      var new_r = (dist + this.r) / 2;

      this.c.addVector(d.mul((new_r - this.r) / dist));
      this.r = new_r;
    
    }
  
  },

}

/**
 * Test to see if two bounding sphere collide or not.
 */
CHRYSICS.BV.Sphere.isCollide = function(a, b) {

  var c_dist = a.c.sub(b.c).magnitude();
  var r_sum  = a.r + b.r;

  return c_dist.dotProduct(c_dist) <= r_sum * r_sum;

}

