/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Box = function(length, mass, pos) {

  this.particle = new CHRYSICS.Particle();
  this.cube = new THREE.Mesh(
    new THREE.CubeGeometry(length, length, length),
    new THREE.MeshLambertMaterial({color: 0xff0000})
  );
  
  this.init(mass, pos);

}

Box.prototype = {

  init: function(mass, pos) {

    this.particle.setMass(mass);

    this.particle.position.set(pos.x, pos.y, pos.z);
    this.cube.position.set(pos.x, pos.y, pos.z);

  },

  getGeometry: function() {
  
    return this.cube;
  
  },

  getPhysique: function() {
  
    return this.particle;
  
  }

}

var ParticleSpring = function(container) {

  this.worldPhysics   = new CHRYSICS.ParticleWorld();
  this.worldRendering = new RenderingWorld(container);

  this.status = 'RUNNING';
  this.initWorld();

}

ParticleSpring.prototype = {

  initWorld: function() {

    var box1 = new Box(30, 3.0, {x:-100, y:0, z:0});
    var box2 = new Box(30, 1.0, {x: 100, y:0, z:0});

    this.worldPhysics.add(box1.getPhysique());
    this.worldPhysics.add(box2.getPhysique());
    this.worldRendering.add(box1);
    this.worldRendering.add(box2);

    // Bind the second box to the first box.
    var particleSpring1 = new CHRYSICS.ParticleSpring(
      box1.getPhysique(),
      0.5,
      150
    );
    this.worldPhysics.addForceRegistry(box2.getPhysique(), particleSpring1);

    // Bind the first box to the second box.
    var particleSpring2 = new CHRYSICS.ParticleSpring(
      box2.getPhysique(),
      0.5,
      150
    );
    this.worldPhysics.addForceRegistry(box1.getPhysique(), particleSpring2);
    
  },

  animate: function() {

    var self = this;
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
