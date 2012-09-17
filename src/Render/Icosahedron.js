/**
 * Icosahedron.
 */
CHRYSICS.GEOMETRY.Icosahedron = function(radius, color, opacity) {
  var geom = new THREE.IcosahedronGeometry(radius, 1);
  var solidMesh = new THREE.MeshLambertMaterial({ 
    transparent: true,
    opacity: opacity,
    color: color,
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
}

CHRYSICS.GEOMETRY.Icosahedron.prototype = _.extend({

  setPosition: function() {
    if (arguments.length == 1) {
      this.geometry.position.set(
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
    }
  },

  setColor: function(color) {
    this.geometry.children[0].material.color.setHex(color);
  },
 
}, CHRYSICS.GEOMETRY.Primitive.prototype);
