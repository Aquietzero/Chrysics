/**
 * ObjectsGroup manages a group of objects, which makes it 
 * more convenient of the rest demos on bounding volume.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var ObjectsGroup = function(length) {

  this.objects  = [];
  this.geometry = new THREE.Object3D();

}

ObjectsGroup.prototype = {

  add: function(obj) {

    this.objects.push(obj);
    this.geometry.add(obj);

  },

  getData: function() {

    var obj;
    var vertices = [];

    for (var i = 0; i < this.objects.length; ++i) {

      obj = this.objects[i];
      for (var j = 0; j < obj.geometry.vertices.length; ++j) {
        vertices.push(new CHRYSICS.Vector3(
          obj.position.x + obj.geometry.vertices[j].x,
          obj.position.y + obj.geometry.vertices[j].y,
          obj.position.z + obj.geometry.vertices[j].z
        ));
      }

    }

    return vertices;
  
  },

  getGeometry: function() {

    return this.geometry;

  },

}


