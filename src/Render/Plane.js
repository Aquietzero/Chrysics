/**
 * A plane in mathematics is represented as a flat solid cube in
 * demo.
 */
CHRYSICS.GEOMETRY.Plane = function(plane, size, color) {

  this.plane = plane;
  this.geometry = new THREE.Mesh(
    geom = new THREE.CubeGeometry(size, 1, size),
    mesh = new THREE.MeshLambertMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.5,
    })
  );

  this.setPosition(this.plane.point);
  this.setOrientation(this.plane.n);

}

CHRYSICS.GEOMETRY.Plane.prototype = _.extend({

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
