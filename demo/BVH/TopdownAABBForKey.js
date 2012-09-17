/**
 * A simple demo shows how to use the topdown method to construct
 * a AABB BVH.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var TopdownAABBForKey = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

TopdownAABBForKey.prototype = {

  initWorld: function() {
    var self = this;

    var loader = new THREE.OBJLoader();
    loader.load('../demo/Models/Old_Key.obj', function(obj) {
      var key = new UserObject(obj, 3);
      key.setPosition({ x: 700, y: -200, z: 0 });
      var bvh = CHRYSICS.BVH.TopdownBVTObject(key);

      CHRYSICS.BVH.Utils.preorder(bvh, function(aabb) {
        self.world.add(new CHRYSICS.GEOMETRY.AABB(aabb, 0x000000, 0, true));
      });
      console.log(bvh);
      self.world.add(key);
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
