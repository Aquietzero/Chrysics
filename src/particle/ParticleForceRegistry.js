/**
 * Particle Force Registry keeps track of how many kinds of
 * forces would apply to each particle.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleForceRegistry = function() {

  this.registrations = [];

}

CHRYSICS.ParticleForceRegistry.prototype = {

  add: function(particle, force) {
  
    this.registrations.push({
      particle: particle,
      force: force
    });
  
  },

  remove: function(particle, force) {
  
    var length = this.registrations.length;
    for (var i = 0; i < length; ++i) {

      if (particle === this.registrations[i].particle) {

        var tmp = this.registrations[i];
        this.registrations[i] = this.registrations[length - 1];
        this.registrations[length - 1] = tmp;

        this.registrations.pop();
        break;

      }

    }
  
  },

  clear: function() {
  
    this.registrations = [];
  
  },

  updateForces: function(duration) {
  
    for (var i = 0; i < this.registrations.length; ++i) {
      var curr_registry = this.registrations[i];
      curr_registry.force.updateForce(curr_registry.particle, duration);
    }
  
  },

}
