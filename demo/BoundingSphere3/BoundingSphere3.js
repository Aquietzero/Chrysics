/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Bunny = function(geom, material, scalar) {

  this.bunny = new THREE.Mesh(geom, material);
  this.bunny.scale.set(scalar, scalar, scalar);
  this.body = new CHRYSICS.RigidBody(this.getData(), CHRYSICS.Const.BV_SPHERE);
  this.init(scalar);

}

Bunny.prototype = {

  init: function(scalar) {
  
    this.BVSphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.body.BV.r, 50, 50),
      new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true
      })
    );
    this.BVSphere.position.set(
      this.body.BV.c.x * scalar,
      this.body.BV.c.y * scalar,
      this.body.BV.c.z * scalar
    );
    this.BVSphere.scale.set(scalar, scalar, scalar);

    this.geometry = new THREE.Object3D();
    this.geometry.add(this.bunny);
    this.geometry.add(this.BVSphere);

  },

  getData: function() {

    var vertices = [];
    var data = this.bunny.geometry.vertices;

    // This is the bunny special case since there are some bugs
    // in the VTKLoader.js. Most of the faces informationa are
    // loaded as the vertices, which causes embarasse problems.
    for (var i = 0; i < data.length - 70000; ++i)
      vertices.push(new CHRYSICS.Vector3(
        data[i].x, data[i].y, data[i].z
      ));

    return vertices;
  
  },

  getPhysique: function() {

    return this.body;

  },

  getGeometry: function() {

    return this.geometry;

  },

}

var BoundingSphere3 = function(container) {

  this.worldRendering = new RenderingWorld(container);
  this.initWorld();

}

BoundingSphere3.prototype = {

  initWorld: function() {

    this.bunny  = null;
    var self = this;

    var loader = new THREE.VTKLoader();
    loader.load('Bunny.vtk', function(geom) {

      var bunny = new Bunny(geom, new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: false
      }), 1000);
      self.worldRendering.add(bunny);

    });

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
