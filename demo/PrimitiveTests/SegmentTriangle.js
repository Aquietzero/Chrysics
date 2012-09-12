/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SegmentTriangle = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SegmentTriangle.prototype = {

  initWorld: function() {

    // Triangle
    var a = new CHRYSICS.Point(200, -200, 200),
        b = new CHRYSICS.Point(-200, -200, 200),
        c = new CHRYSICS.Point(0, 200, -200);
    var triangle = new CHRYSICS.Triangle(a, b, c);
    this.triangle = new CHRYSICS.GEOMETRY.Triangle(triangle, 0x333333, 0.5);

    // Moving segment
    var segment = new CHRYSICS.Segment(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200,  200),
        CHRYSICS.Utils.random(-200, -100),
        CHRYSICS.Utils.random(-200,  200)
      ),
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random( 100, 200),
        CHRYSICS.Utils.random(-200, 200)
      )
    );
    this.segment = new CHRYSICS.GEOMETRY.Segment(segment);
    this.segment.initWithCylinder(2, 0x550055);

    // Intersection point between plane and segment.
    this.intersect = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0),
      10,
      0xff0000
    );
    
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.segment);
    this.world.add(this.triangle);
    this.world.add(this.intersect);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -250;
    var self = this;
    var pos = this.segment.segment.getPosition();
    var segment = this.segment.segment;
    var triangle = self.triangle.triangle;
    return function() {

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;
      self.segment.setPosition(pos.x, y, pos.z);

      var intersect = CHRYSICS.BV.Intersection.segmentTriangle(
        segment, triangle.v1, triangle.v2, triangle.v3
      );
      if (intersect) {
        self.intersect.setPosition(intersect);
        self.intersect.setOpacity(1);
      } else {
        self.intersect.setOpacity(0);
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
  
  },

}
