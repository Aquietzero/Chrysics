/**
 * Bouding Volume Hierarchy(BVH) is used to arranging the bounding
 * volumes into a tree hierarchy. Which reduces the time complexity
 * to logarithmic in the number of tests perform in collision 
 * detection.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.BVH = {

  NODE : 'NODE',
  LEAF : 'LEAF',

}

/**
 * _Node is the fundermental structure of the BVH.
 *
 * @type   {String} Type of the node. Whether 'NODE' or 'LEAF'.
 * @BV     {BV}     The bounding volume of the node's children.
 * @object {Object} Additional information of the leaf.
 * @left   {BVH}    Left subtree of the BVH.
 * @right  {BVH}    Right subtree of the BVH.
 */
CHRYSICS.BVH._Node = function(type) {
  this.type   = type || CHRYSICS.BVH.NODE;
  this.BV     = null;
  this.object = null;
  this.left   = null;
  this.right  = null;
}

/**
 * The partition strategies while building the BVH.
 *
 * Partitions the input set of objects into two subsets according
 * to different criterions.
 */
CHRYSICS.BVH.Partition = {

  // Partition the objects through the mean of the centroid coordinates.
  mean: function(objs) {
    if (!objs || objs.length == 0) return; 
    // Get centroid of each object.
    var centroids = [];
    for (var i = 0; i < objs.length; ++i)
      centroids.push(objs[i].getCentroid());

    // Calculate the most distant point pair according to the centroids 
    // of the objects.
    var distantPoints = CHRYSICS.BV.mostSeparatedPointsOnAABB(centroids);

    var min = distantPoints.min
      , max = distantPoints.max
      , dir = max.sub(min)
      , mid = min.add(dir.mul(0.5));

    var centroid
      , left  = []
      , right = [];

    for (var i = 0; i < centroids.length; ++i) {
      c = centroids[i];
      if (c.sub(mid).dotProduct(dir) < 0)
        left.push(objs[i]);
      else
        right.push(objs[i]);
    }

    return {
      left  : left,
      right : right
    }
  },

  // Partition the objects at the object median evenly distributes the
  // primitives between the subsets, resulting in a balanced tree.
  median: function(objs) {
    if (!objs || objs.length == 0) return; 
    // Get centroid of each object.
    var centroids = [];
    for (var i = 0; i < objs.length; ++i)
      centroids.push(objs[i].getCentroid());

    // Calculate the most distant point pair according to the centroids 
    // of the objects.
    var distantPoints = CHRYSICS.BV.mostSeparatedPointsOnAABB(centroids);

    var min = distantPoints.min
      , max = distantPoints.max
      , dir = max.sub(min)
      , mid = min.add(dir.mul(0.5));

    var compare = (function(dir) {
      return function(obj1, obj2) {
        var c1 = obj1.getCentroid();
        var c2 = obj2.getCentroid();
        var diff = c1.sub(c2);
        return diff.dotProduct(dir);
      }
    })(dir);

    objs.sort(compare);
    var half = Math.floor(objs.length / 2);

    return {
      left  : objs.slice(0, half),
      right : objs.slice(half, objs.length)
    }
  },

  // Partition the points of the points' median evenly distributes the
  // primitives between the subsets, resulting in a balanced tree.
  median_points: function(ps) {
    if (!ps || ps.length == 0) return; 
    // Calculate the most distant point pair according to the centroids 
    // of the objects.
    var distantPoints = CHRYSICS.BV.mostSeparatedPointsOnAABB(ps);

    var min = distantPoints.min
      , max = distantPoints.max
      , dir = max.sub(min)
      , mid = min.add(dir.mul(0.5));

    var compare = (function(dir) {
      return function(p1, p2) {
        var diff = p1.sub(p2);
        return diff.dotProduct(dir);
      }
    })(dir);

    ps.sort(compare);
    var half = Math.floor(ps.length / 2);

    return {
      left  : ps.slice(0, half),
      right : ps.slice(half, ps.length)
    }
  }
                                     
}                                    

/**
 * A top-down method can be described in terms of a recursive 
 * procedure. It starts out by bounding the input set of 
 * primitives (or objects) in a bounding volume. These primitives
 * are then partitioned into two subsets. The procedure is now
 * called recursively to form subhierarchies for the two subsets,
 * which are then connected as children to the parent volume. The
 * recursion stops when the input set consists of a single primitive
 * (or, if elected, earlier than that), at which point the procedure
 * just returns after creating the bounding volume for the primitive.
 */
CHRYSICS.BVH.TopdownBVT = function(objs, type, leafSize) {
  var root = new CHRYSICS.BVH._Node();
  leafSize = leafSize || 1;

  var build = function(node, objs) {
    // The partition is empty.
    if (!objs) return;

    if (objs.length < leafSize + 1) {
      node.type = CHRYSICS.BVH.LEAF;
      node.object = objs;
    } else {
      node.type = CHRYSICS.BVH.NODE;
      node.BV = CHRYSICS.BV.computeBoundingVolume(objs, type);

      // Based on some partitioning strategies, arrange objects
      // into two partitions: object[0...k] and object[k...len].
      var partition = CHRYSICS.BVH.Partition.mean(objs);

      // Recursively construct left and right subtrees.
      node.left  = new CHRYSICS.BVH._Node();
      node.right = new CHRYSICS.BVH._Node();

      build(node.left, partition.left);
      build(node.right, partition.right);
    }
  }

  build(root, objs);
  return root;
}

CHRYSICS.BVH.TopdownBVTObject = function(obj, leafSize) {
  var root = new CHRYSICS.BVH._Node();
  leafSize = leafSize || 1;

  var build = function(node, ps) {
    // The partition is empty.
    if (!ps) return;

    if (ps.length < leafSize + 1) {
      node.type = CHRYSICS.BVH.LEAF;
      node.object = ps;
    } else {
      node.type = CHRYSICS.BVH.NODE;
      node.BV = new CHRYSICS.BV.AABB(ps);

      // Based on some partitioning strategies, arrange objects
      // into two partitions: object[0...k] and object[k...len].
      var partition = CHRYSICS.BVH.Partition.median_points(ps);

      // Recursively construct left and right subtrees.
      node.left  = new CHRYSICS.BVH._Node();
      node.right = new CHRYSICS.BVH._Node();

      build(node.left, partition.left);
      build(node.right, partition.right);
    }
  }

  build(root, obj.getData());
  return root;
}

/**
 * BVH.Utils defines some useful statistic methods to help gaining
 * information about the BVH structure.
 */
CHRYSICS.BVH.Utils = {

  // Traverse the BVH structure in preorder.
  preorder: function(bvh, fn) {
    if (bvh.type == CHRYSICS.BVH.LEAF)
      return;

    fn(bvh.BV);
    CHRYSICS.BVH.Utils.preorder(bvh.left, fn);
    CHRYSICS.BVH.Utils.preorder(bvh.right, fn);
  },

  // Count the number of nodes in the BVH structure, including the
  // interior nodes and leaves.
  count: function(bvh) {
    return (function cnt(bvh) {
      if (bvh) 
        return cnt(bvh.left) + cnt(bvh.right) + 1;
      return 0;
    })(bvh);
  },

  // Calculate the depth of the BVH structure.
  depth: function(bvh) {
    return (function dep(bvh) {
      if (bvh)
        return Math.max(dep(bvh.left), dep(bvh.right)) + 1;
      return 0;
    })(bvh) - 1;
  }

}
