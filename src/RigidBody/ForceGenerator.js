/**
 * Force Generator generates many kinds of forces.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

/**
 * Normal force
 */
CHRYSICS.Force = function(force, position, time) {

  this.force = force;
  this.position = position;
  this.time = time || Infinity;
  this.clock = 0;

}

CHRYSICS.Force.prototype = {

  updateForce: function(body, duration) {

    var mass = body.getMass();
    if (mass != Infinity && this.clock < this.time) {
      body.addForceAtPoint(this.force, this.position);
      this.clock++;
    }
  
  }

}

/**
 * Gravity:
 *
 * f = mg
 */
CHRYSICS.Gravity = function(gravity) {

  this.gravity = gravity;

}

CHRYSICS.Gravity.prototype = {

  updateForce: function(body, duration) {
  
    var mass = body.getMass();
    if (mass != Infinity)
      body.addForceAtPoint(this.gravity.mul(mass));

  },

}

/**
 * Spring:
 *
 * f = kx
 *
 * @param {Vector3} connectPoint 
 *   The point of this rigid body the spring is connected to, which is in the local
 *   coordinate of this rigid body.
 * @param {Vector3} otherConnectPoint
 *   The point of the other rigid body the spring is connected to, which is in the
 *   local coordinate of the other rigid body.
 * @param {RigidBody} body
 *   The other rigid body that the spring is connected to.
 * @param {Number} k
 *   The spring constant.
 * @param {Number} restLength
 *   The length of the spring when there are no forced acting on it.
 */
CHRYSICS.Spring = function(connectPoint, otherConnectPoint, body, k, restLength) {

  this.connectPoint = connectPoint;
  this.otherConnectPoint = otherConnectPoint;
  this.otherBody = body;
  this.k = k;
  this.restLength = restLength;

}

CHRYSICS.Spring.prototype = {

  updateForce: function(body, duration) {

    var end1 = body.getPointInWorld(this.connectPoint);
    var end2 = this.other.getPointInWorld(this.otherConnectPoint);

    var spring = end1.sub(end2);
    var deltaL = spring.magnitude() - this.restLength;

    var force = spring.normalize().mulScalar(-this.k * deltaL);

    body.addForceAtPoint(force, end1);
   
  },
    
}

/**
 * Aero
 *
 *   f = Av
 *
 * where 
 *   f is the final force. 
 *   A is the aero tensor. 
 *   v is the velocity of the wind.
 */
CHRYSICS.Aero = function(tensor, position, windSpeed) {

  this.tensor    = tensor;
  this.position  = position;
  this.windSpeed = windSpeed;

}
