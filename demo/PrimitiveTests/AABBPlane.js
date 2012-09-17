/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var AABBPlane = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';
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

    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 600, 0x333333);
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 0.5);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.plane);
    this.world.add(this.aabb);
  },

  iterate: function() {
    var offset = 1;
    var y = -300;
    var self = this;
    var aabb = self.aabb.aabb;
    var p = self.plane.plane;
    return function() {

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;

      self.aabb.setPosition(0, y, 0);
      if (CHRYSICS.BV.PrimitiveTest.AABBPlane(aabb, p))
        self.aabb.setColor(0x990000);
      else
        self.aabb.setColor(0x333333);
    
    };
  },

  animate: function() {
    var self = this;
    var iter = this.iterate();
    var i = 0;
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
