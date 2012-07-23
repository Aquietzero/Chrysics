/**
 * Plane.js defines plane as the four-component form.
 *
 *   n . X = d
 *
 * where `n` is the normal vector of the plane, `X` is an arbitrary
 * point on the plane and `d` is the distance between the plane and
 * the origin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.Plane = function(n, d) {

  this.n = n;
  this.d = d;

}
