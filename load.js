/**
 * A helper class for loading .js files.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var Loader = function() {
  this.fileQueue = [];
} 

Loader.prototype = {

  add: function(filename) {
    this.fileQueue.push(filename + '.js');
  },

  load: function() {
    var head = document.querySelector('head');
    var script;
    for (var i = 0; i < this.fileQueue.length; ++i) {
      script = document.createElement('script');
      script.src = this.fileQueue[i];
      head.appendChild(script);
    }
  },

}

var loader = new Loader();

// Auxiliary Libraries
loader.add('lib/jquery-1.8.1.min');
loader.add('lib/RequestAnimationFrame');
loader.add('lib/Three');

// Basic Chrysics Library
loader.add('src/Chrysics');

loader.add('src/Core/Const');
loader.add('src/Core/Utils');
loader.add('src/Core/Vector3');
loader.add('src/Core/Matrix3');
loader.add('src/Core/Matrix4');
loader.add('src/Core/Quaternion');
loader.add('src/Core/Statistics');

loader.add('src/Collision/BV');
loader.add('src/Collision/Distance');
loader.add('src/Collision/AABB');
loader.add('src/Collision/Point');
loader.add('src/Collision/Plane');
loader.add('src/Collision/Sphere');
loader.add('src/Collision/Segment');
loader.add('src/Collision/ClosestPoint');

loader.add('src/Test/PrimitiveTest');

loader.add('src/Auxiliary/Geometries');

loader.add('src/GeometryWorld');
loader.add('src/RenderingWorld');
loader.add('src/World');

// Examples
loader.add('demo/ClosestPoint/OnPlaneToPoint');
loader.add('demo/ClosestPoint/OnSegmentToPoint');
loader.add('demo/ClosestPoint/OnAABBToPoint');
loader.add('demo/ClosestPoint/OnTriangleToPoint');
loader.add('demo/ClosestPoint/BetweenTwoSegments');

loader.add('demo/BoundingVolume/AABBForGroup');
loader.add('demo/BoundingVolume/BoundingSphere');
loader.add('demo/BoundingVolume/BoundingSphereForGroup');

loader.add('demo/PrimitiveTests/SpherePlane');
loader.add('demo/PrimitiveTests/AABBPlane');
loader.add('demo/PrimitiveTests/SphereAABB');
loader.add('demo/PrimitiveTests/SphereTriangle');
loader.add('demo/PrimitiveTests/SegmentPlane');

// Demo Driver
loader.add('demo/DemoCollection');
loader.add('demo/DemoController');

// Main
loader.add('main');

loader.load();
