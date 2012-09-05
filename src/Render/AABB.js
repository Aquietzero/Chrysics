/**
 * AABB.
 */
CHRYSICS.GEOMETRY.AABB = function(aabb, color, opacity) {

  this.aabb = aabb;

  var geom = new THREE.CubeGeometry(aabb.rx * 2, aabb.ry * 2, aabb.rz * 2);
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

  this.setPosition(this.aabb.c);

}

CHRYSICS.GEOMETRY.AABB.prototype = _.extend({

  setPosition: function() {

    if (arguments.length == 1) {
      this.geometry.position.set(
        arguments[0].x,
        arguments[0].y,
        arguments[0].z
      );
      this.aabb.c = new CHRYSICS.Vector3(
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
      this.aabb.c = new CHRYSICS.Vector3(
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
