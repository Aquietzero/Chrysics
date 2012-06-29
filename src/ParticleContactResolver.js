/**
 * Particle contact resolver resolves the velocity and interpenetration
 * of a contact between a pair of objects.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleContactResolver = function(iterations) {

  this.iterations = iterations;
  this.iterationsUsed = 0;

}

CHRYSICS.ParticleContactResolver.prototype = {

  setIterations: function(iterations) {
  
    this.iterations = iterations;
  
  },

  resolveContacts: function(contacts, duration) {
  
    this.iterationsUsed = 0;
    while (this.iterationsUsed < this.iterations) {

      var separatingVelocity;
      var max = 0;
      var maxIndex = 0;

      for (var i = 0; i < contacts.length; ++i) {

        separatingVelocity = contacts[i].calculateSeparatingVelocity();
        if (separatingVelocity < max) {
          max = separatingVelocity;
          maxIndex = i;
        }
        
      }

      contacts[i].resolve(duration);
      this.iterationsUsed++;

    }
  
  },

}
