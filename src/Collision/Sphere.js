/**
 * Sphere is another kind of bounding volume. Its best advantage is
 * rotationally invariant, which means that they are trival to transform.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Sphere = function(c, r) {

  this.c = c || new CHRYSICS.Vector3();
  this.r = r || 10;

}

CHRYSICS.BV.Sphere = function(ps) {

  // The center of the bounding sphere.
  this.c = new CHRYSICS.Vector3();

  // The radius of the bouding sphere.
  this.r = 0;

  // There are some possibility that the sphere is set by default or given
  // values rather than calculated from a set of points.
  if (typeof ps !== 'undefined')
    this.init(ps);

}

CHRYSICS.BV.Sphere.prototype = {

  init: function(ps) {

    // this.initWithEigenSphere(ps);
    this.initWithRitterSphere(ps, 10);
  
  },

  ritterSphere: function(ps) {

    this.sphereFromDistantPoints(ps);

    for (var i = 0; i < ps.length; ++i)
      this.expandSphere(ps[i]);
  
  },

  initWithRitterSphere: function(ps, iter) {

    this.ritterSphere(ps);
    var s = new CHRYSICS.BV.Sphere();

    s.c = this.c;
    s.r = this.r;

    for (var i = 0; i < iter; ++i) {

      s.r *= 0.95;
      for (var i = 0; i < ps.length; ++i) {
        //doRandomSwap();
        s.expandSphere(ps[i]);
      }

      if (s.r < this.r) {
        this.c = s.c;
        this.r = s.r;
      } else
        break;
    
    }
  
  },

  initWithEigenSphere: function(ps) {
  
    this.eigenSphere(ps);

    for (var i = 0; i < ps.length; ++i)
      this.expandSphere(ps[i]);

  },

  eigenSphere: function(ps) {

    var covMatrix = CHRYSICS.Statistics.covarianceMatrix(ps);
    var eigens    = CHRYSICS.Matrix3.Jacobi(covMatrix);

    var maxIndex = CHRYSICS.Utils.maxIndex(
      eigens.eigenValues.$(0, 0), 
      eigens.eigenValues.$(1, 1), 
      eigens.eigenValues.$(2, 2)
    );
    var eigenDirection = new CHRYSICS.Vector3(
      eigens.eigenVectors.$(0, maxIndex),
      eigens.eigenVectors.$(1, maxIndex),
      eigens.eigenVectors.$(2, maxIndex)
    );

    var extremePoints = CHRYSICS.BV.extremePointsAlongDirection(eigenDirection, ps);
    var maxPoint = extremePoints.max,
        minPoint = extremePoints.min;

    this.c = maxPoint.add(minPoint).mul(0.5);
    this.r = maxPoint.sub(minPoint).magnitude() * 0.5;
  
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

  copy: function() {
  
    var s = new CHRYSICS.BV.Sphere();
  
    s.r = this.r;
    s.c = this.c;

    return s;

  },

}

/**
 * Test to see if two bounding sphere collide or not.
 */
CHRYSICS.BV.Sphere.IsCollide = function(a, b) {

  var c_dist = a.c.sub(b.c).magnitude();
  var r_sum  = a.r + b.r;

  return c_dist.dotProduct(c_dist) <= r_sum * r_sum;

}

