/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var OnSegmentToPoint = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

OnSegmentToPoint.prototype = {

  initWorld: function() {

    var testSegment = new CHRYSICS.Segment(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-300, 0),
        CHRYSICS.Utils.random(-300, 0),
        CHRYSICS.Utils.random(-300, 0)
      ),
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(0, 300),
        CHRYSICS.Utils.random(0, 300),
        CHRYSICS.Utils.random(0, 300)
      )
    );
    this.testSegment = new CHRYSICS.GEOMETRY.Segment(testSegment);
    this.testSegment.initWithCylinder(2, 0x550055);

    var testPoint = new CHRYSICS.Point(0, 0, 0);
    this.testPoint = new CHRYSICS.GEOMETRY.Point(testPoint, 10, 0xffff00);

    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0),
      10,
      0xff0000
    );

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.testPoint);
    this.world.add(this.testSegment);
    this.world.add(this.closestPoint);

  },

  iterate: function() {

    var self = this;
    var theta = 0;
    var radius = 250;

    return function() {

      theta += 0.02;
      self.testPoint.setPosition(
        radius * Math.sin(theta),
        150,
        radius * Math.cos(theta)
      );

      var closestPoint = CHRYSICS.BV.ClosestPoint.onSegmentToPoint(
        self.testSegment.segment, 
        self.testPoint.point
      );
      self.closestPoint.setPosition(closestPoint);

    };

  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      self.world.render();
      iter();
      if (self.status == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.status = 'STOP';
  
  },


}
