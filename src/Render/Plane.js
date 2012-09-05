/**
 * A plane in mathematics is represented as a flat solid cube in
 * demo.
 */
CHRYSICS.GEOMETRY.Plane = function(plane, size, color) {

  this.plane = plane;
  this.pos = plane.point;
  this.dir = plane.n;

  var geom = new THREE.CubeGeometry(size, 1, size);
  var mesh = new THREE.MeshLambertMaterial({ 
    color: color,
    transparent: true,
    opacity: 0.5,
  });

  this.geometry = new THREE.Mesh(geom, mesh);
  this.setOrientation(this.dir);

}

CHRYSICS.GEOMETRY.Plane.prototype = _.extend(
  CHRYSICS.GEOMETRY.Primitive.prototype, {

});
