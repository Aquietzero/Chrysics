/**
 * A Ray in mathematics is represented as a slim cylinda in demo.
 */
CHRYSICS.GEOMETRY.Ray = function(ray, length, radius, color) {

  this.radius = radius;
  this.color  = color;

  this.ray = ray;
  this.length = length;

  var dir = this.ray.dir;
  var len = this.length;
  var pos = this.ray.point.add(dir.mul(len * 0.5));

  this.geometry = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, len, 20, 20, true),
    new THREE.MeshLambertMaterial({ color: color })
  );

  this.setOrientation(dir);
  this.setPosition(pos);

  this.update();

}

CHRYSICS.GEOMETRY.Ray.prototype = _.extend({

  // This update only deals with the situation that only the direction
  // of the ray changes.
  update: function() {

    var dir = this.ray.dir;
    var len = this.length;
    var pos = this.ray.point.add(dir.mul(len * 0.5));

    this.setOrientation(dir);
    this.setPosition(pos);

  },

  setPosition: function() {

    var dir = this.ray.dir;
    var len = this.length;

    if (arguments.length == 1)
      var pos = new CHRYSICS.Vector3(arguments[0].x, arguments[0].y, arguments[0].z);
    else if (arguments.length == 3)
      var pos = new CHRYSICS.Vector3(arguments[0], arguments[1], arguments[2]);

    this.geometry.position.set(pos.x, pos.y, pos.z);
    this.ray.point = pos.sub(dir.mul(0.5 * len));

  },

}, CHRYSICS.GEOMETRY.Primitive.prototype);
