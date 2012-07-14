/**
 * Force Registry keeps track of how many kinds of
 * forces would apply to each rigid body.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.ForceRegistry = function() {

  this.registrations = [];

}

CHRYSICS.ForceRegistry.prototype = {

  add: function(body, force) {
  
    this.registrations.push({
      body:  body,
      force: force
    });
  
  },

  remove: function(body, force) {
  
    var length = this.registrations.length;
    for (var i = 0; i < length; ++i) {

      if (body === this.registrations[i].body) {

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
      curr_registry.force.updateForce(curr_registry.body, duration);
    }
  
  },

}
