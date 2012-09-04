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

DEMOS.add('SpherePlane'    , SpherePlane);
DEMOS.add('AABBPlane'      , AABBPlane);
DEMOS.add('SphereAABB'     , SphereAABB);
DEMOS.add('SphereTriangle' , SphereTriangle);
DEMOS.add('SegmentPlane'   , SegmentPlane);
