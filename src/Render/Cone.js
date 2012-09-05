/**
 * Cone.
 */
CHRYSICS.GEOMETRY.Cone = function(radius, height, color, pos, dir) {

  this.dir = dir;
  this.pos = pos;

  this.geometry = new THREE.Mesh(
    new THREE.CylinderGeometry(0, radius, height, 50, 50, false),
    new THREE.MeshLambertMaterial({ color: color })
  );

  this.setOrientation(this.dir);
  this.setPosition(this.pos);

}

CHRYSICS.GEOMETRY.Cone.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
    } else if (arguments.length == 3) {
      this.geometry.position.set(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },

}, CHRYSICS.GEOMETRY.Primitive.prototype);

