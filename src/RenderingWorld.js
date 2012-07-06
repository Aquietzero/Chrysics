/**
 * RenderingWorld.js wraps some THREE.js routines for simplify
 * the demo structure.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var RenderingWorld = function(container) {

  this.container = container;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;

  this.initThree();
  this.initScene();
  this.initCamera();
  this.initLight();
  this.initControls();

  this.objects = [];

}

RenderingWorld.prototype = {

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

    this.camera.position.set(100, 100, 500);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt({x:0, y:0, z:0});

    this.scene.add(this.camera);

  },

  initLight: function() {

    this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);

  },

  initControls: function() {

    this.controls = new THREE.TrackballControls(this.camera);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed   = 1.3;
    this.controls.panSpeed    = 0.8;

    this.controls.keys = [ 65, 83, 68 ];
  
  },

  add: function(object) {
  
    this.objects.push(object);
    this.scene.add(object.getGeometry());
  
  },

  render: function() {

    var particle;
    for (var i = 0; i < this.objects.length; ++i) {

      particle = this.objects[i].getPhysique();
      this.objects[i].getGeometry().position.set(
        particle.position.x,
        particle.position.y,
        particle.position.z
      );

    }

    this.controls.update();
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

  }

}
