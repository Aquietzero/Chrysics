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

    var plane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0.3, 1, 0.7),
      new CHRYSICS.Vector3(0, 0, 0)
    );

    this.plane  = new CHRYSICS.GEOMETRY.Plane(plane, 500, 0x000033);
    var segment = new CHRYSICS.Segment(
      new CHRYSICS.Point(-100, 0, 0),
      new CHRYSICS.Point( 100, 100, 0)
    );
    this.segment = new CHRYSICS.GEOMETRY.Segment(
      new CHRYSICS.Point(-100, 0, 0),
      new CHRYSICS.Point( 100, 100, 0)
    );
    this.segment.initWithCylinder(2, 0xffff00);

    var intersect = CHRYSICS.PrimitiveTest.segmentPlane(segment, plane);
    var point;
    if (intersect) {
      point = new CHRYSICS.GEOMETRY.Point(intersect, 5, 0xffff00);
      this.world.add(point);
    }

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.world.add(this.plane);
    this.world.add(this.segment);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -300;
    var rst;
    var self = this;
    var aabb = self.aabb.aabb;
    var p = self.plane.plane;
    return function() {

      if (y >= 150)
        offset = -1;
      if (y <= -150)
        offset = 1;
      y += offset;

      self.aabb.setPosition(0, y, 0);
      if (CHRYSICS.PrimitiveTest.AABBPlane(aabb, p))
        self.aabb.setColor(0xff0000);
      else
        self.aabb.setColor(0xffff00);
    
    };
  
  },

  animate: function() {

    var self = this;
    // var iter = this.iterate();
    var loop = function() {

      self.world.render();
      // iter();
      if (self.state == 'RUNNING')
        window.requestAnimationFrame(loop);

    }

    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.state = 'STOP';
  
  },

}
