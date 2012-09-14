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

    // The orientation is based on the world coordinate.
    var origin = this.prevOrigin || new CHRYSICS.Vector3(0, 1, 0);
    var target = dir.normalize();

    // If the previous orientation is the same as the current one, then
    // there is no need to re-orient.
    if (origin.equalsTo(target))
      return;

    var axis = origin.crossProduct(target).normalize();
    var angle = Math.acos(origin.dotProduct(target));

    var rotation = new CHRYSICS.Matrix3();
    rotation.setFromAxisAngle(axis, angle);

    // While applying the new rotation, keep the current position.
    var m = new THREE.Matrix4();
    var pos = this.geometry.position;
    var es = rotation.elements;
    m.set(
      es[0], es[1], es[2], pos.x,
      es[3], es[4], es[5], pos.y,
      es[6], es[7], es[8], pos.z,
          0,     0,     0, 1
    );
    this.geometry.applyMatrix(m);
    this.prevOrigin = dir;
 
  },

  getGeometry: function() {
    return this.geometry;
  }

};

