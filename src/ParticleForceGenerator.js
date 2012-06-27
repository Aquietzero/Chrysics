/**
 * Particle Force Generator generates many kinds of forces.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

/**
 * Gravity:
 *
 * f = mg
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

/**
 * Drag:
 *
 * The force is calculated in the following way:
 * 
 *   f = -û * (k1 * |û| + k2 * |û| * |û|)
 *
 * where û is the velocity of the particle.
 */
CHRYSICS.ParticleDrag = function(k1, k2) {

  this.k1 = k1 || 0.0001;
  this.k2 = k2 || 0.0002;

}

CHRYSICS.ParticleDrag.prototype = {

  updateForce: function(particle, duration) {
  
    var speed = particle.getVelocity().magnitude();
    var force = particle.getVelocity().normalize().inverse();
    var dragCoefficient = this.k1 * speed + this.k2 * speed * speed;

    force.mulScalar(dragCoefficient);
    particle.addForce(force);
  
  },

}

/**
 * Anchored Spring:
 *
 * f = -k(|i| - i0)î
 */
CHRYSICS.AnchoredSpring = function(anchor, k, restLength) {

  this.anchor = anchor;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.AnchoredSpring.prototype = {

  updateForce: function(particle, duration) {
  
    var spring, deltaL, force;

    spring = particle.position.sub(this.anchor);
    deltaL = spring.magnitude() - this.restLength;
    force  = spring.normalize().mul(-this.k * deltaL);

    particle.addForce(force);
  
  },

}
