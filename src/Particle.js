/**
 * Particle.js defines the basic particle structure of CHRYSICS.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Particle = function() {

  this.position = new CHRYSICS.Vector3();
  this.velocity = new CHRYSICS.Vector3();
  this.acceleration = new CHRYSICS.Vector3();

  /**
   * Damping is required to remove energy added
   * through numerical instability in the integrator.
   */
  this.damping = 0.95;

  /**
   * inverseMass the 1/mass. Since in the Newton's second law,
   * we have:
   *
   *   a = F / m
   *
   * Using inverse mass to represent mass itself has a lot of 
   * advantages. For example, expressing immovable objects such
   * as walls and grounds becomes easy because their inverseMass
   * are 0. And if we use m directly, then divided-by-zero error
   * may occure sometimes. But intead, if we use inverseMass, 
   * this kind of situation will never occure since there is no
   * way to represent infinity in most programming languages.
   */
  this.inverseMass = 0;

  this.forceAccumulated = new CHRYSICS.Vector3();

}

CHRYSICS.Particle.prototype = {

  integrate: function(duration) {
  
    this.position.addScaledVector(this.velocity, duration);
    this.acceleration = this.forceAccumulated.mul(this.inverseMass);
    this.velocity.addScaledVector(this.acceleration, duration);

    // Apply the damping coeffcient.
    this.velocity.mulScalar(Math.pow(this.damping, duration));
    
    this.clearForces();
  
  },

  addForce: function(force) {
  
    this.forceAccumulated.addVector(force);
  
  },

  clearForces: function() {
  
    this.forceAccumulated.set(0, 0, 0);
  
  },

  setAcceleration: function(acc) {

    this.acceleration = acc;
  
  },

  getAcceleration: function() {
  
    return this.acceleration; 
  
  },

  setMass: function(mass) {
  
    if (mass == Infinity)
      this.inverseMass = 0;
    else if (mass == 0)
      this.inverseMass = Infinity;
    else
      this.inverseMass = 1 / mass;

  },

  getMass: function() {
  
    if (this.inverseMass == 0)
      return Infinity;
    else
      return 1 / this.inverseMass;
  
  },

  getInverseMass: function() {
  
    return this.inverseMass;
  
  },

  setVelocity: function(velocity) {

    this.velocity = velocity;

  },

  getVelocity: function() {
  
    return this.velocity;
  
  },

}
