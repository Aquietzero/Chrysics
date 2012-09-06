/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var BetweenTwoSegments = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

BetweenTwoSegments.prototype = {

  initWorld: function() {

    // Two test segments.
    var s1 = new CHRYSICS.Segment(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
      ),
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
      )
    );
    this.segment1 = new CHRYSICS.GEOMETRY.Segment(s1);
    this.segment1.initWithCylinder(2, 0x550055);

    var s2 = new CHRYSICS.Segment(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
      ),
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
      )
    );
    this.segment2 = new CHRYSICS.GEOMETRY.Segment(s2);
    this.segment2.initWithCylinder(2, 0x550055);

    // Closest points.
    var closestPoints = CHRYSICS.BV.ClosestPoint.betweenTwoSegments(s1, s2);
    this.closestPoint1 = new CHRYSICS.GEOMETRY.Point(
      closestPoints.c1, 7, 0xff0000
    );
    this.closestPoint2 = new CHRYSICS.GEOMETRY.Point(
      closestPoints.c2, 7, 0xff0000
    );

    // A dotted line between the closest point and the testing point.
    this.line = new CHRYSICS.GEOMETRY.Segment(new CHRYSICS.Segment(
      closestPoints.c1,
      closestPoints.c2
    ));
    this.line.initWithDots(2, 10, 0xff0000);

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.worldRendering.add(this.segment1);
    this.worldRendering.add(this.segment2);
    this.worldRendering.add(this.closestPoint1);
    this.worldRendering.add(this.closestPoint2);
    this.worldRendering.add(this.line);

  },

  animate: function() {

    var self = this;
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
