/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ObjectsGroup = function(length) {

  this.objects  = [];
  this.geometry = new THREE.Object3D();

}

ObjectsGroup.prototype = {

  add: function(obj) {

    this.objects.push(obj);
    this.geometry.add(obj);

  },

  getData: function() {

    var obj;
    var vertices = [];

    for (var i = 0; i < this.objects.length; ++i) {

      obj = this.objects[i];
      for (var j = 0; j < obj.geometry.vertices.length; ++j) {
        vertices.push(new CHRYSICS.Vector3(
          obj.position.x + obj.geometry.vertices[j].x,
          obj.position.y + obj.geometry.vertices[j].y,
          obj.position.z + obj.geometry.vertices[j].z
        ));
      }

    }

    return vertices;
  
  },

  getGeometry: function() {

    return this.geometry;

  },

}

var AABB = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

}

AABB.prototype = {

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
    sphere2.position.set(-170, -150, 0);
    this.objects.add(sphere2);

    // icosahedron
    var icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(150, 1), material);
    icosahedron.position.set(0, 0, 0);
    this.objects.add(icosahedron);

    var aabb = new CHRYSICS.BV.AABB(this.objects.getData());
    var bvAABB = new THREE.Mesh(
      new THREE.CubeGeometry(aabb.rx * 2, aabb.ry * 2, aabb.rz * 2),
      new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true
      })
    );
    bvAABB.position.set(aabb.c.x, aabb.c.y, aabb.c.z);
 
    this.world.add(this.objects);
    this.world.add(bvAABB);

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

