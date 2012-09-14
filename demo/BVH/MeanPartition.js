/**
 * A simple demo shows the methods in ClosesPoint.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var MeanPartition = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

MeanPartition.prototype = {

  initWorld: function() {
    this.generateBalls(50);

    // Partition the balls and set half of them to blue.
    var partition = CHRYSICS.BVH.Partition.mean(this.balls);
    var left = partition.left;
    var right = partition.right;

    for (var i = 0; i < left.length; ++i)
      left[i].setColor(0x0000ff);

    // Partition line. Though the partition line has already calculated
    // above, since this is just a demo, the line will be calculate 
    // once agian for demonstration.
    var centroids = [];
    for (var i = 0; i < this.balls.length; ++i)
      centroids.push(this.balls[i].getCentroid());

    var distantPoints = CHRYSICS.BV.mostSeparatedPointsOnAABB(centroids);
    var min = distantPoints.min;
    var max = distantPoints.max;

    var segment = new CHRYSICS.GEOMETRY.Segment(new CHRYSICS.Segment(min, max));
    segment.initWithCylinder(3, 0x550055);

    // Rendering geometries.
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(segment);
  },

  generateBalls: function(n) {
    this.balls = [];
    var ball;
    for (var i = 0; i < n; ++i) {
      ball = new Ball(10);
      ball.setPosition(new CHRYSICS.Vector3(
        CHRYSICS.Utils.random(-300, 300),
        CHRYSICS.Utils.random(-200, 200),
        CHRYSICS.Utils.random(-300, 300)
      ));

      this.balls.push(ball);
      this.world.add(ball);
    }
  },

  animate: function() {
    var self = this;
    var loop = function() {

      self.world.render();
      if (self.status == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);
  },

  stop: function() {
    this.status = 'STOP';
  },

}
