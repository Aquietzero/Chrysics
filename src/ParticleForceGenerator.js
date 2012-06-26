/**
 * Particle Force Generator generates many kinds of forces.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleGravity = function(gravity) {

  this.gravity = gravity;

}

CHRYSICS.ParticleGravity.prototype = {

  updateForce: function(particle, duration) {
  
    var mass = particle.getMass();
    if (mass != Infinity)
      particle.addForce(this.gravity.mul(mass));

  },

}
