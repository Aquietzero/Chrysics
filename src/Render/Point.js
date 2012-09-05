/**
 * A point in mathematics is represented as a little ball in demo.
 */
CHRYSICS.GEOMETRY.Point = function(point, radius, color) {

  this.point = point;

  this.geometry = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 20, 20),
    new THREE.MeshLambertMaterial({ color: color })
  );

  this.setPosition(this.point);

}

CHRYSICS.GEOMETRY.Point.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
      this.point = new CHRYSICS.Vector3(
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
      this.point = new CHRYSICS.Vector3(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },
 
}, CHRYSICS.GEOMETRY.Primitive.prototype);
