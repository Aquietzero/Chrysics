/**
 * A simple demo shows the gravity particle field.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Scene = function(container) {

  this.container = container;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;

  this.initThree();
  this.initScene();
  this.initCamera();
  this.initLight();
  this.initBalls();

}

Scene.prototype = {

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

    this.camera.position.set(200, 120, 50);
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
    this.objects = [];
    var ball, sphere;

    for (var i = 0; i < 30; ++i) {

      ball = new CHRYSICS.Particle();
      ball.velocity.set(
        CHRYSICS.Utils.random(0, 92),
        CHRYSICS.Utils.random(0, 93),
        CHRYSICS.Utils.random(0, 91)
      );
      ball.setMass(2.0);

      CHRYSICS.ParticleForceRegistry.add(
        ball,
        CHRYSICS.ParticleGravity
      );


      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 10, 10),
        new THREE.MeshLambertMaterial({color: 0xff0000})
      );
      sphere.position.set(0, 0, 5);
      this.scene.add(sphere);

      this.balls.push(ball);
      this.objects.push(sphere);

    }

  },

  animate: function() {

    var self = this;
    var loop = function() {

      for (var i = 0; i < 30; ++i) {
        CHRYSICS.ParticleForceRegistry.updateForces(0.033);
        self.balls[i].integrate(0.033);
        self.objects[i].position.set(
          self.balls[i].position.x,
          self.balls[i].position.y,
          self.balls[i].position.z
        );
      }

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
