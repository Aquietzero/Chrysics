/**
 * Determinant.js involves some algorithms use for determining some
 * spatial relationships with convenience. Inputs of the methods are
 * all row vectors.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */
CHRYSICS.SpatialTest = {

  LEFT_TO_LINE  : 'LEFT_TO_LINE',
  RIGHT_TO_LINE : 'RIGHT_TO_LINE',
  ON_THE_LINE   : 'ON_THE_LINE',

  ABOVE_THE_PLANE : 'ABOVE_THE_PLANE',
  BELOW_THE_PLANE : 'BELOW_THE_PLANE',
  ON_THE_PLANE    : 'ON_THE_PLANE',

  INSIDE_CIRCLE  : 'INSIDE_CIRCLE',
  OUTSIDE_CIRCLE : 'OUTSIDE_CIRCLE',
  ON_THE_CIRCLE  : 'ON_THE_CIRCLE',

  INSIDE_SPHERE  : 'INSIDE_SPHERE',
  OUTSIDE_SPHERE : 'OUTSIDE_SPHERE',
  ON_THE_SPHERE  : 'ON_THE_SPHERE',

  determinant2: function(
    m11, m12,
    m21, m22
  ) {

    return m11*m22 - m12*m21;
  
  },

  determinant3: function(
    m11, m12, m13,
    m21, m22, m23,
    m31, m32, m33
  ) {

    return m11*m22*m33 + m21*m32*m13 + m31*m12*m23 -
           m11*m32*m23 - m31*m22*m13 - m21*m12*m33;

  },

  determinant4: function(
    m11, m12, m13, m14,
    m21, m22, m23, m24,
    m31, m32, m33, m34,
    m41, m42, m43, m44
  ) {

    var det1 = m33*m44 - m34*m43,
        det2 = m32*m44 - m34*m42,
        det3 = m32*m43 - m33*m42,
        det4 = m31*m44 - m34*m41,
        det5 = m31*m43 - m33*m41,
        det6 = m31*m42 - m32*m41;

    return m11 * (m22*det1 - m23*det2 + m24*det3) -
           m12 * (m21*det1 - m23*det4 + m24*det5) +
           m13 * (m21*det2 - m22*det4 + m24*det6) -
           m14 * (m21*det3 - m22*det5 + m23*det6);

  },

  /**
   * inLine is used to determine the relationship of three points A, B and C 
   * in a two dimensional plane. 
   *
   *  (1) inLine > 0, C lies to the left to the directed line AB.
   *  (2) inLine = 0, A, B, C are colinear.
   *  (3) inLine < 0, C lies to the right to the directed line AB.
   *
   *                   | ax ay 1 |
   * inLine(A, B, C) = | bx by 1 | = | ax-cx ay-cy |
   *                   | cx cy 1 |   | bx-cx by-cy |
   *
   * where A = (ax, ay), B = (bx, by), C = (cx, cy)
   */
  inLine: function(A, B, C) {
    
    var ax = A.x, ay = A.y,
        bx = B.x, by = B.y,
        cx = C.x, cy = C.y;

    var det = this.determinant2(
      ax - cx, ay - cy,
      bx - cx, by - cy
    );

    if (CHRYSICS.Utils.gtZero(det))
      return this.LEFT_TO_LINE;
    if (CHRYSICS.Utils.isZero(det))
      return this.ON_THE_LINE;
    if (CHRYSICS.Utils.ltZero(det))
      return this.RIGHT_TO_LINE;

  },

  /**
   * inPlane is used to determine the relationship of four points A, B, C 
   * and D in a three dimensional space. 
   *
   *  (1) inPlane > 0, D lies below the plane form by triangle ABC.
   *  (2) inPlane = 0, A, B, C, D are coplanar.
   *  (3) inPlane < 0, D lies above the plane form by triangle ABC.
   *
   *                       | ax ay az 1 |   | ax-dx ay-dy az-dz |
   * inPlane(A, B, C, D) = | bx by bz 1 | = | bx-dx by-dy bz-dz |
   *                       | cx cy cz 1 |   | cx-dx cy-dy cz-dz |
   *                       | dx dy dz 1 |   
   *                     = (A - D) * [(B - D) x (C - D)]
   *
   * where A = (ax, ay, az), B = (bx, by, bz), C = (cx, cy, cz), D = (dx, dy, dz)
   */
  inPlane: function(A, B, C, D) {
    
    var ax = A.x, ay = A.y, az = A.z,
        bx = B.x, by = B.y, bz = B.z,
        cx = C.x, cy = C.y, cz = C.z,
        dx = D.x, dy = D.y, dz = D.z;

    var det = this.determinant3(
      ax - dx, ay - dy, az - dz,
      bx - dx, by - dy, bz - dz,
      cx - dx, cy - dy, cz - dz
    );

    if (CHRYSICS.Utils.gtZero(det))
      return this.BELOW_THE_PLANE;
    if (CHRYSICS.Utils.isZero(det))
      return this.ON_THE_PLANE;
    if (CHRYSICS.Utils.ltZero(det))
      return this.ABOVE_THE_PLANE;

  },

  /**
   * inCircle is used to determine the relationship of four points A, B, C 
   * and D in a three dimensional space. 
   *
   *  (1) inCircle > 0, D lies inside the circle form by A, B, C counterclockwise.
   *  (2) inCircle = 0, A, B, C, D are cocircular.
   *  (3) inCircle < 0, D lies outside the circle form by A, B, C counterclockwise.
   *
   *                        | ax ay ax*ax+ay*ay 1 | 
   * inCircle(A, B, C, D) = | bx by bx*bx+by*by 1 | 
   *                        | cx cy cx*cx+cy*cy 1 | 
   *                        | dx dy dx*dx+dy*dy 1 |   
   *
   *                        | ax-dx ay-dy (ax-dx)*(ax-dx)+(ay-dy)*(ay-dy) |
   *                      = | bx-dx by-dy (bx-dx)*(bx-dx)+(by-dy)*(by-dy) |
   *                        | cx-dx cy-dy (cx-dx)*(cx-dx)+(cy-dy)*(cy-dy) |
   * 
   * where A = (ax, ay), B = (bx, by), C = (cx, cy), D = (dx, dy)
   */
  inCircle: function(A, B, C, D) {
     
    var ax = A.x, ay = A.y,
        bx = B.x, by = B.y,
        cx = C.x, cy = C.y,
        dx = D.x, dy = D.y;

    var det = this.determinant3(
      ax-dx, ay-dy, (ax-dx)*(ax-dx)+(ay-dy)*(ay-dy),
      bx-dx, by-dy, (bx-dx)*(bx-dx)+(by-dy)*(by-dy),
      cx-dx, cy-dy, (cx-dx)*(cx-dx)+(cy-dy)*(cy-dy)
    );

    if (CHRYSICS.Utils.gtZero(det))
      return this.INSIDE_CIRCLE;
    if (CHRYSICS.Utils.isZero(det))
      return this.ON_THE_CIRCLE;
    if (CHRYSICS.Utils.ltZero(det))
      return this.OUTSIDE_CIRCLE;

  },

  /**
   * inSphere is used to determine the relationship of four points A, B, C 
   * and D in a three dimensional space. 
   *
   *  (1) inSphere > 0, E lies inside the sphere form by A, B, C and D.
   *  (2) inSphere = 0, A, B, C, D, E are cospherical.
   *  (3) inSphere < 0, E lies outside the sphere form by A, B, C and D.
   *
   *                           | ax ay az ax*ax+ay*ay+az*az 1 | 
   * inSphere(A, B, C, D, E) = | bx by bz bx*bx+by*by+bz*bz 1 | 
   *                           | cx cy cz cx*cx+cy*cy+cz*cz 1 | 
   *                           | dx dy cz dx*dx+dy*dy+dz*dz 1 |   
   *                           | ex ey ez ex*ex+ey*ey+ez*ez 1 |   
   *
   *     | ax-ex ay-ey az-ez (ax-ex)*(ax-ex)+(ay-ey)*(ay-ey)+(az-ez)*(az-ez) |
   *   = | bx-ex by-ey bz-ez (bx-ex)*(bx-ex)+(by-ey)*(by-ey)+(bz-ez)*(bz-ez) |
   *     | cx-ex cy-ey cz-ez (cx-ex)*(cx-ex)+(cy-ey)*(cy-ey)+(cz-ez)*(cz-ez) |
   *     | dx-ex dy-ey dz-ez (dx-ex)*(dx-ex)+(dy-ey)*(dy-ey)+(dz-ez)*(dz-ez) |
   * 
   * where A = (ax, ay, az), B = (bx, by, bz), C = (cx, cy, cz), D = (dx, dy, dz),
   * E = (ex, ey, ez)
   */
  inPlane: function(A, B, C, D, E) {
    
    var ax = A.x, ay = A.y, az = A.z,
        bx = B.x, by = B.y, bz = B.z,
        cx = C.x, cy = C.y, cz = C.z,
        dx = D.x, dy = D.y, dz = D.z;
        ex = E.x, ey = E.y, ez = E.z;

    var det = this.determinant3(
      ax-ex, ay-ey, az-ez, (ax-ex)*(ax-ex)+(ay-ey)*(ay-ey)+(az-ez)*(az-ez),
      bx-ex, by-ey, bz-ez, (bx-ex)*(bx-ex)+(by-ey)*(by-ey)+(bz-ez)*(bz-ez),
      cx-ex, cy-ey, cz-ez, (cx-ex)*(cx-ex)+(cy-ey)*(cy-ey)+(cz-ez)*(cz-ez),
      dx-ex, dy-ey, dz-ez, (dx-ex)*(dx-ex)+(dy-ey)*(dy-ey)+(dz-ez)*(dz-ez)
    );

    if (CHRYSICS.Utils.gtZero(det))
      return this.INSIDE_SPHERE;
    if (CHRYSICS.Utils.isZero(det))
      return this.ON_THE_SPHERE;
    if (CHRYSICS.Utils.ltZero(det))
      return this.OUTSIDE_SPHERE;

  },

  /**
   * Determine if the quadrilateral form by points A, B, C and D is a 
   * convex quadrilateral or not.
   *
   *   (BD x BA) * (BD x BC) < 0 and 
   *   (AC x AD) * (AC x AB) < 0
   */
  isConvexQuad: function(A, B, C, D) {

    var bda = D.sub(B).crossProduct(A.sub(B));
    var bdc = D.sub(B).crossProduct(C.sub(B));

    if (CHRYSICS.Utils.gtZero(bda.dotProduct(bdc)))
      return false;

    var acd = C.sub(A).crossProduct(D.sub(A));
    var acb = C.sub(A).crossProduct(B.sub(A));

    return CHRYSICS.Utils.ltZero(acd.dotProduct(acb));
  
  },

}
