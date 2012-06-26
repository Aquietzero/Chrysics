
var Scene = function(container) {

  this.container = container;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;

  this.objects = [];
  this.time = 0;

  this.initThree();
  this.initScene();
  this.initCamera();
  this.initLight();

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

  addObject: function(obj) {

    this.objects.push(obj);

  },

  addObjectsToScene: function() {
  
    for (var i = 0; i < this.objects.length; ++i)
      this.scene.add(this.objects[i]);
  
  },

  animate: function() {

    var t = 0;
    var self = this;
    var loop = function() {

      t++;
      for (var i = 0; i < self.objects.length; ++i)
        self.objects[i].rotation.set(t/100, 0, 0);

      self.renderer.clear();
      self.renderer.render(self.scene, self.camera);
      window.requestAnimationFrame(loop);

    }

    loop();

  },

  threeStart: function() {

    this.addObjectsToScene();
    this.animate();

  },

}
