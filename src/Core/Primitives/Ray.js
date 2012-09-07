/**
 * Ray is a directional vector which extends infinitively to its
 * direction, whose paramatric equation is:
 *
 *   ray = p + td, where d is the normal direction vector.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Ray = function(p, d) {

  this.point = p;
  this.dir   = d.normalize();

}
