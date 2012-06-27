/**
 * Particle Force Generator generates many kinds of forces.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleGravity = {

  gravity: new CHRYSICS.Vector3(0, 0, -0.05),

  updateForce: function(particle, duration) {
  
    var mass = particle.getMass();
    if (mass != Infinity)
      particle.addForce(this.gravity.mul(mass));

  },

}
