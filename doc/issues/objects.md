# Objects

2012.9.14

In this project, I defined several kinds of objects.

+ Objects in directory `src/Core/Primitives`
+ Objects in directory `src/Render`
+ Objects in directory `demo/Objects`

I will refer them as primitives, rendering objects and demo objects correspondingly below.

## Primitives

Primitives are a core part of the engine. Adopting them into the project makes some algorithm clear and clean, though some speed may lost. For example, when I want to get the intersection point between a plane and a segment, I can use `segmentPlane` in module `BV.Intersection` in the following way:

  ```javascript
  var intersection = CHRYSICS.BV.Intersection.segmentPlane(segment, plane);
  ```

But without these primitives, the calling may turn into the following way, which is quite verbose:

  ```javascript
  /**
   * a: The beginning of the segment.
   * b: The ending of the segment.
   * n: The normal vector of the plane.
   * d: The distance between the plane and the origin.
   */
  var intersection = CHRYSICS.BV.Intersection.segmentPlane(a, b, n, d);
  ```

In a word, when comes into these kind of basic test, primitives comes in aid and makes the code more clear and clean.

## Rendering Objects

Since the basic testing algorithms are so complicated some times, it is really hard to tell whether the code is correct or not. Even thought the algorithm is simple, it would be still really hard to debug the code without visualizing the algorithm. For such a reason, I develop a demonstration framework for these algorithms' test. And these rendering objects are all basic and simple geometric objects, such as shperes, cones, cubes and so on. They are only used to show whether the algorithm is correct or not. **They are not a part of the engine.**

## Demo Objects

Demo objects shows how the user of the engine should define the objects. The demo objects are actually using the engine, so there some rules they have to follow. For example, they should have a `getData` method, which returns the vertices' information of the object. And they should also have a `getCentroid` method, which helps the engine to determine the centroid of the object. If this method is not provided, the engine will calculates the centroid of the object by its vertices.
