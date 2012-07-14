/**
 * Particle contact deals with particle collision resolution.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

/**
 * @constructor
 * @param {object} contactPair The pair of particle or objects which is detected to be
 *  in contact currently. This parameter should be given in the form :
 *  {
 *    particle1:p1, 
 *    particle2:p2
 *  }
 * @param {number} restitution The restitution coefficient of the contact pair.
 * @param {Vector3} contactNormal The contact normal vector of the contact pair. Actually,
 *  the contact normal can be calculated through the positions of the contact pair. But if
 *  the contact pair is consisted of a particle and a non-simulating physical model, then
 *  the position of the physical model remains unknown. So the contact normal can only be
 *  calculated outside and passed as an argument.
 * @param {number} penetration The penetration of the contact pair, which is given by 
 *  the collision detector. A negative penetration represents two objects are not having
 *  any penetration. A zero penetration represents two objects are merely touching with
 *  each other.
 */
CHRYSICS.ParticleContact = function(contactPair, restitution, contactNormal, penetration) {

  this.particle1 = contactPair.particle1;
  this.particle2 = contactPair.hasOwnProperty('particle2') ? contactPair.particle2 : null;

  this.restitution = restitution;
  this.contactNormal = contactNormal;

  this.penetration = penetration;

}

CHRYSICS.ParticleContact.prototype = {

  resolve: function(duration) {
  
    this.resolveVelocity(duration);
    this.resolveInterPenetration();
  
  },

  /**
   * @description The separating velocity refers to the total speed at which the two objects
   * are moving apart, which is calculated through the following formula:
   *                 _____
   *   Vs = (Va - Vb)||n||
   *       _____
   * where ||n|| is the contact normal of the contact pair.
   */
  calculateSeparatingVelocity: function() {
  
    var relativeVelocity = this.particle1.getVelocity();
    if (this.particle2)
      relativeVelocity.sub(this.particle2.getVelocity());

    return relativeVelocity.dotProduct(this.contactNormal);
  
  },

  resolveVelocity: function(duration) {

    var separatingVelocity = this.calculateSeparatingVelocity();

    // If the separating is larger than 0, then the two objects are moving apart.
    if (separatingVelocity > CHRYSICS.Const.ZERO)
      return;

    var newSeparatingVelocity = -separatingVelocity * this.restitution;

    var accCausedVelocity = this.particle1.getAcceleration();
    if (this.particle2)
      accCausedVelocity.subVector(this.particle2.getAcceleration());

    var accCausedSeparatingVelocity = 
      accCausedVelocity.dotProduct(this.contactNormal).mul(duration);

    if (accCausedSeparatingVelocity < 0) {

      newSeparatingVelocity += accCausedSeparatingVelocity * this.restitution;
      if (newSeparatingVelocity < 0)
        newSeparatingVelocity = 0;

    }

    // Calculate the total impulse with : v' = v + Sum(Gi) / m
    var deltaVelocity = newSeparatingVelocity - separatingVelocity;

    var totalMass = this.particle1.getMass();
    if (this.particle2)
      totalMass += this.particle2.getMass();

    var totalImpulse = deltaVelocity / totalMass;

    var impulsePerMass = this.contactNormal.mul(totalImpulse);

    // Set new velocity after collision.
    this.particle1.setVelocity(
      this.particle1.getVelocity().add(impulsePerMass.mul(this.particle1.getInverseMass()))
    );
    if (this.particle2) {
      this.particle2.setVelocity(
        this.particle2.getVelocity().add(impulsePerMass.mul(-this.particle2.getInverseMass()))
      );
    }
  
  },

  resolveInterPenetration: function() {

    // Objects are not penetrating.
    if (this.penetration <= 0)
      return;

    var totalInverseMass = this.particle1.getInverseMass();
    if (this.particle2)
      totalInverseMass += this.particle2.getInverseMass();

    // Both objects are of infinity mass. Then none of them need to move.
    if (totalInverseMass <= 0)
      return;

    var movePerInverseMass = this.contactNormal.mul(this.penetration * totalInverseMass);

    // Set positions.
    this.particle1.position.addVector(
      movePerInverseMass.mul(this.particle1.getInverseMass());
    );
    if (this.particle2) {
      this.particle2.position.addVector(
        movePerInverseMass.mul(-this.particle2.getInverseMass());
      );
    }

  }

}
