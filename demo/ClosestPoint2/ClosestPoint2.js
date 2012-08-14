/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ClosestPoint2 = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

}

ClosestPoint2.prototype = {

  initWorld: function() {

    var testSegment = new CHRYSICS.Segment(
      new CHRYSICS.Point(123, 21, 321),
      new CHRYSICS.Point(28, 223, 83)
    );
    var testPoint = new CHRYSICS.Point(182, 216, 186);
    var closestPoint = CHRYSICS.BV.ClosestPoint.onSegmentToPoint(testSegment, testPoint);

    // Rendering geometries.
    var segment = new CHRYSICS.GEOMETRY.Segment(testSegment.begin, testSegment.end);
    segment.initWithCylinder(2, 0xffff00);
    var line = new CHRYSICS.GEOMETRY.Segment(testPoint, closestPoint);
    line.initWithDots(2, 10, 0xffff00);

    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400));

    this.worldRendering.add(new CHRYSICS.GEOMETRY.Point(
      testPoint, 7, 0xffff00
    ));
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Point(
      closestPoint, 7, 0xffff00
    ));
    this.worldRendering.add(segment);
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
