/**
 * A ball is simply a sphere.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Ball = function(radius) {
  this.body   = new CHRYSICS.RigidBody();
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshLambertMaterial({color: 0xff0000})
  );
  
  this.init();
}

Ball.prototype = {

  init: function() {
    this.body.setVelocity(new CHRYSICS.Vector3(
      CHRYSICS.Utils.random(-70, 70),
      CHRYSICS.Utils.random(-70, 70),
      CHRYSICS.Utils.random(-70, 70)
    ));
    this.body.setInverseInertiaTensor(new CHRYSICS.Matrix3(
      -0.1, 0, 0,
      1, -0.5, 0,
      0, 0, -0.1
    ));
    this.body.setMass(2.0);
  },

  getData: function() {
    var data = [];
    var vs = this.sphere.geometry.vertices;
    for (var i = 0; i < vs.length; ++i) {
      data.push(new CHRYSICS.Vector3(
        this.sphere.position.x + vs[i].x,
        this.sphere.position.y + vs[i].y,
        this.sphere.position.z + vs[i].z
      ));
    }
    return data;
  },

  setPosition: function(pos) {
    this.body.position = pos;
    this.sphere.position.set(pos.x, pos.y, pos.z);
  },

  setColor: function(color) {
    this.sphere.material.color.setHex(color);
  },

  getGeometry: function() {
    return this.sphere;
  },

  getCentroid: function() {
    return new CHRYSICS.Vector3(
      this.sphere.position.x,
      this.sphere.position.y,
      this.sphere.position.z
    );
  },

  getPhysique: function() {
    return this.body;
  }

}

