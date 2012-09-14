/**
 * A simple demo shows the methods in PrimitiveTest.js
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var RayAABB = function(container) {

  this.world = new GeometryWorld(container);
  this.initWorld();

  this.state = 'RUNNING';

}

RayAABB.prototype = {

  initWorld: function() {

    // Testing AABB.
    var aabb = new CHRYSICS.BV.AABB([
      new CHRYSICS.Vector3(-200, -125, -200),
      new CHRYSICS.Vector3( 200, -125, -200),
      new CHRYSICS.Vector3( 200, -125,  200),
      new CHRYSICS.Vector3(-200, -125,  200),
      new CHRYSICS.Vector3(-200,  125, -200),
      new CHRYSICS.Vector3( 200,  125, -200),
      new CHRYSICS.Vector3( 200,  125,  200),
      new CHRYSICS.Vector3(-200,  125,  200)
    ]);
    this.aabb = new CHRYSICS.GEOMETRY.AABB(aabb, 0x333333, 0.5);

    // Testing ray.
    var ray = new CHRYSICS.Ray(
      new CHRYSICS.Point(350, 0, 0),
      new CHRYSICS.Vector3(1, -1, 0)
    );
    this.ray = new CHRYSICS.GEOMETRY.Ray(ray, 800, 3, 0x550055);
    
    // Intersection point between plane and segment.
    this.intersect = new CHRYSICS.GEOMETRY.Point(
      new CHRYSICS.Point(0, 0, 0),
      10,
      0xff0000
    );
 
    // Decorate point.
    var point = new CHRYSICS.Point(350, 0, 0);
    this.point = new CHRYSICS.GEOMETRY.Point(point, 10, 0x550055);
   
    this.world.add(new CHRYSICS.GEOMETRY.Coordinate(400, 300, 400));
    this.world.add(this.aabb);
    this.world.add(this.ray);
    this.world.add(this.intersect);
    this.world.add(this.point);
    
  },

  iterate: function() {

    var self = this;
    var ray = this.ray.ray;
    var aabb = this.aabb.aabb;
    var theta = 0;

    return function() {

      theta  += 0.02;
      var dir = new CHRYSICS.Vector3(
        -1, 
        0.5 * Math.sin(theta),
        0.5 * Math.cos(theta)
      );
      dir.normalizeSelf();

      ray.dir = dir;
      self.ray.update();

      var intersect = CHRYSICS.BV.Intersection.rayAABB(ray, aabb);
      console.log(intersect);
      if (intersect) {
        self.intersect.setPosition(intersect);
        self.intersect.setOpacity(1);
      } else {
        self.intersect.setOpacity(0);
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
