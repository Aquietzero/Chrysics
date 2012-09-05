/**
 * A sphere
 */
CHRYSICS.GEOMETRY.Sphere = function(sphere, radius, color) {

  this.sphere = sphere;

  var geom = new THREE.SphereGeometry(radius, 20, 20);
  var mesh = new THREE.MeshLambertMaterial({ color: color });

  this.geometry = new THREE.Mesh(geom, mesh);
  this.setPosition(this.sphere.c);

}

CHRYSICS.GEOMETRY.Sphere.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
      this.sphere.c = new CHRYSICS.Vector3(
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
      this.sphere.c = new CHRYSICS.Vector3(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },
 
}, CHRYSICS.GEOMETRY.Primitive.prototype);

