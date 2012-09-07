/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SpherePlane = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SpherePlane.prototype = {

  initWorld: function() {

    var plane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0.3, 1, 0.7),
      new CHRYSICS.Vector3(0, 0, 0)
    );
    var sphere = new CHRYSICS.Sphere(
      new CHRYSICS.Vector3(0, -300, 0),
      100
    );

    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 650, 0x333333);
    this.sphere = new CHRYSICS.GEOMETRY.Sphere(sphere, 0x333333, 0.5);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
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

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;

      self.sphere.setPosition(0, y, 0);
      rst = CHRYSICS.BV.PrimitiveTest.spherePlane(s, p);

      if (rst == CHRYSICS.BV.PrimitiveTest.INTERSECT)
        self.sphere.setColor(0x990000);
      else
        self.sphere.setColor(0x333333);
    
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
  
  },


}
