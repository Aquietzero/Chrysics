/**
 * Distance.js defines some methods to calculate the distance between
 * two primitives in many situations. Since in primitive testing, 
 * exact distance is not needed for most of the times, so the square
 * distance is returned for most of the cases.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.Distance = {

  /**
   * Calculate the distance between a point C to a segment AB.
   */
  pointToSegment: function(segment, point) {

    var ab = segment.end.sub(segment.begin),
        ac = point.sub(segment.begin),
        bc = point.sub(segment.end);

    var e = ab.dotProduct(ac);
    if (e <= 0)
      return ac.dotProduct(ac);

    var f = ab.dotProduct(ab);
    if (e >= f)
      return bc.dotProduct(bc);

    return ac.dotProduct(ac) - e * e / f;
  
  },

}
