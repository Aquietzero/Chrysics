/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */


var GravityField = function(container) {

  this.worldPhysics   = new CHRYSICS.World();
  this.worldRendering = new RenderingWorld(container);

  this.status = 'RUNNING';

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
      if (self.status == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.status = 'STOP';
  
  },

}
