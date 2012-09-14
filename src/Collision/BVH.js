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
  LEAF : 'LEAF'

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

  mean: function(objs) {

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
      , right = []

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

  }                                  
                                     
}                                    

CHRYSICS.BVH.TopdownBVT = function(objs) {

  var root;

  var build = function(node, objs) {

    node = new CHRYSICS.BVH._Node();
    node.BV = CHRYSICS.BV.computeBoundingVolume(objs);

    if (objs.length == 1) {
      node.type = CHRYSICS.BVH.LEAF;
      node.object = objs[0];
    } else {
      node.type = CHRYSICS.BVH.NODE;
      // Based on some partitioning strategies, arrange objects
      // into two partitions: object[0...k] and object[k...len].
      var partition = CHRYSICS.BVH.Partition.mean(objs);
      // Recursively construct left and right subtrees.
      build(node.left, partition.left);
      build(node.right, partition.right);
    }
  
  }

  return build(root, objs);

}
