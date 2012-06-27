/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Ball = function(radius) {

  this.particle = new CHRYSICS.Particle();
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshLambertMaterial({color: 0xff0000})
  );
  
  this.init();

}

Ball.prototype = {

  init: function() {

    this.particle.velocity.set(
      CHRYSICS.Utils.random(0, 122),
      CHRYSICS.Utils.random(0, 123),
      CHRYSICS.Utils.random(0, 121)
    );
    this.particle.setMass(2.0);

    CHRYSICS.ParticleForceRegistry.add(
      this.particle,
      CHRYSICS.ParticleGravity
    );

    this.sphere.position.set(0, 0, 20);

  },

  update: function(duration) {

    CHRYSICS.ParticleForceRegistry.updateForces(duration);

    this.particle.integrate(duration);
    this.sphere.position.set(
      this.particle.position.x,
      this.particle.position.y,
      this.particle.position.z
    );

  },

}

var GravityParticleField = function(container) {

  this.container = container;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;

  this.initThree();
  this.initScene();
  this.initCamera();
  this.initLight();
  this.initBalls();

}

GravityParticleField.prototype = {

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
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt({x:0, y:0, z:0});

    this.scene.add(this.camera);

  },

  initLight: function() {

    this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);

  },

  initBalls: function() {

    this.balls = [];
    var ball;

    for (var i = 0; i < 50; ++i) {
      ball = new Ball(CHRYSICS.Utils.random(5, 10));

      this.scene.add(ball.sphere);
      this.balls.push(ball);
    }

  },

  animate: function() {

    var self = this;
    var loop = function() {

      for (var i = 0; i < 50; ++i)
        self.balls[i].update(0.033);

      self.renderer.clear();
      self.renderer.render(self.scene, self.camera);
      window.requestAnimationFrame(loop);

    }

    loop();

  },

  threeStart: function() {

    this.animate();

  },

}
