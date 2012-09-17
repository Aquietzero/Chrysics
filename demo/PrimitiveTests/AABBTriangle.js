/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var AABBTriangle = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';
}

AABBTriangle.prototype = {

  initWorld: function() {
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
    
    var a = new CHRYSICS.Point(100, -100, 100),
        b = new CHRYSICS.Point(-100, -100, 100),
        c = new CHRYSICS.Point(0, 100, -100);
    var triangle = new CHRYSICS.Triangle(a, b, c);

    this.aabb     = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 0.5);
    this.triangle = new CHRYSICS.GEOMETRY.Triangle(triangle, 0x333333, 0.5);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.aabb);
    this.world.add(this.triangle);
  },

  iterate: function() {
    var offset = new CHRYSICS.Vector3(1, 1, 1);
    var pos = new CHRYSICS.Vector3(-150, -150, -150);
    var self = this;
    var aabb = self.aabb.aabb;
    var triangle = self.triangle.triangle;
    return function() {

      if (pos.y < -150)
        offset = new CHRYSICS.Vector3(1, 1, 1);
      else if (pos.y > 150)
        offset = new CHRYSICS.Vector3(-1, -1, -1);
      pos.addVector(offset);

      self.aabb.setPosition(pos);
      var intersect = CHRYSICS.BV.PrimitiveTest.AABBTriangle(
        aabb, triangle.v1, triangle.v2, triangle.v3
      );
      if (intersect) {
        self.aabb.setColor(0x990000);
        self.triangle.setColor(0x990000);
      } else {
        self.aabb.setColor(0x333333);
        self.triangle.setColor(0x333333);
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
