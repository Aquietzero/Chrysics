/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var OnPlaneToPoint = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

OnPlaneToPoint.prototype = {

  initWorld: function() {

    // Plane
    var testPlane = new CHRYSICS.Plane(
      new CHRYSICS.Vector3(10, 37, 10),
      new CHRYSICS.Point(0, 0, 0)
    );
    this.testPlane = new CHRYSICS.GEOMETRY.Plane(testPlane, 700, 0x333333);

    // Test point out of the plane.
    var testPoint = new CHRYSICS.Point(100, -100, 100);
    this.testPoint = new CHRYSICS.GEOMETRY.Point(testPoint, 10, 0xffff00);

    // Closest point on the plane to the testing point.
    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Vector3(0, 0, 0), 10, 0xff0000
    );

    // Rendering geometries.
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.testPlane);
    this.world.add(this.testPoint);
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
        250,
        radius * Math.cos(theta)
      );

      var closestPoint = CHRYSICS.BV.ClosestPoint.onPlaneToPoint(
        self.testPlane.plane, self.testPoint.point
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
