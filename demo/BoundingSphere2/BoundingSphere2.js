/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ObjectsGroup = function(length) {

  this.objects  = [];
  this.body     = new CHRYSICS.RigidBody([], CHRYSICS.Const.BV_SPHERE);
  this.geometry = new THREE.Object3D();

}

ObjectsGroup.prototype = {

  add: function(obj) {

    this.objects.push(obj);
    this.geometry.add(obj);
    this.body.updateGeometry(this.getData());

    this.BVSphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.body.BV.r, 50, 50),
      new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true
      })
    );
    this.BVSphere.position.set(
      this.body.BV.c.x,
      this.body.BV.c.y,
      this.body.BV.c.z
    );
    this.geometry.add(this.BVSphere);
 
  },

  getData: function() {

    var data;
    var vertices = [];

    for (var i = 0; i < this.objects.length; ++i) {

      data = this.objects[i].geometry.vertices;
      for (var j = 0; j < data.length; ++j)
        vertices.push(new CHRYSICS.Vector3(
          data[j].x, data[j].y, data[j].z
        ));

    }

    return vertices;
  
  },

  getPhysique: function() {

    return this.body;

  },

  getGeometry: function() {

    return this.geometry;

  },

}

var BoundingSphere2 = function(container) {

  this.worldRendering = new RenderingWorld(container);
  this.initWorld();

}

BoundingSphere2.prototype = {

  initWorld: function() {

    this.objects = new ObjectsGroup();

    var cube = new THREE.Mesh(
      new THREE.CubeGeometry(150, 50, 100),
      new THREE.MeshLambertMaterial({
        color: 0xffff00,
        wireframe: true
      })
    );
    cube.position.set(0, 0, 0);
    this.objects.add(cube);

    var icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(150, 1),
      new THREE.MeshLambertMaterial({
        color: 0xffff00,
        wireframe: true
      })
    );

    //icosahedron.position.set(0, 0, 0);
    //this.objects.add(icosahedron);

    this.worldRendering.add(this.objects);

  },

  animate: function() {

    var self = this;
    var loop = function() {

      self.worldRendering.render();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
