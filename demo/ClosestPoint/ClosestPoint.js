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

    this.point1 = new Point(new CHRYSICS.Point(0, 0, 0));
    this.point2 = new Point(new CHRYSICS.Point(100, 100, 0));

    this.worldRendering.add(this.point1);
    this.worldRendering.add(this.point2);

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
