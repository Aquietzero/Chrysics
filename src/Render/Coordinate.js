/**
 * Coordinate.
 */
CHRYSICS.GEOMETRY.Coordinate = function(sizeX, sizeY, sizeZ) {

  this.geometry = new THREE.Object3D();

  var origin = new CHRYSICS.GEOMETRY.Point(
    new CHRYSICS.Point(0, 0, 0),
    10,
    0xffff00
  );

  var axisX = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Segment(
      new CHRYSICS.Point(-sizeX, 0, 0),
      new CHRYSICS.Point(sizeX, 0, 0)
    )
  );
  axisX.initWithCylinder(3, 0xff0000);

  var axisY = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Segment(
      new CHRYSICS.Point(0, -sizeY, 0),
      new CHRYSICS.Point(0, sizeY, 0)
    )
  );
  axisY.initWithCylinder(3, 0x00ff00);

  var axisZ = new CHRYSICS.GEOMETRY.Segment(
    new CHRYSICS.Segment(
      new CHRYSICS.Point(0, 0, -sizeZ),
      new CHRYSICS.Point(0, 0, sizeZ)
    )
  );
  axisZ.initWithCylinder(3, 0x0000ff);

  var coneX = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0xff0000,
    new CHRYSICS.Point(sizeX, 0, 0),
    new CHRYSICS.Vector3(1, 0, 0)
  );

  var coneY = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0x00ff00,
    new CHRYSICS.Point(0, sizeY, 0),
    new CHRYSICS.Vector3(0, 1, 0)
  );

  var coneZ = new CHRYSICS.GEOMETRY.Cone(
    10,
    20,
    0x0000ff,
    new CHRYSICS.Point(0, 0, sizeZ),
    new CHRYSICS.Vector3(0, 0, 1)
  );

  this.geometry.add(origin.getGeometry());
  this.geometry.add(axisX.getGeometry());
  this.geometry.add(axisY.getGeometry());
  this.geometry.add(axisZ.getGeometry());
  this.geometry.add(coneX.getGeometry());
  this.geometry.add(coneY.getGeometry());
  this.geometry.add(coneZ.getGeometry());

}

CHRYSICS.GEOMETRY.Coordinate.prototype = _.extend(
  CHRYSICS.GEOMETRY.Primitive.prototype, {

});
