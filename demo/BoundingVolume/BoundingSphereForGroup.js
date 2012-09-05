/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var BoundingSphereForGroup = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';

}

BoundingSphereForGroup.prototype = {

  initWorld: function() {

    this.objects = new ObjectsGroup();
    var material = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      wireframe: true
    });

    // cube
    var cube = new THREE.Mesh(new THREE.CubeGeometry(150, 50, 100), material);
    cube.position.set(0, 170, 0);
    this.objects.add(cube);

    // sphere 1
    var sphere1 = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), material);
    sphere1.position.set(170, 150, 0);
    this.objects.add(sphere1);

    // sphere 2
    var sphere2 = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), material);
    sphere2.position.set(-170, -50, 0);
    this.objects.add(sphere2);

    // icosahedron
    var icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(150, 1), material);
    icosahedron.position.set(0, 0, 0);
    this.objects.add(icosahedron);

    var boundingSphere = new CHRYSICS.BV.Sphere(this.objects.getData());
    var bvSphere = new THREE.Mesh(
      new THREE.SphereGeometry(boundingSphere.r, 20, 20),
      new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true
      })
    );
    bvSphere.position.set(boundingSphere.c.x, boundingSphere.c.y, boundingSphere.c.z);

    this.world.add(this.objects);
    this.world.add(bvSphere);

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
