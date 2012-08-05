/**
 * Geometries.js defines some basic geometries for the demostration
 * of the geometrical tests. Although THREE.js pre-defines some 
 * geometries, some of them are not basic enough such as point and
 * line and so on.
 *
 * At the same time, these geometries should be able to combine with
 * the data structure that I defined in the name space of CHRYSICS.
 */

var Point = function(point) {

  this.geometry = new THREE.Mesh(
    new THREE.SphereGeometry(20, 20, 20),
    new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    })
  );
  this.geometry.position.set(
    point.x,
    point.y,
    point.z
  );

}

Point.prototype = {

  getGeometry: function() {
  
    return this.geometry;
  
  },

}


var Plane = function(plane) {

  this.geometry = new THREE.Mesh(
    new THREE.CubeGeometry(200, 200, 2),
    new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    })
  );

}
