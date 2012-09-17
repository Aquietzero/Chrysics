/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var BoundingBunny = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

BoundingBunny.prototype = {

  initWorld: function() {
    this.bunny  = null;
    var self = this;

    var loader = new THREE.VTKLoader();
    loader.load('../demo/Models/Bunny.vtk', function(geom) {
      var bunny = new Bunny(geom, new THREE.MeshLambertMaterial({
        color: 0xffcccc,
        wireframe: false
      }), 2500);
      bunny.setPosition({ x: 100, y: -250, z: 0 });

      var bvSphere = new CHRYSICS.BV.Sphere(bunny.getData());
      var sphere = new CHRYSICS.GEOMETRY.Sphere(bvSphere, 0x000000, 0.1);

      self.world.add(bunny);
      self.world.add(sphere);
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
