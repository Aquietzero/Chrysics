/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Bunny = function(geom, material) {

  this.bunny = new THREE.Mesh(geom, material);
  this.body = new CHRYSICS.RigidBody(this.getData(), CHRYSICS.Const.BV_SPHERE);
  this.init();

}

Bunny.prototype = {

  init: function() {
  
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

    console.log(this.body.BV);

    this.geometry = new THREE.Object3D();
    this.geometry.add(this.bunny);
    this.geometry.add(this.BVSphere);

  },

  getData: function() {

    var vertices = [];
    var data = this.bunny.geometry.vertices;
    for (var i = 0; i < data.length; ++i)
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

      self.bunny = new Bunny(geom, new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: false
      }));
      self.worldRendering.add(self.bunny);

      var icosahedron = new THREE.Mesh(
        new THREE.IcosahedronGeometry(200, 1),
        new THREE.MeshLambertMaterial({
          color: 0xffff00,
          wireframe: true
        })
      );

      // self.worldRendering.scene.add(bunny);
      self.worldRendering.scene.add(icosahedron);

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
