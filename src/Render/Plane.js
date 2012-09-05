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

  this.setOrientation(this.plane.n);

}

CHRYSICS.GEOMETRY.Plane.prototype = _.extend(
  CHRYSICS.GEOMETRY.Primitive.prototype, {

});
