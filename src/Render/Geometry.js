/**
 * Geometries.js defines some basic geometries for the demostration
 * of the geometrical tests. Although THREE.js pre-defines some 
 * geometries, some of them are not basic enough such as point and
 * line and so on.
 *
 * At the same time, these geometries should be able to combine with
 * the data structure that I defined in the name space of CHRYSICS.
 */
CHRYSICS.GEOMETRY = {}

CHRYSICS.GEOMETRY.Primitive = function() {

  this.geometry = THREE.Mesh(
    new THREE.CubeGeometry(100, 100, 100),
    new THREE.MeshLambertMaterial({ color: 0x000000 })
  );

}

CHRYSICS.GEOMETRY.Primitive.prototype = {

  setOrientation: function(dir) {

    var origin = new CHRYSICS.Vector3(0, 1, 0);
    var target = dir.normalize();

    var axis = origin.crossProduct(target).normalize();
    var angle = Math.acos(origin.dotProduct(target));

    var rotation = new CHRYSICS.Matrix3();
    rotation.setFromAxisAngle(axis, angle);

    var m = new THREE.Matrix4();
    var es = rotation.elements;
    m.set(
      es[0], es[1], es[2], 0,
      es[3], es[4], es[5], 0,
      es[6], es[7], es[8], 0,
          0,     0,     0, 1
    );

    this.geometry.applyMatrix(m);
 
  },

  getGeometry: function() {
    return this.geometry;
  }

};

