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
  this.body   = new CHRYSICS.RigidBody();
  
  this.init();

}

Icosahedron.prototype = {

  init: function() {

    this.body.setVelocity(new CHRYSICS.Vector3(
      0, 0, 0
    ));
    this.body.setInverseInertiaTensor(new CHRYSICS.Matrix3(
      -0.1,    0,    0,
         1, -0.5,    0,
         0,    0, -0.1
    ));
    this.body.setMass(2.0);
 
  },

  getGeometry: function() {
  
    return this.icosahedron;
  
  },

  getPhysique: function() {
  
    return this.body;
  
  }

}

var Spinning = function(container) {

  this.worldPhysics   = new CHRYSICS.World();
  this.worldRendering = new RenderingWorld(container);

  this.status = 'RUNNING';
  this.initWorld();

}

Spinning.prototype = {

  initWorld: function() {

    var force1 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, -5),
      new CHRYSICS.Vector3(80, 0, 0),
      50
    );
    var force2 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, 8),
      new CHRYSICS.Vector3(-80, 0, 0),
      50
    );
    var force3 = new CHRYSICS.Force(
      new CHRYSICS.Vector3(0, 0, 8),
      new CHRYSICS.Vector3(0, 0, 0)
    );

    this.icosahedron = new Icosahedron(90);

    console.log(this.icosahedron.getGeometry().vertices);

    this.worldRendering.add(this.icosahedron);
    this.worldPhysics.add(this.icosahedron.getPhysique());

    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force1);
    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force2);
    this.worldPhysics.addForceRegistry(this.icosahedron.getPhysique(), force3);

  },

  animate: function() {

    var self = this;
    self.worldPhysics.startFrame();

    var loop = function() {

      self.worldPhysics.simulate(0.033);
      self.worldRendering.render();
      if (self.status == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.status = 'STOP';
  
  },

}
