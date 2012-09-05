/**
 * A sphere
 */
CHRYSICS.GEOMETRY.Sphere = function(sphere, radius, color, wireframe) {

  this.sphere = sphere;

  var geom = new THREE.SphereGeometry(radius, 15, 15);
  
  var solidMesh = new THREE.MeshLambertMaterial({ 
    transparent: true,
    opacity: 0.8,
    color: 0x333333,
    wireframe: false 
  });
  var frameMesh = new THREE.MeshLambertMaterial({ 
    color: 0x000000,
    wireframe: true
  });

  var solid = new THREE.Mesh(geom, solidMesh);
  var frame = new THREE.Mesh(geom, frameMesh);

  this.geometry = new THREE.Object3D();
  this.geometry.add(solid);
  this.geometry.add(frame);

  this.setPosition(this.sphere.c);

}

CHRYSICS.GEOMETRY.Sphere.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
      this.sphere.c = new CHRYSICS.Vector3(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
    } else if (arguments.length == 3) {
      this.geometry.position.set(
        arguments[0],
        arguments[1],
        arguments[2]
      );
      this.sphere.c = new CHRYSICS.Vector3(
        arguments[0],
        arguments[1],
        arguments[2]
      );
    }

  },

  setColor: function(color) {

    this.geometry.children[0].material.color.setHex(color);
  
  },
 
}, CHRYSICS.GEOMETRY.Primitive.prototype);

