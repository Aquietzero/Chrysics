/**
 * BV.js defines the bounding volume for collision detection. There are
 * many useful methods universally available for all kinds of bounding
 * volume calculation involved.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var CHRYSICS.BV = {

  /**
   * Returns indices min and max of the given points array of the least
   * and most, respectively, distant points along the direction dir.
   */
  extremePointsAlongDirection: function(dir, ps) {
  
    var maxProj = -Infinity,
        minProj =  Infinity,
        max, min, proj;

    for (var i = 0; i < ps.length; ++i) {

      proj = ps[i].projectOnUnit(dir);

      if (proj < minProj) {
        minProj = proj;
        min = i;
      }
      if (proj > maxProj) {
        maxProj = proj;
        max = i;
      }

    }

    return {
      max: max,
      min: min
    };
  
  },

}
