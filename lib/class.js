/**
 * class.js defines some useful methods to stimulate class in js.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var __hasProp = {}.hasOwnProperty;

var extend = function(child, parent) {

  // Copies the methods in parent to child.
  for (var key in parent) {
    if (__hasProp.call(parent, key))
      child[key] = parent[key]; 
  } 
  
  // Connect the prototype chain.
  function ctor() { 
    this.constructor = child; 
  } 
  
  ctor.prototype = parent.prototype; 
  child.prototype = new ctor(); 
  
  child.__super__ = parent.prototype; 
  
  return child;

}

var Base = (function() {

  function Base(value) {
    this.value = value;
  }

  Base.prototype = {
    get: function() {
      return this.value;
    },
    set: function(value) {
      this.value = value;
    }
  }

  return Base;

})();

var Sub = (function(_super) {

  extend(Sub, _super);

  function Sub() {
    return Sub.__super__.constructor.apply(this, arguments);
  }

  Sub.prototype = {
    
  }

  return Sub;

})(Base);

var s = new Sub(47);
console.log(s.get());
