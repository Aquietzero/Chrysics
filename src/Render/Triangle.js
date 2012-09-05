/**
 * Triangle
*/
CHRYSICS.GEOMETRY.Triangle = function(a, b, c, color) {

  var geom = new THREE.Geometry();
  this.v1 = new THREE.Vector3(a.x, a.y, a.z);
  this.v2 = new THREE.Vector3(b.x, b.y, b.z);
  this.v3 = new THREE.Vector3(c.x, c.y, c.z);

  geom.vertices.push(this.v1);
  geom.vertices.push(this.v2);
  geom.vertices.push(this.v3);

  geom.faces.push(new THREE.Face3(0,2,1));
  geom.computeFaceNormals();

  this.geometry = new THREE.Mesh(
    geom,
    new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
    })
  );
  this.geometry.doubleSided = true;

}

CHRYSICS.GEOMETRY.Triangle.prototype = _.extend({

}, CHRYSICS.GEOMETRY.Primitive.prototype);


