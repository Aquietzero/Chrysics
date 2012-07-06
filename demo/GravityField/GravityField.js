/**
 * A simple demo shows the gravity particle field.
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

var GravityField = function(container) {

  this.worldPhysics   = new CHRYSICS.World();
  this.worldRendering = new RenderingWorld(container);

  this.initWorld();

}

GravityField.prototype = {

  initWorld: function() {

    var gravity = new CHRYSICS.Gravity(
      new CHRYSICS.Vector3(0, -10, 0)
    );

    for (var i = 0; i < 200; ++i) {

      ball = new Ball(CHRYSICS.Utils.random(5, 10));

      this.worldRendering.add(ball);
      this.worldPhysics.add(ball.getPhysique());

      this.worldPhysics.addForceRegistry(ball.getPhysique(), gravity);

    }

  },

  animate: function() {

    var self = this;
    self.worldPhysics.startFrame();

    var loop = function() {

      self.worldPhysics.simulate(0.033);
      self.worldRendering.render();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
