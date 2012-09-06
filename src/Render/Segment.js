
/**
 * A segment or ray or line in mathematics is represented as a 
 * slim cylinda in demo.
 */
CHRYSICS.GEOMETRY.Segment = function(segment) {

  this.segment = segment;

}

CHRYSICS.GEOMETRY.Segment.prototype = _.extend({

  initWithDots: function(radius, offset, color) {

    var p   = this.segment.begin;
    var dir = this.segment.end.sub(this.segment.begin);
    var len = dir.magnitude();
    var pos = p.add(dir.mul(0.5));

    this.geometry = new THREE.Object3D();

    var step = len / offset;
    var dot, pos;
    for (var i = 0; i < step; ++i) {

      pos = p.add(dir.mul(i * offset / len));

      dot = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 30, 30),
        new THREE.MeshLambertMaterial({ color: color })
      );
      dot.position.set(pos.x, pos.y, pos.z);

      this.geometry.add(dot);

    }

  },

  initWithCylinder: function(radius, color) {

    var dir = this.segment.end.sub(this.segment.begin);
    var len = dir.magnitude();
    var pos = this.segment.begin.add(dir.mul(0.5));

    this.geometry = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, len, 50, 50, true),
      new THREE.MeshLambertMaterial({ color: color })
    );

    this.setOrientation(dir);
    this.setPosition(pos);

  },

  setSegment: function(segment) {

    this.segment = segment;
  
  },

  setPosition: function() {

    var dir = this.segment.end.sub(this.segment.begin);

    if (arguments.length == 1)
      var pos = new CHRYSICS.Vector3(arguments[0].x, arguments[0].y, arguments[0].z);
    else if (arguments.length == 3)
      var pos = new CHRYSICS.Vector3(arguments[0], arguments[1], arguments[2]);

    this.geometry.position.set(pos.x, pos.y, pos.z);
    this.segment.begin = pos.sub(dir.mul(0.5));
    this.segment.end   = pos.add(dir.mul(0.5));

  },

}, CHRYSICS.GEOMETRY.Primitive.prototype);
