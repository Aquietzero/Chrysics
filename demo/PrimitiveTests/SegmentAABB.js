/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SegmentAABB = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SegmentAABB.prototype = {

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
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 0.5);

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
    
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.segment);
    this.world.add(this.aabb);
    
  },

  iterate: function() {

    var offset = 1;
    var y = -250;
    var self = this;
    var pos = this.segment.segment.getPosition();
    var segment = this.segment.segment;
    var aabb = this.aabb.aabb;
    return function() {

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;
      self.segment.setPosition(pos.x, y, pos.z);

      if (CHRYSICS.BV.PrimitiveTest.segmentAABB(segment, aabb))
        self.aabb.setColor(0x990000);
      else
        self.aabb.setColor(0x333333);
    
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
