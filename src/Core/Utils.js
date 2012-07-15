/**
 * Utils.js defines some useful handful functions within the
 * scope CHRYSICS.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Utils = {

  isZero: function(n) {

    return Math.abs(n) < CHRYSICS.Const.ZERO;

  },

  gtZero: function(n) {
  
    return Math.abs(n) > CHRYSICS.Const.ZERO;
  
  },

  ltZero: function(n) {
  
    return Math.abs(n) < -CHRYSICS.Const.ZERO;
  
  },

  random: function(from, to) {
    
    if (to > from)
      return from + Math.random() * (to - from);
    else
      return to + Math.random() * (from - to);

  },

  sum: function(xs) {
  
    var sum = 0;

    for (var i = 0; i < xs.length; ++i)
      sum += xs[i];
    
    return sum;
  
  },

  /**
   * Converts a local coordinate to the world coordinate.
   *
   * @param {Vector3} local The local coordinate vector.
   * @param {Matrix4} transform The transform matrix.
   */
  localToWorld: function(local, transform) {
  
    return transform.mulVector3(local);

  },

  /**
   * Converts a world coordinate back to the local coordinate.
   *
   * @param {Vector3} world The world coordinate vector.
   * @param {Matrix4} transform The transform matrix.
   */
  worldToLocal: function(world, transform) {
  
    return transform.inverse().mulVector3(world);
  
  },

}
