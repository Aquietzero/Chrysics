/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ClosestPoint = function(container) {

  this.worldRendering = new GeometryWorld(container);
  this.initWorld();

}

ClosestPoint.prototype = {

  initWorld: function() {

    var coordinate = new CHRYSICS.GEOMETRY.Coordinate(400);
    var plane = new CHRYSICS.GEOMETRY.Plane(
      new CHRYSICS.Plane(
        new CHRYSICS.Vector3(10, 10, 10),
        new CHRYSICS.Point(0, 0, 0)
      ),
      500,
      0x330033 
    );
    
    this.worldRendering.add(coordinate);
    this.worldRendering.add(plane);

  },

  animate: function() {

    var self = this;
    var loop = function() {

      self.worldRendering.render();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
