/**
 * Triangle
*/
CHRYSICS.GEOMETRY.Triangle = function(triangle, color) {

  this.triangle = triangle;

  var geom = new THREE.Geometry();
  var v1 = triangle.v1;
  var v2 = triangle.v2;
  var v3 = triangle.v3;

  geom.vertices.push(new THREE.Vector3(v1.x, v1.y, v1.z));
  geom.vertices.push(new THREE.Vector3(v2.x, v2.y, v2.z));
  geom.vertices.push(new THREE.Vector3(v3.x, v3.y, v3.z));

  geom.faces.push(new THREE.Face3(0,2,1));
  geom.computeFaceNormals();

  var solidMesh = new THREE.Mesh(
    geom,
    new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
    })
  );
  solidMesh.doubleSided = true;
  var frameMesh = new THREE.Mesh(
    geom,
    new THREE.MeshLambertMaterial({
      color: 0x000000,
      wireframe: true
    })
  );

  this.geometry = new THREE.Object3D();
  this.geometry.add(solidMesh);
  this.geometry.add(frameMesh);

}

CHRYSICS.GEOMETRY.Triangle.prototype = _.extend({

  setColor: function(color) {

    this.geometry.children[0].material.color.setHex(color);
  
  }

}, CHRYSICS.GEOMETRY.Primitive.prototype);


