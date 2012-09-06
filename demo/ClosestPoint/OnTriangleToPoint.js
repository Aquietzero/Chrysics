/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var OnTriangleToPoint = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

OnTriangleToPoint.prototype = {

  initWorld: function() {

    var a = new CHRYSICS.Point(
      CHRYSICS.Utils.random(-200, -100),  
      CHRYSICS.Utils.random(-200, -100),  
      CHRYSICS.Utils.random( 100,  200)  
    );
    var b = new CHRYSICS.Point(
      CHRYSICS.Utils.random( 100,  200),  
      CHRYSICS.Utils.random(-200, -100),  
      CHRYSICS.Utils.random( 100,  200)  
    );
    var c = new CHRYSICS.Point(
      CHRYSICS.Utils.random(-200, -100),  
      CHRYSICS.Utils.random( 100,  200),  
      CHRYSICS.Utils.random(-100, -200)  
    );

    var testTriangle = new CHRYSICS.Triangle(a, b, c);
    this.testTriangle = new CHRYSICS.GEOMETRY.Triangle(testTriangle, 0x333333);

    // Test point out of the triangle.
    var testPoint = new CHRYSICS.Point(
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-200, 200)
    );
    this.testPoint = new CHRYSICS.GEOMETRY.Point(
      testPoint, 10, 0xffff00
    );

    // Closest point on the plane to the testing point.
    this.closestPoint = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0), 10, 0xff0000
    );

    // Rendering geometries.
    this.worldRendering.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.worldRendering.add(this.testTriangle);
    this.worldRendering.add(this.testPoint);
    this.worldRendering.add(this.closestPoint);

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

      var closestPoint = CHRYSICS.BV.ClosestPoint.onTriangleToPoint(
        self.testTriangle.triangle.v1,
        self.testTriangle.triangle.v2,
        self.testTriangle.triangle.v3,
        self.testPoint.point
      );
      self.closestPoint.setPosition(closestPoint);

    };

  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      // self.testing(iterate);
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
