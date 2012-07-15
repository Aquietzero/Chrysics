/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Icosahedron = function(radius) {

  this.icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(radius, 1),
    new THREE.MeshLambertMaterial({
      color: 0xffff00,
      wireframe: true
    })
  );
  this.body = new CHRYSICS.RigidBody(this.getData());
  this.init();

}

Icosahedron.prototype = {

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
    this.geometry = new THREE.Object3D();
    this.geometry.add(this.icosahedron);
    this.geometry.add(this.BVSphere);

  },

  getData: function() {

    var vertices = [];
    var data = this.icosahedron.geometry.vertices;
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

var BoundingSphere = function(container) {

  this.worldRendering = new RenderingWorld(container);
  this.initWorld();

}

BoundingSphere.prototype = {

  initWorld: function() {

    this.icosahedron = new Icosahedron(90);
    this.worldRendering.add(this.icosahedron);

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
