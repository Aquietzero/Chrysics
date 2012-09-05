
/**
 * A segment or ray or line in mathematics is represented as a 
 * slim cylinda in demo.
 */
CHRYSICS.GEOMETRY.Segment = function(segment) {

  this.segment = segment;

  this.p   = segment.begin;
  this.dir = segment.end.sub(segment.begin);
  this.len = this.dir.magnitude();
  this.pos = this.p.add(this.dir.mul(0.5));

}

CHRYSICS.GEOMETRY.Segment.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
    } else if (arguments.length == 3) {
      this.geometry.position.set(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },

  initWithDots: function(radius, offset, color) {

    this.geometry = new THREE.Object3D();

    var step = this.len / offset;
    var p, pos;
    for (var i = 0; i < step; ++i) {

      pos = this.p.add(this.dir.mul(i * offset/ this.len));

      p = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 30, 30),
        new THREE.MeshLambertMaterial({ color: color })
      );
      p.position.set(pos.x, pos.y, pos.z);

      this.geometry.add(p);

    }

  },

  initWithCylinder: function(radius, color) {

    this.geometry = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, this.len, 50, 50, true),
      new THREE.MeshLambertMaterial({ color: color })
    );

    this.setOrientation(this.dir);
    this.setPosition(this.pos);

  },

}, CHRYSICS.GEOMETRY.Primitive.prototype);
