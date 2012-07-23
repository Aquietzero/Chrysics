/**
 * A simple demo shows how the torque makes the icosahedron spin.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Plane = function(plane) {

  var d = plane.d;
  var n = plane.n;
  this.plane = new THREE.Mesh(
    new THREE.CubeGeometry(200, 200, 5),
    new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    })
  );

}

Plane.prototype = {

  getPhysique: function() {

  },

  getGeometry: function() {

    return this.plane;

  },

}

var ClosestPoint = function(container) {

  this.worldRendering = new RenderingWorld(container);
  this.initWorld();

}

ClosestPoint.prototype = {

  initWorld: function() {

    this.plane = new Plane(new CHRYSICS.BV.Plane(
      new CHRYSICS.Vector3(0, 0, 1),
      0
    ));
    this.worldRendering.add(this.plane);

  },


  animate: function() {

    var self = this;
    var loop = function() {

      self.worldRendering.render();
      window.requestAnimationFrame(loop);

    }

    loop();

  },

}
