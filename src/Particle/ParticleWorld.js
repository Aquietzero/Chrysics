/**
 * Particle world.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleWorld = function(iterations) {

  this.particles = [];

  this.particleForceRegistry   = new CHRYSICS.ParticleForceRegistry();
  // this.particleContactResolver = new CHRYSICS.ParticleContactResolver();

}

CHRYSICS.ParticleWorld.prototype = {

  add: function(particle) {

    this.particles.push(particle);
  
  },

  addForceRegistry: function(particle, force) {

    this.particleForceRegistry.add(particle, force);
  
  },

  startFrame: function() {
  
    for (var i = 0; i < this.particles.length; ++i)
      this.particles[i].clearForces();
  
  },

  integrate: function(duration) {
  
    for (var i = 0; i < this.particles.length; ++i)
      this.particles[i].integrate(duration);
    
  },

  simulate: function(duration) {
  
    this.particleForceRegistry.updateForces(duration);
    this.integrate(duration);
  
  }

}
