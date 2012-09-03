/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var AABBPlane = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

}

AABBPlane.prototype = {

  initWorld: function() {

    var plane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0.3, 1, 0.7),
      new CHRYSICS.Vector3(0, 0, 0)
    );
    var aabb = new CHRYSICS.BV.AABB([
      new CHRYSICS.Vector3(-100, -25, -100),
      new CHRYSICS.Vector3( 100, -25, -100),
      new CHRYSICS.Vector3( 100, -25,  100),
      new CHRYSICS.Vector3(-100, -25,  100),
      new CHRYSICS.Vector3(-100,  25, -100),
      new CHRYSICS.Vector3( 100,  25, -100),
      new CHRYSICS.Vector3( 100,  25,  100),
      new CHRYSICS.Vector3(-100,  25,  100)
    ]);

    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 500, 0x000033);
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0xffff00, 1);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.world.add(this.plane);
    this.world.add(this.aabb);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -300;
    var rst;
    var self = this;
    var aabb = self.aabb.aabb;
    var p = self.plane.plane;
    return function() {

      if (y >= 150)
        offset = -1;
      if (y <= -150)
        offset = 1;
      y += offset;

      self.aabb.setPosition(0, y, 0);
      if (CHRYSICS.PrimitiveTest.AABBPlane(aabb, p))
        self.aabb.setColor(0xff0000);
      else
        self.aabb.setColor(0xffff00);
    
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
