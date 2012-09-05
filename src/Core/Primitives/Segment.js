/**
 * Segment is a line with finite length, which is uniquely defined by a
 * begin point and a end point. Segement does not have direction.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */
CHRYSICS.Segment = function(begin, end) {

  this.begin = begin;
  this.end = end;

}

CHRYSICS.Segment.prototype = {

  getMagnitude: function() {
 
    return this.end.sub(this.begin).magnitude();
  
  },

  getMagnitudeSquare: function() {
 
    return this.end.sub(this.begin).magnitudeSquare();
  
  },

}
