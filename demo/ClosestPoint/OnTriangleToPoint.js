/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var OnTriangleToPoint = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

OnTriangleToPoint.prototype = {

  initWorld: function() {

    var a = new CHRYSICS.Point(100, -100, 100),
        b = new CHRYSICS.Point(-100, -100, 100),
        c = new CHRYSICS.Point(0, 100, -100);

    this.triangle = new CHRYSICS.GEOMETRY.Triangle(a, b, c, 0x880088);

    // Test point out of the triangle.
    this.testPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
      ), 7, 0xffff00
    );

    // Closest point on the plane to the testing point.
    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      CHRYSICS.BV.ClosestPoint.onTriangleToPoint(
        a, b, c, this.testPoint.point
      ), 7, 0xffff00
    );

    // A dotted line between the closest point and the testing point.
    this.line = new CHRYSICS.GEOMETRY.Segment(
      this.testPoint.point, 
      this.closestPoint.point
    );
    this.line.initWithDots(2, 10, 0xffff00);

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.worldRendering.add(this.triangle);
    this.worldRendering.add(this.testPoint);
    this.worldRendering.add(this.closestPoint);
    this.worldRendering.add(this.line);

  },

  iterate: function() {

    var angle = 0;

    return function(pos) {
      angle += 0.01;
      pos.x += 2 * Math.sin(angle),
      pos.z += 2 * Math.cos(angle)
    };

  },

  testing: function(iterate) {

    this.testPoint.move(iterate);
    var p = CHRYSICS.BV.ClosestPoint.onPlaneToPoint(
      this.testPlane, 
      this.testPoint.point
    );
    this.closestPoint.setPosition(p);
   
  },

  animate: function() {

    var self = this;
    var iterate = this.iterate();
    var loop = function() {

      // self.testing(iterate);
      self.worldRendering.render();

      if (self.status == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.status = 'STOP';
  
  },


}
