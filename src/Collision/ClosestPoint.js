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
   * plane n.X = d to Q is the orthogonal projection of Q
   * onto the plane. That is, R = Q - tn.
   *
   *         n.Q - d
   *    t = ---------
   *           n.n
   *
   *    R = Q - tn
   */
  onPlaneToPoint: function(plane, point) {
  
    var n = plane.n;
    var t = (n.dotProduct(point) - plane.d).div(n.dotProduct(n));

    return point.sub(n.mul(t));
  
  },

}
