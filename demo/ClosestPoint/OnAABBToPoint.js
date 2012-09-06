/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var OnAABBToPoint = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

OnAABBToPoint.prototype = {

  initWorld: function() {

    this.generatePoints(50);
    var aabb = new CHRYSICS.BV.AABB(this.points);
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 0.5);

    // Test point out of the AABB.
    var testPoint = new CHRYSICS.Point(282, 116, 86);
    this.testPoint = new CHRYSICS.GEOMETRY.Point(
      testPoint, 10, 0xffff00
    );

    // Closest point on the AABB to the testing point.
    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0), 10, 0xff0000
    );

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.worldRendering.add(this.aabb);
    this.worldRendering.add(this.testPoint);
    this.worldRendering.add(this.closestPoint);

  },

  generatePoints: function(n) {

    this.points = [];
    var p;
    for (var i = 0; i < n; ++i) {

      p = new CHRYSICS.GEOMETRY.Point(
        new CHRYSICS.Point(
          CHRYSICS.Utils.random(-150, 150),
          CHRYSICS.Utils.random(-150, 150),
          CHRYSICS.Utils.random(-150, 150)
        ), 7, 0x0000ff
      );
      this.points.push(p.point);
      this.worldRendering.add(p);

    }

  },

  iterate: function() {

    var self = this;
    var theta = 0;
    var radius = 250;
    var y = -200;
    var offset = 1;

    return function() {

      if (y <= -200) offset = 1;
      if (y >= 200) offset = -1;

      theta += 0.02;
      y += offset;

      self.testPoint.setPosition(
        radius * Math.sin(theta),
        y,
        radius * Math.cos(theta)
      );

      var closestPoint = CHRYSICS.BV.ClosestPoint.onAABBToPoint(
        self.aabb.aabb, 
        self.testPoint.point
      );
      self.closestPoint.setPosition(closestPoint);

    };

  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      self.worldRendering.render();
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
