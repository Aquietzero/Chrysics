/**
 * A simple demo shows how to use the topdown method to construct
 * a AABB BVH.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var TopdownAABB = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

TopdownAABB.prototype = {

  initWorld: function() {
    this.generateBalls(50);

    var bvh = CHRYSICS.BVH.TopdownBVT(this.balls);

    var self = this;
    var showAABB = function(aabb) {
      self.world.add(new CHRYSICS.GEOMETRY.AABB(aabb, 0x000000, 0));
    }
    CHRYSICS.BVH.Utils.preorder(bvh, showAABB);

    // Rendering geometries.
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
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
