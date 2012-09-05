/**
 * AABB.
 */
CHRYSICS.GEOMETRY.AABB = function(aabb, color, opacity) {

  this.aabb = aabb;
  this.geometry = new THREE.Mesh(
    new THREE.CubeGeometry(aabb.rx * 2, aabb.ry * 2, aabb.rz * 2),
    new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
    })
  );

}

CHRYSICS.GEOMETRY.AABB.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
      this.aabb.c = new CHRYSICS.Vector3(
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
      this.aabb.c = new CHRYSICS.Vector3(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },

}, CHRYSICS.GEOMETRY.Primitive.prototype);
