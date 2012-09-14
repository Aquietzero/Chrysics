# BVH

2012.9.14.

The concept of BVH is fairly simple to understand. But combined with other things, it is not so easy to implement. I am going to figure out the whole process below:

## The Necessities

The following concepts are needed.

+ The BVH node.
+ The BVH structure.

The following utilities are needed.

+ A method to compute the bounding volume of a group of objects.
+ A method to partition the objects into two groups for recursive construction.

## The Workflow

The topdown method is adopted here.

1. Generate the new root of the tree.
2. Set the root type as a BVH node.
3. Compute the bounding volume of the group of objects given.
4. Partition the objects into two groups.
5. Build the subtrees according to the new group of objects.
6. Recursively construct until the node only contains one object.

Procedure 1, 2, 5 and 6 are quite obvious while procedure 4 and 5 needs more.

### Compute the Bounding Volume

Bounding volume is computed through a set of vertices. So one pre-requist is that **the vertices of the objects should be given**, so that each objects should provide a method for exposing its vertices information outside. Then all the vertices can be grouped for bounding volume computation. Once the bounding volume is calculated successfully, then it can be bounded to the root of the tree/subtree.

### Partition

Partition the objects into two groups can be divided into several procedures, too.

1. Decide the partition axis.
2. Find a split point on the axis.

For procedure 1, I can use `CHRYSICS.BV.mostSeparatedPointsOnAABB` to find out the most separated point pair. Then I can use the point pair to define a line, which can be further used as the partition axis. But as the input of that method, a set of points is needed. I think the reasonable way to get those points is to calculate the centroid of each object before hand, or just requrie the objects to provide a method to return the centroid.
