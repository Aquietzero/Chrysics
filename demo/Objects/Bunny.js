/**
 * The model of stanford bunny.
 */

var Bunny = function(geom, material, scalar) {
  this.bunny = new THREE.Mesh(geom, material);
  this.bunny.scale.set(scalar, scalar, scalar);
}

Bunny.prototype = {

  getData: function() {
    var vs = [];
    var data = this.bunny.geometry.vertices;

    // This is the bunny special case since there are some bugs
    // in the VTKLoader.js. Most of the faces informationa are
    // loaded as the vertices, which causes embarasse problems.
    for (var i = 0; i < data.length - 70000; ++i) {
      vs.push(new CHRYSICS.Vector3(
        this.bunny.position.x + data[i].x,
        this.bunny.position.y + data[i].y,
        this.bunny.position.z + data[i].z
      ));
    }

    return vertices;
  },

  setPosition: function(pos) {
    this.bunny.position.set(pos.x, pos.y, pos.z);
  },

  getGeometry: function() {
    return this.bunny;
  },

  getCentroid: function() {
    return new CHRYSICS.Vector3(
      this.sphere.position.x,
      this.sphere.position.y,
      this.sphere.position.z
    );
  },

}


