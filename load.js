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
loader.add('lib/underscore.min');
loader.add('lib/RequestAnimationFrame');
loader.add('lib/Three');
loader.add('lib/stats');

// Basic Chrysics Library
loader.add('src/Chrysics');

loader.add('src/Core/Const');
loader.add('src/Core/Utils');
loader.add('src/Core/Math/Vector3');
loader.add('src/Core/Math/Matrix3');
loader.add('src/Core/Math/Matrix4');
loader.add('src/Core/Math/Quaternion');
loader.add('src/Core/Math/Statistics');
loader.add('src/Core/Math/Distance');

loader.add('src/Core/Primitives/Point');
loader.add('src/Core/Primitives/Plane');
loader.add('src/Core/Primitives/Sphere');
loader.add('src/Core/Primitives/Segment');
loader.add('src/Core/Primitives/Ray');
loader.add('src/Core/Primitives/Triangle');

loader.add('src/Collision/BV');
loader.add('src/Collision/BVH');
loader.add('src/Collision/AABB');
loader.add('src/Collision/Sphere');
loader.add('src/Collision/Intersection');
loader.add('src/Collision/ClosestPoint');
loader.add('src/Collision/PrimitiveTest');
loader.add('src/Collision/SpatialTest');

loader.add('src/Render/Geometry');
loader.add('src/Render/Point');
loader.add('src/Render/Sphere');
loader.add('src/Render/Segment');
loader.add('src/Render/Ray');
loader.add('src/Render/Plane');
loader.add('src/Render/Cone');
loader.add('src/Render/AABB');
loader.add('src/Render/Triangle');
loader.add('src/Render/Icosahedron');
loader.add('src/Render/Coordinate');

loader.add('src/Particle/Particle');
loader.add('src/Particle/ParticleForceGenerator');
loader.add('src/Particle/ParticleForceRegistry');
loader.add('src/Particle/ParticleWorld');

loader.add('src/RigidBody/ForceGenerator');
loader.add('src/RigidBody/ForceRegistry');
loader.add('src/RigidBody/RigidBody');

loader.add('src/GeometryWorld');
loader.add('src/RenderingWorld');
loader.add('src/World');


// Examples

// Object Loaders
loader.add('lib/OBJLoader');
loader.add('lib/VTKLoader');

// Demo Objects
loader.add('demo/Objects/UserObject');
loader.add('demo/Objects/Ball');
loader.add('demo/Objects/Bunny');
loader.add('demo/Objects/Icosahedron');

// Physics Demos
loader.add('demo/Physics/GravityField');
loader.add('demo/Physics/ParticleSpring');
loader.add('demo/Physics/Spinning');

// Bounding Volume
loader.add('demo/BoundingVolume/ObjectsGroup');
loader.add('demo/BoundingVolume/AABBForGroup');
loader.add('demo/BoundingVolume/BoundingSphere');
loader.add('demo/BoundingVolume/BoundingSphereForGroup');
loader.add('demo/BoundingVolume/BoundingBunny');

// Closest Point
loader.add('demo/ClosestPoint/OnPlaneToPoint');
loader.add('demo/ClosestPoint/OnSegmentToPoint');
loader.add('demo/ClosestPoint/OnAABBToPoint');
loader.add('demo/ClosestPoint/OnTriangleToPoint');
loader.add('demo/ClosestPoint/BetweenTwoSegments');

// Primitive Tests
loader.add('demo/PrimitiveTests/SpherePlane');
loader.add('demo/PrimitiveTests/AABBPlane');
loader.add('demo/PrimitiveTests/SphereAABB');
loader.add('demo/PrimitiveTests/SphereTriangle');
loader.add('demo/PrimitiveTests/AABBTriangle');
loader.add('demo/PrimitiveTests/SegmentAABB');

// Intersections
loader.add('demo/Intersections/SegmentPlane');
loader.add('demo/Intersections/SegmentTriangle');
loader.add('demo/Intersections/SegmentPolyhedron');
loader.add('demo/Intersections/RaySphere');
loader.add('demo/Intersections/RayAABB');
loader.add('demo/Intersections/LineTriangle');

// BVH
loader.add('demo/BVH/MeanPartition');
loader.add('demo/BVH/TopdownAABB');
loader.add('demo/BVH/TopdownAABBForIcosahedron');
loader.add('demo/BVH/TopdownAABBForKey');
loader.add('demo/BVH/TopdownSphere');

// Demo Driver
loader.add('demo/DemoCollection');
loader.add('demo/DemoController');

// Main
loader.add('main');

loader.load();
