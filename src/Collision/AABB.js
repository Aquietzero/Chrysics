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

  this.init();

}

/**
 * Test to see if two AABBs collide or not.
 */
CHRYSICS.BV.AABB.isCollide = function(a, b) {

  if (Math.abs(a.c.x - b.c.x) > (a.rx + b.rx)) return false;
  if (Math.abs(a.c.y - b.c.y) > (a.ry + b.ry)) return false;
  if (Math.abs(a.c.z - b.c.z) > (a.rz + b.rz)) return false;

  return true;

}

CHRYSICS.BV.AABB.prototype = {

  init: function(vs) {
    
    var extremePointsX = 
      CHRYSICS.BV.extremePointsAlongDirection(vs, CHRYSICS.Vector3.X_DIRECTION_P);
    var extremePointsY = 
      CHRYSICS.BV.extremePointsAlongDirection(vs, CHRYSICS.Vector3.X_DIRECTION_P);
    var extremePointsZ = 
      CHRYSICS.BV.extremePointsAlongDirection(vs, CHRYSICS.Vector3.X_DIRECTION_P);

    var x_min = extremePointsX.min,
        x_max = extremePointsX.max,
        y_min = extremePointsY.min,
        y_max = extremePointsY.max,
        z_min = extremePointsZ.min,
        z_max = extremePointsZ.max;

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


