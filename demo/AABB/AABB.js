/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ObjectsGroup = function(length) {

  this.objects  = [];
  this.body     = new CHRYSICS.RigidBody([], CHRYSICS.Const.BV_AABB);
  this.geometry = new THREE.Object3D();

}

ObjectsGroup.prototype = {

  add: function(obj) {

    this.objects.push(obj);
    this.geometry.add(obj);
    this.body.updateGeometry(this.getData());

    this.BVAABB = new THREE.Mesh(
      new THREE.CubeGeometry(
        this.body.BV.rx * 2,
        this.body.BV.ry * 2,
        this.body.BV.rz * 2
      ),
      new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true
      })
    );
    this.BVAABB.position.set(
      this.body.BV.c.x,
      this.body.BV.c.y,
      this.body.BV.c.z
    );
    this.geometry.add(this.BVAABB);

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

var AABB = function(container) {

  this.worldRendering = new RenderingWorld(container);
  this.initWorld();

}

AABB.prototype = {

  initWorld: function() {

    this.objects = new ObjectsGroup();

    var icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(100, 1),
      new THREE.MeshLambertMaterial({
        color: 0xffff00,
        wireframe: true
      })
    );

    //icosahedron.position.set(150, 0, 0);
    this.objects.add(icosahedron);

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
