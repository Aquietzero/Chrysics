/**
 * Icosahedron.
 */
var Icosahedron = function(radius, color, opacity) {
  var geom = new THREE.IcosahedronGeometry(radius, 1);
  var solidMesh = new THREE.MeshLambertMaterial({ 
    transparent: true,
    opacity: opacity,
    color: color,
    wireframe: false 
  });
  var frameMesh = new THREE.MeshLambertMaterial({ 
    color: 0x000000,
    wireframe: true
  });

  var solid = new THREE.Mesh(geom, solidMesh);
  var frame = new THREE.Mesh(geom, frameMesh);

  this.geometry = new THREE.Object3D();
  this.geometry.add(solid);
  this.geometry.add(frame);

  this.body   = new CHRYSICS.RigidBody();
  this.init();
}

Icosahedron.prototype = {

  init: function() {
    this.body.setVelocity(new CHRYSICS.Vector3(
      0, 0, 0
    ));
    this.body.setInverseInertiaTensor(new CHRYSICS.Matrix3(
      -0.1,    0,    0,
         1, -0.5,    0,
         0,    0, -0.1
    ));
    this.body.setMass(2.0);
  },

  getGeometry: function() {
    return this.geometry;
  },

  getData: function() {
    var data = [];
    var vs = this.geometry.children[0].geometry.vertices;
    for (var i = 0; i < vs.length; ++i) {
      data.push(new CHRYSICS.Vector3(
        this.geometry.position.x + vs[i].x,
        this.geometry.position.y + vs[i].y,
        this.geometry.position.z + vs[i].z
      ));
    }
    return data;
  },

  getPhysique: function() {
    return this.body;
  },

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

  setColor: function(color) {
    this.geometry.children[0].material.color.setHex(color);
  },

}
