/**
 * A collection of examples, which is used for both demonstration
 * and testing.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var DemoCollection = function() {

  this.demos = {}

}

DemoCollection.prototype = {

  add: function(demoName, demo) {

    this.demos[demoName] = demo;
  
  },

  getDemos: function() {
  
    return this.demos;
  
  },

}

var DEMOS = new DemoCollection();

// Bounding Volume
DEMOS.add('AABBForGroup'           , AABBForGroup);
DEMOS.add('BoundingSphere'         , BoundingSphere);
DEMOS.add('BoundingSphereForGroup' , BoundingSphereForGroup);

// Closest Point
DEMOS.add('OnPlaneToPoint'     , OnPlaneToPoint);
DEMOS.add('OnSegmentToPoint'   , OnSegmentToPoint);
DEMOS.add('OnAABBToPoint'      , OnAABBToPoint);
DEMOS.add('OnTriangleToPoint'  , OnTriangleToPoint);
DEMOS.add('BetweenTwoSegments' , BetweenTwoSegments);

// Primitive Tests
DEMOS.add('SpherePlane'    , SpherePlane);
DEMOS.add('AABBPlane'      , AABBPlane);
DEMOS.add('SphereAABB'     , SphereAABB);
DEMOS.add('SphereTriangle' , SphereTriangle);
DEMOS.add('AABBTriangle'   , AABBTriangle);
DEMOS.add('SegmentPlane'   , SegmentPlane);

