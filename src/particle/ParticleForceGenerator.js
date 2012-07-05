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
 * Particle Spring:
 *
 *  particle 1                    particle 2
 *     @~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~@
 *     |<-------- i0 -------->|
 *     |<------------- i ------------>|
 *
 * f = -k(|i| - i0)î
 */
CHRYSICS.ParticleSpring = function(particle, k, restLength) {

  this.particle = particle;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.ParticleSpring.prototype = {

  updateForce: function(particle, duration) {
  
    var spring, deltaL, force;

    spring = particle.position.sub(this.particle.position);
    deltaL = spring.magnitude() - this.restLength;
    force  = spring.normalize().mul(-this.k * deltaL);

    particle.addForce(force);
  
  }
    
}

/**
 * Anchored Spring:
 *
 * f = -k(|i| - i0)î
 */
CHRYSICS.AnchorSpring = function(anchor, k, restLength) {

  this.anchor = anchor;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.AnchorSpring.prototype = {

  updateForce: function(particle, duration) {
  
    var spring, deltaL, force;

    spring = particle.position.sub(this.anchor);
    deltaL = spring.magnitude() - this.restLength;
    force  = spring.normalize().mul(-this.k * deltaL);

    particle.addForce(force);
  
  },

}

/**
 * Bungee Spring: 
 *
 * Bungee spring is pretty much the same as the other kinds of springs.
 * When it is streched, namely its length is longer than its rest length,
 * it follows the Hook's law as other kinds of springs. However, when its
 * length is shorter than the rest length, it exerts no forces.
 */
CHRYSICS.BungeeSpring = function(particle, k, restLength) {

  this.particle = particle;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.BungeeSpring.prototype = {

  updateForce: function(particle, duration) {
  
    var spring, deltaL, force;

    spring = particle.position.sub(this.particle.position);
    deltaL = spring.magnitude() - this.restLength;

    if (deltaL > CHRYSICS.Const.ZERO) {
      force  = spring.normalize().mul(-this.k * deltaL);
      particle.addForce(force);
    }
  
  }
    
}

CHRYSICS.BungeeAnchorSpring = function(anchor, k, restLength) {

  this.anchor = anchor;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.BungeeAnchorSpring.prototype = {

  updateForce: function(particle, duration) {
  
    var spring, deltaL, force;

    spring = particle.position.sub(this.anchor);
    deltaL = spring.magnitude() - this.restLength;

    if (deltaL > CHRYSICS.Const.ZERO) {
      force  = spring.normalize().mul(-this.k * deltaL);
      particle.addForce(force);
    }
  
  },
    
}

/**
 * Particle Spring with Damping: 
 *
 * A real world spring will not osilating forever. Each time it streches or 
 * compresses, it is being pulled by the tension of the spring. So the total
 * energy decreases with the spring keep osilating.
 *
 *                                     -dt/2
 * P(t) = [ P(0) cos(rt) + c sin(rt) ]e
 *   a  = [ P(t) - P(0) ] / t*t - v(0)t
 *
 * where
 *              _________
 *   r = 0.5 *./ 4k - d*d 
 *   c = d*P(0) / 2r + v(0) / r
 */
CHRYSICS.ParticleFakeSpring = function(particle, k, damping) {

  this.particle = particle;
  this.k = k;
  this.damping = damping;

}

CHRYSICS.ParticleFakeSpring.prototype = {

  updateForce: function(particle, duration) {

    if (particle.getMass() == Infinity)
      return;

    var k = this.k,
        d = this.damping;

    var gamma = Math.sqrt(4*k - d*d) / 2.0;
    var pos   = particle.position.sub(this.particle.position);
    var c     = pos.mul(d / (2 * gamma)).add(particle.getVelocity().div(gamma));

    var curr_pos = 
      pos.mul(
        Math.cos(gamma * duration)
      ).add(
        c.mul(Math.sin(gamma * duration))
      ).mul(
        Math.pow(Math.E, -d * duration / 2)
      );

    var acc = 
      curr_pos.sub(pos).div(duration * duration).sub(particle.getVelocity().mul(duration));

    // console.log(acc.mul(particle.getMass()).x);
    particle.addForce(acc.mul(particle.getMass()));
  
  },

}
