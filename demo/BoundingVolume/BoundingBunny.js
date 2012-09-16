/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var BoundingBunny = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();
}

BoundingBunny.prototype = {

  initWorld: function() {
    this.bunny  = null;
    var self = this;

    var loader = new THREE.VTKLoader();
    loader.load('../demo/Models/Bunny.vtk', function(geom) {

      var bunny = new Bunny(geom, new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: false
      }), 2500);
      bunny.setPosition({ x: 100, y: -250, z: 0 });
      self.world.add(bunny);

    });
  },

  animate: function() {
    var self = this;
    var loop = function() {
      self.world.render();
      window.requestAnimationFrame(loop);
    }

    loop();
  },

}
