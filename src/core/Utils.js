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

  random: function(from, to) {
    
    if (to > from)
      return from + Math.random() * (to - from);
    else
      return to + Math.random() * (from - to);

  },

}
