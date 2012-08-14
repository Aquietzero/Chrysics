/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ClosestPoint = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

}

ClosestPoint.prototype = {

  initWorld: function() {

    var testPlane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(10, 10, 10),
      new CHRYSICS.Point(0, 0, 0)
    );
    var testPoint = new CHRYSICS.Point(82, 216, 186);
    var closestPoint = CHRYSICS.BV.ClosestPoint.onPlaneToPoint(testPlane, testPoint);
    var line = new CHRYSICS.GEOMETRY.Segment(testPoint, closestPoint);
    line.initWithDots(2, 10, 0xffff00);

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400));

    this.worldRendering.add(new CHRYSICS.GEOMETRY.Plane(
      testPlane, 500, 0x330033
    ));
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Point(
      testPoint, 7, 0xffff00
    ));
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Point(
      closestPoint, 7, 0xffff00
    ));
    this.worldRendering.add(line);

  },

  animate: function() {

    var self = this;
    var loop = function() {

      self.worldRendering.render();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
