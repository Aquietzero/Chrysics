/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SegmentPolyhedron = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SegmentPolyhedron.prototype = {

  initWorld: function() {

    // Plane top 
    var planeTop = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0, -1, 0),
      new CHRYSICS.Vector3(0, 100, 0)
    );
    // Plane bottom
    var planeBottom = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0, 1, 0),
      new CHRYSICS.Vector3(0, -100, 0)
    );
    // Plane left
    var planeLeft = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(1, 0, 0),
      new CHRYSICS.Vector3(-100, 0, 0)
    );
    // Plane right 
    var planeRight = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(-1, 0, 0),
      new CHRYSICS.Vector3(100, 0, 0)
    );
    // Plane front
    var planeFront = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0, 0, -1),
      new CHRYSICS.Vector3(0, 0, 100)
    );
    // Plane back 
    var planeBack = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(0, 0, 1),
      new CHRYSICS.Vector3(0, 0, -100)
    );

    // Polyhedron consisted of several halfspaces.
    this.polyhedron = [
      planeTop   , planeBottom,
      planeLeft  , planeRight,
      planeFront , planeBack
    ];

    // Moving segment
    var segment = new CHRYSICS.Segment(
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
    this.segment = new CHRYSICS.GEOMETRY.Segment(segment);
    this.segment.initWithCylinder(2, 0x550055);

    // The first intersection point between polyhedron and segment.
    this.intersectFirst = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0),
      10,
      0xff0000
    );
    
    // The last intersection point between polyhedron and segment.
    this.intersectLast = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0),
      10,
      0xff0000
    );

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400    , 300 , 400));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeTop    , 200 , 0x333333));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeBottom , 200 , 0x333333));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeLeft   , 200 , 0x333333));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeRight  , 200 , 0x333333));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeFront  , 200 , 0x333333));
    this.world.add(new CHRYSICS.GEOMETRY.Plane(planeBack   , 200 , 0x333333));
    this.world.add(this.segment);
    this.world.add(this.intersectFirst);
    this.world.add(this.intersectLast);

  },

  iterate: function() {

    var offset = 1;
    var y = -250;
    var self = this;
    var pos = this.segment.segment.getPosition();
    var segment = this.segment.segment;
    var polyhedron = this.polyhedron;
    return function() {

      if (y >= 250)
        offset = -1;
      if (y <= -250)
        offset = 1;
      y += offset;
      self.segment.setPosition(pos.x, y, pos.z);

      var intersection = CHRYSICS.BV.Intersection.segmentPolyhedron(segment, polyhedron);
      if (intersection) {
        // The fisrt intersection point.
        self.intersectFirst.setPosition(intersection.first);
        self.intersectFirst.setOpacity(1);
        // The last intersection point.
        self.intersectLast.setPosition(intersection.last);
        self.intersectLast.setOpacity(1);
      } else {
        self.intersectFirst.setOpacity(0);
        self.intersectLast.setOpacity(0);
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
