/**
 * Statistics.js defines some useful methods in statistics.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Statistics = {

  mean: function(xs) {

    return CHRYSICS.Utils.sum(xs) / xs.length;
  
  },

  variance: function(xs) {
  
    var sum2 = 0;
    var mean = this.mean(xs);

    for (var i = 0; i < xs.length; ++i)
      sum2 += (xs[i] - mean) * (xs[i] - mean);

    return sum2 / xs.length;
  
  },

  covarianceMatrix: function(xs) {
  
    var dividor = 1 / xs.length;
    var centroid = new CHRYSICS.Vector3();
    var point = new CHRYSICS.Vector3();

    // Calculate the centroid of the mass of points.
    for (var i = 0; i < xs.length; ++i)
      centroid.addVector(xs[i]);
    centroid.mulScalar(dividor);

    var cov00 = 0, cov11 = 0, cov22 = 0,
        cov01 = 0, cov02 = 0, cov12 = 0;

    for (var i = 0; i < xs.length; ++i) {

      // Translate the points so that the centroid acts
      // as the origin of the mass of points.
      point = xs[i].sub(centroid);
      
      cov00 = point.x * point.x;
      cov11 = point.y * point.y;
      cov22 = point.z * point.z;
      cov01 = point.x * point.y;
      cov02 = point.x * point.z;
      cov12 = point.y * point.z;
    
    }

    return (new CHRYSICS.Matrix3(
      cov00, cov01, cov02,
      cov01, cov11, cov12,
      cov02, cov12, cov22
    ).mul(dividor));
  
  },

}
