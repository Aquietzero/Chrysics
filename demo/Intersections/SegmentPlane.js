/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SegmentPlane = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SegmentPlane.prototype = {

  initWorld: function() {

    // Plane
    var plane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0.3, 1, 0.7),
      new CHRYSICS.Vector3(0, 0, 0)
    );
    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 600, 0x333333);

    // Moving segment
    var segment = new CHRYSICS.Segment(
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-300, 300),
        CHRYSICS.Utils.random(-300,   0),
        CHRYSICS.Utils.random(-300, 300)
      ),
      new CHRYSICS.Point(
        CHRYSICS.Utils.random(-300, 300),
        CHRYSICS.Utils.random(   0, 300),
        CHRYSICS.Utils.random(-300, 300)
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
    this.world.add(this.plane);
    this.world.add(this.segment);
    this.world.add(this.intersect);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -250;
    var self = this;
    var pos = this.segment.segment.getPosition();
    var segment = this.segment.segment;
    var plane = self.plane.plane;
    return function() {

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;
      self.segment.setPosition(pos.x, y, pos.z);

      var intersect = CHRYSICS.BV.Intersection.segmentPlane(segment, plane);
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
