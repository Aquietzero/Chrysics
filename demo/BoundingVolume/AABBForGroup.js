/**
 * AABB for a group of objects.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var AABBForGroup = function(container) {
  this.world = new GeometryWorld(container);
  this.initWorld();

  this.status = 'RUNNING';
}

AABBForGroup.prototype = {

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
    wireCube.position.set(0, 170, 0);
    solidCube.position.set(0, 170, 0);
    this.objects.add(wireCube);
    this.objects.add(solidCube);

    // sphere1 
    var wireSphere1  = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), wireMaterial);
    var solidSphere1 = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), solidMaterial);
    wireSphere1.position.set(170, 150, 0);
    solidSphere1.position.set(170, 150, 0);
    this.objects.add(wireSphere1);
    this.objects.add(solidSphere1);

    // sphere2
    var wireSphere2  = new THREE.Mesh(new THREE.SphereGeometry(80, 20, 20), wireMaterial);
    var solidSphere2 = new THREE.Mesh(new THREE.SphereGeometry(80, 20, 20), solidMaterial);
    wireSphere2.position.set(-170, -150, 0);
    solidSphere2.position.set(-170, -150, 0);
    this.objects.add(wireSphere2);
    this.objects.add(solidSphere2);

    // icosahedron
    var wireIcosahedron  = new THREE.Mesh(new THREE.IcosahedronGeometry(150, 1), wireMaterial);
    var solidIcosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(150, 1), solidMaterial);
    this.objects.add(wireIcosahedron);
    this.objects.add(solidIcosahedron);

    var aabb = new CHRYSICS.BV.AABB(this.objects.getData());
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x666666, 0.5);

    this.world.add(this.objects);
    this.world.add(this.aabb);
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

