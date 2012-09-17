/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Spinning = function(container) {
  this.worldPhysics   = new CHRYSICS.World();
  this.worldRendering = new RenderingWorld(container);

  this.status = 'RUNNING';
  this.initWorld();
}

Spinning.prototype = {

  initWorld: function() {
    var force1 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, -5),
      new CHRYSICS.Vector3(80, 0, 0),
      50
    );
    var force2 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, 8),
      new CHRYSICS.Vector3(-80, 0, 0),
      50
    );
    var force3 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, 8),
      new CHRYSICS.Vector3(0, 0, 0)
    );

    this.icosahedron = new Icosahedron(90, 0x000000, 0.5);

    this.worldRendering.add(this.icosahedron);
    this.worldPhysics.add(this.icosahedron.getPhysique());

    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force1);
    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force2);
    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force3);
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
