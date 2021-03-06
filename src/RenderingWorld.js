/**
 * RenderingWorld.js wraps some THREE.js routines for simplify
 * the demo structure.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var RenderingWorld = function(container) {

  this.container = container;
  this.width  = 800;
  this.height = 600;

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
    this.renderer.setClearColorHex(0xbbbbbb, 0.7);

  },

  initScene: function() {

    this.scene = new THREE.Scene();
  
  },

  initCamera: function() {

    // this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 1e10);

    this.camera.position.set(0, 0, 500);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt({x:0, y:0, z:0});

    this.scene.add(this.camera);

  },

  initLight: function() {

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(100, 100, 200);

    // this.ambientLight = new THREE.AmbientLight(0x111111, 0.1);

    this.scene.add(this.directionalLight);
    // this.scene.add(this.ambientLight);

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

    var body;
    for (var i = 0; i < this.objects.length; ++i) {

      body = this.objects[i].getPhysique();

      if (typeof body === 'undefined')
        continue;

      // Set orientation.
      if (body.getClassName() == CHRYSICS.Const.RIGID_BODY) {
        var m = new THREE.Matrix4();
        m.setRotationFromQuaternion(body.orientation);
        this.objects[i].getGeometry().applyMatrix(m);
      }

      // Set position.
      this.objects[i].getGeometry().position.set(
        body.position.x,
        body.position.y,
        body.position.z
      );

    }

    this.controls.update();
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

  }

}
