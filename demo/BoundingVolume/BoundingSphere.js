/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var BoundingSphere = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

BoundingSphere.prototype = {

  initWorld: function() {
    this.objects = new ObjectsGroup();
    var wireMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      wireframe: true 
    });
    var solidMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });

    // cube
    var wireCube  = new THREE.Mesh(new THREE.CubeGeometry(150, 50, 100), wireMaterial);
    var solidCube = new THREE.Mesh(new THREE.CubeGeometry(150, 50, 100), solidMaterial);
    this.objects.add(wireCube);
    this.objects.add(solidCube);

    var boundingSphere = new CHRYSICS.BV.Sphere(this.objects.getData());
    this.sphere = new CHRYSICS.GEOMETRY.Sphere(boundingSphere, 0x333333, 0.5);

    this.world.add(this.objects);
    this.world.add(this.sphere);
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
