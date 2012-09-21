/**
 * BV.js defines the bounding volume for collision detection. There are
 * many useful methods universally available for all kinds of bounding
 * volume calculation involved.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV = {

  TYPE: {
    AABB   : 'AABB',
    SPHERE : 'Sphere',
  },

  /**
   * Returns min and max of the given points array of the least
   * and most, respectively, distant points along the direction dir.
   */
  extremePointsAlongDirection: function(dir, ps) {
    var maxProj = -Infinity,
        minProj =  Infinity,
        max, min, proj;

    for (var i = 0; i < ps.length; ++i) {

      proj = ps[i].projectOnUnit(dir);

      if (proj < minProj)
        minProj = proj, min = i;
      if (proj > maxProj)
        maxProj = proj, max = i;

    }

    return {
      max: ps[max],
      min: ps[min],
    };
  },

  /**
   * Compute two of the most separated points on the AABB.
   */
  mostSeparatedPointsOnAABB: function(ps) {
    var x_min = 0, x_max = 0,
        y_min = 0, y_max = 0,
        z_min = 0, z_max = 0;

    for (var i = 0; i < ps.length; ++i) {

      if (ps[i].x < ps[x_min].x) x_min = i;
      if (ps[i].x > ps[x_max].x) x_max = i;
      if (ps[i].y < ps[y_min].y) y_min = i;
      if (ps[i].y > ps[y_max].y) y_max = i;
      if (ps[i].z < ps[z_min].z) z_min = i;
      if (ps[i].z > ps[z_max].z) z_max = i;

    }

    var dist2x = ps[x_max].sub(ps[x_min]).magnitudeSquare();
    var dist2y = ps[y_max].sub(ps[y_min]).magnitudeSquare();
    var dist2z = ps[z_max].sub(ps[z_min]).magnitudeSquare();

    if (dist2y > dist2x && dist2y > dist2z)
      return { min: ps[y_min], max: ps[y_max] }

    if (dist2z > dist2x && dist2z > dist2y)
      return { min: ps[z_min], max: ps[z_max] }

    return { 
      min: ps[x_min], 
      max: ps[x_max] 
    };
  },

  // TODO: Remember, the method below assumes that each object
  // provides a method call `getData` to open access to the vertices'
  // information of the object.
  computeBoundingVolume: function(objs, type) {
    var vs = [];
    for (var i = 0; i < objs.length; ++i) {
      var data = objs[i].getData();    
      for (var n = 0; n < data.length; ++n)
        vs.push(data[n]);
    }
    
    if (type == CHRYSICS.BV.TYPE.AABB)
      return new CHRYSICS.BV.AABB(vs);
    if (type == CHRYSICS.BV.TYPE.SPHERE)
      return new CHRYSICS.BV.Sphere(vs);
  }

}
