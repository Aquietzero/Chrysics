/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SpherePlane = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

}

SpherePlane.prototype = {

  initWorld: function() {

    var plane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0.3, 1, 0.7),
      new CHRYSICS.Vector3(0, 0, 0)
    );
    var sphere = new CHRYSICS.Sphere(
      new CHRYSICS.Vector3(0, -300, 0),
      50
    );

    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 500, 0x000033);
    this.sphere = new CHRYSICS.GEOMETRY.Sphere(sphere, 50, 0xffff00);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.world.add(this.plane);
    this.world.add(this.sphere);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -300;
    var rst;
    var self = this;
    var s = self.sphere.sphere;
    var p = self.plane.plane;
    return function() {

      if (y >= 150)
        offset = -1;
      if (y <= -150)
        offset = 1;
      y += offset;

      self.sphere.setPosition(0, y, 0);
      rst = CHRYSICS.PrimitiveTest.spherePlane(s, p);

      if (rst == CHRYSICS.PrimitiveTest.INTERSECT)
        self.sphere.setColor(0xff0000);
      else
        self.sphere.setColor(0xffff00);
    
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
