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

  getGeometry: function() {
  
    return this.sphere;
  
  },

  getPhysique: function() {
  
    return this.body;
  
  }

}

