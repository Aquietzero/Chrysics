/**
 * AABB(axis-align bounding box) is one of the simplest bounding volume
 * structure. In this implementation, the center-radius representation 
 * is adopted.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BV.AABB = function(vs) {

  // The center of the bounding box.
  this.c = new CHRYSICS.Vector3();

  // Radius in x axis.
  this.rx = 0;

  // Radius in y axis.
  this.ry = 0;

  // Radius in z axis.
  this.rz = 0;

  this.init(vs);

}

CHRYSICS.BV.AABB.prototype = {

  init: function(vs) {

    var x_min = 0, x_max = 0,
        y_min = 0, y_max = 0,
        z_min = 0, z_max = 0;

    for (var i = 0; i < vs.length; ++i) {

      if (vs[i].x < vs[x_min].x) x_min = i;
      if (vs[i].x > vs[x_max].x) x_max = i;
      if (vs[i].y < vs[y_min].y) y_min = i;
      if (vs[i].y > vs[y_max].y) y_max = i;
      if (vs[i].z < vs[z_min].z) z_min = i;
      if (vs[i].z > vs[z_max].z) z_max = i;

    }

    x_min = vs[x_min].x, x_max = vs[x_max].x;
    y_min = vs[y_min].y, y_max = vs[y_max].y;
    z_min = vs[z_min].z, z_max = vs[z_max].z;

    this.c = new CHRYSICS.Vector3(
      (x_min + x_max) / 2,
      (y_min + y_max) / 2,
      (z_min + z_max) / 2
    );

    this.rx = Math.abs(x_max - x_min) / 2;
    this.ry = Math.abs(y_max - y_min) / 2;
    this.rz = Math.abs(z_max - z_min) / 2;
  
  },

  update: function(m) {
  
    var rotation = m.getRotation();
    var tranlation = m.getTranslation();
    var radius;

    this.c = rotation.mulVector3(this.c);
    radius = tranlation.abs().mulVector3(new CHRYSICS.Vector3(
      this.rx, this.ry, this.rz
    ));

    this.rx = radius.x;
    this.ry = radius.y;
    this.rz = radius.z;
  
  },

}

/**
 * Test to see if two AABBs collide or not.
 */
CHRYSICS.BV.AABB.IsCollide = function(a, b) {

  if (Math.abs(a.c.x - b.c.x) > (a.rx + b.rx)) return false;
  if (Math.abs(a.c.y - b.c.y) > (a.ry + b.ry)) return false;
  if (Math.abs(a.c.z - b.c.z) > (a.rz + b.rz)) return false;

  return true;

}

