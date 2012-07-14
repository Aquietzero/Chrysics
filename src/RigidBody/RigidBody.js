/**
 * Rigid body is the basic object structure in the physics engine.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.RigidBody = function() {

  this._CLASSNAME_ = 'RigidBody';

  /**
   * inverseMass the 1/mass. Since in the Newton's second law,
   * we have:
   *
   *   a = F / m
   *
   * Using inverse mass to represent mass itself has a lot of 
   * advantages. For example, expressing immovable objects such
   * as walls and grounds becomes easy because their inverseMass
   * are 0. And if we use m directly, then divided-by-zero error
   * may occure sometimes. But intead, if we use inverseMass, 
   * this kind of situation will never occure since there is no
   * way to represent infinity in most programming languages.
   */
  this.inverseMass = 0;
  this.inverseInertiaTensor      = new CHRYSICS.Matrix3();
  this.inverseInertiaTensorWorld = new CHRYSICS.Matrix3();

  this.position    = new CHRYSICS.Vector3();
  this.orientation = new CHRYSICS.Quaternion();

  this.velocity = new CHRYSICS.Vector3();
  this.rotation = new CHRYSICS.Vector3();

  this.velocityDamping = 0.95;
  this.angularDamping  = 0.95;

  this.transform = new CHRYSICS.Matrix4();

  this.forceAccumulator  = new CHRYSICS.Vector3();
  this.torqueAccumulator = new CHRYSICS.Vector3();

  this.acceleration = new CHRYSICS.Vector3();
  // this.lastFrameAcceleration = new CHRYSICS.Vector3();

}

CHRYSICS.RigidBody.prototype = {

  calDerivedData: function() {

    this.orientation.normalizeSelf();
    this._calTransform();
    this._transformInertiaTensor();
  
  },

  _calTransform: function() {
  
    this.transform.setOrientationAndPosition(this.orientation, this.position);
  
  },

  _transformInertiaTensor: function() {

    var t   = this.transform.elements;
    var itb = this.inverseInertiaTensor.elements;
    var itw = this.inverseInertiaTensorWorld.elements;


    var t4  = t[0]*itb[0] + t[1]*itb[3] + t[2]*itb[6],
        t9  = t[0]*itb[1] + t[1]*itb[4] + t[2]*itb[7],
        t14 = t[0]*itb[2] + t[1]*itb[5] + t[2]*itb[8],
        t28 = t[4]*itb[0] + t[5]*itb[3] + t[6]*itb[6],
        t33 = t[4]*itb[1] + t[5]*itb[4] + t[6]*itb[7],
        t38 = t[4]*itb[2] + t[5]*itb[5] + t[6]*itb[8],
        t52 = t[8]*itb[0] + t[9]*itb[3] + t[10]*itb[6],
        t57 = t[8]*itb[1] + t[9]*itb[4] + t[10]*itb[7],
        t62 = t[8]*itb[2] + t[9]*itb[5] + t[10]*itb[8];

    itw[0] = t4*t[0] + t9*t[1] + t14*t[2];
    itw[1] = t4*t[4] + t9*t[5] + t14*t[6];
    itw[2] = t4*t[8] + t9*t[9] + t14*t[10];

    itw[3] = t28*t[0] + t33*t[1] + t38*t[2];
    itw[4] = t28*t[4] + t33*t[5] + t38*t[6];
    itw[5] = t28*t[8] + t33*t[9] + t38*t[10];

    itw[6] = t52*t[0] + t57*t[1] + t62*t[2];
    itw[7] = t52*t[4] + t57*t[5] + t62*t[6];
    itw[8] = t52*t[8] + t57*t[9] + t62*t[10];

  },

  setInverseInertiaTensor: function(inertiaTensor) {
  
    this.inverseInertiaTensor = inertiaTensor.inverse();
  
  },

  getPointInWorld: function(point) {
  
    return this.transform.mulVector3(point);
  
  },

  integrate: function(duration) {
  
    // a = F / m
    this.acceleration = this.forceAccumulator.mul(this.inverseMass);

    // a = t / I
    var angularAcceleration = 
      this.inverseInertiaTensorWorld.mulVector3(this.torqueAccumulator);

    // Update linear velocity and rotational velocity.
    this.velocity.addScaledVector(this.acceleration, duration);
    this.rotation.addScaledVector(angularAcceleration, duration);

    // Update linear position and orientation.
    this.position.addScaledVector(this.velocity, duration);
    this.orientation.addScaledVector(this.rotation, duration);

    this.calDerivedData();
    this.clearAccumulators();

  },

  clearAccumulators: function() {
  
    this.forceAccumulator.set(0, 0, 0);
    this.torqueAccumulator.set(0, 0, 0);

  },

  addForceAtPoint: function(force, point) {

    var pt = typeof point === 'undefined' ? 
      this.position : this.getPointInWorld(point);
  
    var radius = pt.sub(this.position);
    var torque = radius.crossProduct(force);

    /**
     * The auxiliery coefficient is used to balance the translation
     * and rotation velocity. It doesn't have any extra physical
     * meanings.
     */
    this.forceAccumulator.addVector(force);
    this.torqueAccumulator.addScaledVector(torque, 0.0001);
 
  },

  setAcceleration: function(acc) {

    this.acceleration = acc;
  
  },

  getAcceleration: function() {
  
    return this.acceleration; 
  
  },

  setMass: function(mass) {
  
    if (mass == Infinity)
      this.inverseMass = 0;
    else if (mass == 0)
      this.inverseMass = Infinity;
    else
      this.inverseMass = 1 / mass;

  },

  getMass: function() {
  
    if (this.inverseMass == 0)
      return Infinity;
    else
      return 1 / this.inverseMass;
  
  },

  getInverseMass: function() {
  
    return this.inverseMass;
  
  },

  setVelocity: function(velocity) {

    this.velocity = velocity;

  },

  getVelocity: function() {
  
    return this.velocity;
  
  },

  getClassName: function() {
  
    return this._CLASSNAME_;
  
  },

}
