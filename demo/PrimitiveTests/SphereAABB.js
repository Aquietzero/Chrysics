/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var SphereAABB = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

SphereAABB.prototype = {

  initWorld: function() {

    var sphere = new CHRYSICS.Sphere(
      new CHRYSICS.Vector3(-150, -150, -150),
      50
    );
    this.sphere = new CHRYSICS.GEOMETRY.Sphere(sphere, 50, 0x333333);
    console.log(this.sphere);

    var aabb = new CHRYSICS.BV.AABB([
      new CHRYSICS.Vector3(-100, -25, -100),
      new CHRYSICS.Vector3( 100, -25, -100),
      new CHRYSICS.Vector3( 100, -25,  100),
      new CHRYSICS.Vector3(-100, -25,  100),
      new CHRYSICS.Vector3(-100,  25, -100),
      new CHRYSICS.Vector3( 100,  25, -100),
      new CHRYSICS.Vector3( 100,  25,  100),
      new CHRYSICS.Vector3(-100,  25,  100)
    ]);
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 1);

    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400));
    this.world.add(this.sphere);
    this.world.add(this.aabb);
    
  },

  iterate: function() {

    var offset = new CHRYSICS.Vector3(1, 1, 1);
    var pos = new CHRYSICS.Vector3(-150, -150, -150);
    var rst;
    var self = this;
    var s = self.sphere.sphere;
    var aabb = self.aabb.aabb;
    return function() {

      if (pos.y < -150)
        offset = new CHRYSICS.Vector3(1, 1, 1);
      else if (pos.y > 150)
        offset = new CHRYSICS.Vector3(-1, -1, -1);
      pos.addVector(offset);

      self.sphere.setPosition(pos.x, pos.y, pos.z);
      if (CHRYSICS.PrimitiveTest.sphereAABB(s, aabb)) {
        self.sphere.setColor(0x990000);
        self.aabb.setColor(0x990000);
      } else {
        self.sphere.setColor(0x333333);
        self.aabb.setColor(0x333333);
      }
    
    };
  
  },

  animate: function() {

    var self = this;
    var iter = this.iterate();
    var loop = function() {

      self.world.render();
      iter();

      if (self.state == 'RUNNING')
        window.requestAnimationFrame(loop);

    }
    window.requestAnimationFrame(loop);

  },

  stop: function() {

    this.state = 'STOP';
  
  },



}