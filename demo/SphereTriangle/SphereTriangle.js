/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SphereTriangle = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

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

    this.sphere = new CHRYSICS.GEOMETRY.Sphere(sphere, 50, 0xffff00);
    this.triangle = new CHRYSICS.GEOMETRY.Triangle(a, b, c, 0xffff00);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.world.add(this.sphere);
    this.world.add(this.triangle);
    
  },

  iterate: function() {

    var offset = new CHRYSICS.Vector3(1, 1, 1);
    var pos = new CHRYSICS.Vector3(-150, -150, -150);
    var rst;
    var self = this;
    var s = self.sphere.sphere;
    var triangle = self.triangle;
    return function() {

      if (pos.y < -150)
        offset = new CHRYSICS.Vector3(1, 1, 1);
      else if (pos.y > 150) {
        console.log(pos.y);
        offset = new CHRYSICS.Vector3(-1, -1, -1);
      }
      pos.addVector(offset);

      self.sphere.setPosition(pos.x, pos.y, pos.z);
      var intersect = CHRYSICS.PrimitiveTest.shpereTriangle(
        s, 
        new CHRYSICS.Point(triangle.v1.x, triangle.v1.y, triangle.v1.z),
        new CHRYSICS.Point(triangle.v2.x, triangle.v2.y, triangle.v2.z),
        new CHRYSICS.Point(triangle.v3.x, triangle.v3.y, triangle.v3.z)
      );
      if (intersect) {
        self.sphere.setColor(0xff0000);
        self.triangle.setColor(0xff0000);
      } else {
        self.sphere.setColor(0xffff00);
        self.triangle.setColor(0xffff00);
      }
    
    };
  
  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      self.world.render();
      iter();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
