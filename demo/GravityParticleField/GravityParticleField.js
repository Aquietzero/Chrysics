/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Ball = function(radius) {

  this.particle = new CHRYSICS.Particle();
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshLambertMaterial({color: 0xff0000})
  );
  
  this.init();

}

Ball.prototype = {

  init: function() {

    this.particle.setVelocity(new CHRYSICS.Vector3(
      CHRYSICS.Utils.random(-70, 70),
      CHRYSICS.Utils.random(-70, 70),
      CHRYSICS.Utils.random(-70, 70)
    ));
    this.particle.setMass(2.0);

  },

  getGeometry: function() {
  
    return this.sphere;
  
  },

  getParticle: function() {
  
    return this.particle;
  
  }

}

var GravityParticleField = function(container) {

  this.worldPhysics   = new CHRYSICS.ParticleWorld();
  this.worldRendering = new RenderingWorld(container);

  this.initWorld();

}

GravityParticleField.prototype = {

  initWorld: function() {

    var gravity = new CHRYSICS.ParticleGravity(
      new CHRYSICS.Vector3(0, -10, 0)
    );

    for (var i = 0; i < 50; ++i) {

      ball = new Ball(CHRYSICS.Utils.random(5, 10));

      this.worldRendering.add(ball);
      this.worldPhysics.add(ball.getParticle());

      this.worldPhysics.addForceRegistry(ball.getParticle(), gravity);

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
