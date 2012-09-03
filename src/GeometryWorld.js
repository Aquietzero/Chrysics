/**
 * Geometry world is only for giving the demonstration of geometry testing.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var GeometryWorld = function(container) {

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

GeometryWorld.prototype = {

  initThree: function() {

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);

    document.getElementById(this.container).appendChild(this.renderer.domElement);
    this.renderer.setClearColorHex(0x000000, 1.0);
  
  },

  initScene: function() {

    this.scene = new THREE.Scene();
  
  },

  initCamera: function() {

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 1e10);
    
    this.camera.position.set(500, 800, 500);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt({ x:0, y:150, z:0 });

    this.scene.add(this.camera);

  },

  initLight: function() {
  
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(100, 100, 200);

    this.ambientLight = new THREE.AmbientLight(0x222222, 0.1);

    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);
  
  },

  initControls: function() {

    this.controls = new THREE.TrackballControls(this.camera);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed   = 1.3;
    this.controls.panSpeed    = 0.8;

    this.controls.keys = [ 65, 83, 68 ];
  
  },

  add: function(object) {

    if (object['getGeometry']) {
      this.objects.push(object);
      this.scene.add(object.getGeometry());
    } else
      this.scene.add(object);
  
  },

  render: function() {

    this.controls.update();
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  
  }

}
