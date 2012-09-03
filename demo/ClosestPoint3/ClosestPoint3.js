/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ClosestPoint3 = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

}

ClosestPoint3.prototype = {

  initWorld: function() {

    this.generatePoints(50);
    this.aabb = new CHRYSICS.BV.AABB(this.points);

    // Test point out of the AABB.
    this.testPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(282, 116, 86), 7, 0xffff00
    );

    // Closest point on the AABB to the testing point.
    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      CHRYSICS.BV.ClosestPoint.onAABBToPoint(
        this.aabb, 
        this.testPoint.point
      ), 7, 0xffff00
    );

    // A dotted line between the closest point and the testing point.
    this.line = new CHRYSICS.GEOMETRY.Segment(
      this.testPoint.point, 
      this.closestPoint.point
    );
    this.line.initWithDots(2, 10, 0xffff00);

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.worldRendering.add(new CHRYSICS.GEOMETRY.AABB(this.aabb, 0x000066, 0.6));
    this.worldRendering.add(this.testPoint);
    this.worldRendering.add(this.closestPoint);
    this.worldRendering.add(this.line);

  },

  generatePoints: function(n) {

    this.points = [];
    var p;
    for (var i = 0; i < n; ++i) {

      p = new CHRYSICS.GEOMETRY.Point(
        new CHRYSICS.Point(
          CHRYSICS.Utils.random(-200, 200),
          CHRYSICS.Utils.random(-200, 200),
          CHRYSICS.Utils.random(-200, 200)
        ), 7, 0xff0000
      );
      this.points.push(p.point);
      this.worldRendering.add(p);

    }

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
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
