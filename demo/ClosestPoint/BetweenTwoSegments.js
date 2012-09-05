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
    this.segment1 = new CHRYSICS.GEOMETRY.Segment(s1.begin, s1.end);
    this.segment1.initWithDots(2, 10, 0xffff00);

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
    this.segment2 = new CHRYSICS.GEOMETRY.Segment(s2.begin, s2.end);
    this.segment2.initWithDots(2, 10, 0xffff00);

    // Closest points.
    var closestPoints = CHRYSICS.BV.ClosestPoint.betweenSegmentAndSegment(s1, s2);
    console.log(closestPoints);
    this.closestPoint1 = new CHRYSICS.GEOMETRY.Point(
      closestPoints.c1, 7, 0xff0000
    );
    this.closestPoint2 = new CHRYSICS.GEOMETRY.Point(
      closestPoints.c2, 7, 0xff0000
    );

    // A dotted line between the closest point and the testing point.
    this.line = new CHRYSICS.GEOMETRY.Segment(
      closestPoints.c1,
      closestPoints.c2
    );
    this.line.initWithDots(2, 10, 0xff0000);

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.worldRendering.add(this.segment1);
    this.worldRendering.add(this.segment2);
    this.worldRendering.add(this.closestPoint1);
    this.worldRendering.add(this.closestPoint2);
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
