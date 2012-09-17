/**
 * The model of stanford bunny.
 */

var UserObject = function(object, scalar) {
  this.object = object;
  this.object.scale.set(scalar, scalar, scalar);
}

UserObject.prototype = {

  getData: function() {
    var vs = [];
    var data = this.object.children[0].geometry.vertices;

    for (var i = 0; i < data.length; ++i) {
      vs.push(new CHRYSICS.Vector3(
        this.object.position.x + data[i].x * this.object.scale.x,
        this.object.position.y + data[i].y * this.object.scale.y,
        this.object.position.z + data[i].z * this.object.scale.z
      ));
    }

    return vs;
  },

  setPosition: function(pos) {
    this.object.position.set(pos.x, pos.y, pos.z);
  },

  getGeometry: function() {
    return this.object;
  },

  getCentroid: function() {
    return new CHRYSICS.Vector3(
      this.object.position.x,
      this.object.position.y,
      this.object.position.z
    );
  },

}


