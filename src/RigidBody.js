/**
 * Rigid body is the basic object structure in the physics engine.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.RigidBody = function() {

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

  this.position = new CHRYSICS.Vector3();

  /**
   * Velocity is the linear velocity of the rigid body.
   */
  this.velocity = new CHRYSICS.Vector3();

  /**
   * Rotation is the angular velocity of the rigid body.
   */
  this.rotation = new CHRYSICS.Vector3();

  this.orientation = new CHRYSICS.Quaternion();

  this.transform = new CHRYSICS.Matrix4();

}
