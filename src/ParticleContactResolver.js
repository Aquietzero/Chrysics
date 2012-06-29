/**
 * Particle contact resolver resolves the velocity and interpenetration
 * of a contact between a pair of objects.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ParticleContactResolver = function(iteration) {

  this.iteration = iteration;
  this.iterationUsed = 0;

}

CHRYSICS.ParticleContactResolver.prototype = {

  setIteration: function(iteration) {
  
    this.iteration = iteration;
  
  },

}
