/**
 * Rigid body world.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.World = function(iterations) {

  this.bodies = [];

  this.forceRegistry   = new CHRYSICS.ForceRegistry();
  // this.particleContactResolver = new CHRYSICS.ParticleContactResolver();

}

CHRYSICS.World.prototype = {

  add: function(body) {

    this.bodies.push(body);
  
  },

  addForceRegistry: function(body, force) {

    this.forceRegistry.add(body, force);
  
  },

  startFrame: function() {
  
    for (var i = 0; i < this.bodies.length; ++i) {
      this.bodies[i].clearAccumulators();
      this.bodies[i].calDerivedData();
    }
  
  },

  integrate: function(duration) {
  
    for (var i = 0; i < this.bodies.length; ++i)
      this.bodies[i].integrate(duration);
    
  },

  simulate: function(duration) {
  
    this.forceRegistry.updateForces(duration);
    this.integrate(duration);
  
  }

}
