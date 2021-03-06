/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SphereTriangle = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SphereTriangle.prototype = {

  initWorld: function() {

    var sphere = new CHRYSICS.Sphere(
      new CHRYSICS.Vector3(-150, -150, -150),
      50
    );

    var a = new CHRYSICS.Point(100, -100, 100),
        b = new CHRYSICS.Point(-100, -100, 100),
        c = new CHRYSICS.Point(0, 100, -100);
    var triangle = new CHRYSICS.Triangle(a, b, c);

    this.sphere = new CHRYSICS.GEOMETRY.Sphere(sphere, 0x333333, 0.5);
    this.triangle = new CHRYSICS.GEOMETRY.Triangle(triangle, 0x333333, 0.5);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.sphere);
    this.world.add(this.triangle);
    
  },

  iterate: function() {

    var offset = new CHRYSICS.Vector3(1, 1, 1);
    var pos = new CHRYSICS.Vector3(-150, -150, -150);
    var self = this;
    var s = self.sphere.sphere;
    var triangle = self.triangle.triangle;
    return function() {

      if (pos.y < -150)
        offset = new CHRYSICS.Vector3(1, 1, 1);
      else if (pos.y > 150) {
        offset = new CHRYSICS.Vector3(-1, -1, -1);
      }
      pos.addVector(offset);

      self.sphere.setPosition(pos.x, pos.y, pos.z);
      var intersect = CHRYSICS.BV.PrimitiveTest.sphereTriangle(
        s, triangle.v1, triangle.v2, triangle.v3
      );
      if (intersect) {
        self.sphere.setColor(0x990000);
        self.triangle.setColor(0x990000);
      } else {
        self.sphere.setColor(0x333333);
        self.triangle.setColor(0x000000);
      }
    
    };
  
  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      self.world.render();
      iter();

      if (self.state == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.state = 'STOP';
  
  }

}
