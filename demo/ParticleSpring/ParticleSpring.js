/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Box = function(length, pos) {

  this.particle = new CHRYSICS.Particle();
  this.cube = new THREE.Mesh(
    new THREE.CubeGeometry(length, length, length),
    new THREE.MeshLambertMaterial({color: 0xff0000})
  );
  
  this.init(pos);

}

Box.prototype = {

  init: function(pos) {

    this.particle.setMass(2.0);

    this.particle.position.set(pos.x, pos.y, pos.z);
    this.cube.position.set(pos.x, pos.y, pos.z);

  },

  update: function(duration) {

    CHRYSICS.ParticleForceRegistry.updateForces(duration);

    this.particle.integrate(duration);
    this.cube.position.set(
      this.particle.position.x,
      this.particle.position.y,
      this.particle.position.z
    );

  },

}

var ParticleSpring = function(container) {

  this.container = container;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;

  this.initThree();
  this.initScene();
  this.initCamera();
  this.initLight();
  this.initBox();

}

ParticleSpring.prototype = {

  initThree: function() {

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.width, this.height);

    document.getElementById(this.container).appendChild(this.renderer.domElement);
    this.renderer.setClearColorHex(0x000000, 1.0);

  },

  initScene: function() {

    this.scene = new THREE.Scene();
  
  },

  initCamera: function() {

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);

    this.camera.position.set(400, 240, 100);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt({x:0, y:0, z:0});

    this.scene.add(this.camera);

  },

  initLight: function() {

    this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);

  },

  initBox: function() {

    this.box1 = new Box(30, {x:-100, y:0, z:0});
    this.box2 = new Box(30, {x: 100, y:0, z:0});
    this.scene.add(this.box1.cube);
    this.scene.add(this.box2.cube);

    var ParticleSpring1 = new CHRYSICS.ParticleSpring(
      this.box1.particle,
      0.5,
      150
    );
    CHRYSICS.ParticleForceRegistry.add(
      this.box2.particle, 
      ParticleSpring1
    );

    var ParticleSpring2 = new CHRYSICS.ParticleSpring(
      this.box2.particle,
      0.5,
      150
    );
    CHRYSICS.ParticleForceRegistry.add(
      this.box1.particle, 
      ParticleSpring2
    );

  },

  animate: function() {

    var self = this;
    var loop = function() {

      self.box1.update(0.033);
      self.box2.update(0.033);
      self.renderer.clear();
      self.renderer.render(self.scene, self.camera);
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
