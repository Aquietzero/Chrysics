/**
 * Geometries.js defines some basic geometries for the demostration
 * of the geometrical tests. Although THREE.js pre-defines some 
 * geometries, some of them are not basic enough such as point and
 * line and so on.
 *
 * At the same time, these geometries should be able to combine with
 * the data structure that I defined in the name space of CHRYSICS.
 */

CHRYSICS.GEOMETRY = {

  /**
   * Returns the rotation matrix according to the orientation.
   */
  getOrientation: function(dir) {

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

    return m;
 
  },

};

/**
 * A point in mathematics is represented as a little ball in demo.
 */
CHRYSICS.GEOMETRY.Point = function(point, radius, color) {

  this.point = point;

  this.geometry = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 20, 20),
    new THREE.MeshLambertMaterial({ color: color })
  );
  this.geometry.position.set(
    this.point.x,
    this.point.y,
    this.point.z
  );

}

CHRYSICS.GEOMETRY.Point.prototype = {

  getGeometry: function() {
  
    return this.geometry;
  
  },

  setPosition: function(pos) {

    this.geometry.position.set(
      pos.x, pos.y, pos.z
    );
  
  },

  move: function(iterate) {

    iterate(this.point);
    this.geometry.position.set(
      this.point.x,
      this.point.y,
      this.point.z
    );

  },

}

/**
 * A segment or ray or line in mathematics is represented as a 
 * slim cylinda in demo.
 */
CHRYSICS.GEOMETRY.Segment = function(begin, end) {

  this.p = begin;
  this.dir = end.sub(begin);
  this.len = this.dir.magnitude();
  this.pos = this.p.add(this.dir.mul(0.5));

}

CHRYSICS.GEOMETRY.Segment.prototype = {

  initWithDots: function(radius, offset, color) {

    this.geometry = new THREE.Object3D();

    var step = this.len / offset;
    var p, pos;
    for (var i = 0; i < step; ++i) {

      pos = this.p.add(this.dir.mul(i * offset/ this.len));

      p = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 30, 30),
        new THREE.MeshLambertMaterial({
          color: color,
          wireframe: false,
        })
      );
      p.position.set(pos.x, pos.y, pos.z);

      this.geometry.add(p);

    }

  },

  initWithCylinder: function(radius, color) {

    this.geometry = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, this.len, 50, 50, true),
      new THREE.MeshLambertMaterial({
        color: color,
        wireframe: false,
      })
    );

    var m = CHRYSICS.GEOMETRY.getOrientation(this.dir);
    this.geometry.applyMatrix(m);

    this.geometry.position.set(
      this.pos.x,
      this.pos.y,
      this.pos.z
    );

  },

  getGeometry: function() {
  
    return this.geometry;
  
  },

}

/**
 * Cone.
 */
CHRYSICS.GEOMETRY.Cone = function(radius, height, color, pos, dir) {

  this.dir = dir;
  this.pos = pos;

  this.geometry = new THREE.Mesh(
    new THREE.CylinderGeometry(0, radius, height, 50, 50, false),
    new THREE.MeshLambertMaterial({ color: color })
  );

  var m = CHRYSICS.GEOMETRY.getOrientation(this.dir);
  this.geometry.applyMatrix(m);

  this.geometry.position.set(
    this.pos.x,
    this.pos.y,
    this.pos.z
  );

}

CHRYSICS.GEOMETRY.Cone.prototype = {

  getGeometry: function() {
  
    return this.geometry;
  
  },

}

/**
 * A plane in mathematics is represented as a flat solid cube in
 * demo.
 */
CHRYSICS.GEOMETRY.Plane = function(plane, size, color) {

  this.pos = plane.point;
  this.dir = plane.n;

  this.geometry = new THREE.Mesh(
    new THREE.CubeGeometry(size, 1, size),
    new THREE.MeshLambertMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.8,
    })
  );

  var m = CHRYSICS.GEOMETRY.getOrientation(this.dir);
  this.geometry.applyMatrix(m);
  this.geometry.position.set(this.pos.x, this.pos.y, this.pos.z);

}

CHRYSICS.GEOMETRY.Plane.prototype = {

  getGeometry: function() {

    return this.geometry;
  
  },

}

/**
 * AABB.
 */
CHRYSICS.GEOMETRY.AABB = function(aabb, color) {

  this.geometry = new THREE.Mesh(
    new THREE.CubeGeometry(aabb.rx * 2, aabb.ry * 2, aabb.rz * 2),
    new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
    })
  );

}

CHRYSICS.GEOMETRY.AABB.prototype = {

  getGeometry: function() {

    return this.geometry;
  
  },

}

/**
 * Coordinate.
 */
CHRYSICS.GEOMETRY.Coordinate = function(size) {

  this.geometry = new THREE.Object3D();

  var origin = new CHRYSICS.GEOMETRY.Point(
    new CHRYSICS.Point(0, 0, 0),
    10,
    0xffff00
  );

  var axisX = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Point(-size, 0, 0),
    new CHRYSICS.Point(size, 0, 0)
  );
  axisX.initWithCylinder(3, 0xff0000);

  var axisY = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Point(0, -size, 0),
    new CHRYSICS.Point(0, size, 0)
  );
  axisY.initWithCylinder(3, 0x00ff00);

  var axisZ = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Point(0, 0, -size),
    new CHRYSICS.Point(0, 0, size)
  );
  axisZ.initWithCylinder(3, 0x0000ff);

  var coneX = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0xff0000,
    new CHRYSICS.Point(size, 0, 0),
    new CHRYSICS.Vector3(1, 0, 0)
  );

  var coneY = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0x00ff00,
    new CHRYSICS.Point(0, size, 0),
    new CHRYSICS.Vector3(0, 1, 0)
  );

  var coneZ = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0x0000ff,
    new CHRYSICS.Point(0, 0, size),
    new CHRYSICS.Vector3(0, 0, 1)
  );

  this.geometry.add(origin.getGeometry());
  this.geometry.add(axisX.getGeometry());
  this.geometry.add(axisY.getGeometry());
  this.geometry.add(axisZ.getGeometry());
  this.geometry.add(coneX.getGeometry());
  this.geometry.add(coneY.getGeometry());
  this.geometry.add(coneZ.getGeometry());

}

CHRYSICS.GEOMETRY.Coordinate.prototype = {

  getGeometry: function() {

    return this.geometry;
  
  },

}
