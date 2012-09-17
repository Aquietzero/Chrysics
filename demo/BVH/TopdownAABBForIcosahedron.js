/**
 * A simple demo shows how to use the topdown method to construct
 * a AABB BVH.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var TopdownAABBForIcosahedron = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

TopdownAABBForIcosahedron.prototype = {

  initWorld: function() {
    this.bunny  = null;
    var self = this;

    this.icosahedron = new Icosahedron(250, 0xff0000, 0.9);
    this.world.add(this.icosahedron);

    var bvh = CHRYSICS.BVH.TopdownBVTObject(this.icosahedron);

    CHRYSICS.BVH.Utils.preorder(bvh, function(aabb) {
      self.world.add(new CHRYSICS.GEOMETRY.AABB(aabb, 0x000000, 0, true));
    });
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
