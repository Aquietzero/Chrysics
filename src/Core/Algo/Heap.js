/**
 * Implementation of a maximum binary heap.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

CHRYSICS.Heap = function(arr) {
  this._heap = arr;
  this.build();
}

/**
 * Basic operations.
 *
 * parent     = (i) -> i >> 1
 * leftChild  = (i) -> i << 1
 * rightChild = (i) -> i << 1 + 1
 */
CHRYSICS.Heap.prototype = {

  // Swap two elements in the heap.
  _swap: function(i, j) {
    var temp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = temp;
  },

  // Maintain the property of the maximum binary heap.
  _heapify: function(i) {
    var l = (i + 1 << 1) - 1;
    var r = (i + 1 << 1);

    var largest = i;
    if (l < this._heap.length && this._heap[l] > this._heap[largest])
      largest = l;
    if (r < this._heap.length && this._heap[r] > this._heap[largest])
      largest = r;

    if (largest != i) {
      this._swap(i, largest);
      this._heapify(largest);
    }
  },

  // Build heap.
  build: function() {
    for (var i = Math.floor(this._heap.length/2); i >= 0; --i)
      this._heapify(i);
  },

  // Return the element with the maximum priority.
  maximum: function() {
    return this._heap[0];
  },

  // Return the element with the maximum priority and deletes it from
  // the heap.
  pop: function() {
    if (this._heap.length <= 0) return;

    var max = this._heap[0];
    this._heap[0] = this._heap[this._heap.length - 1];
    this._heap.pop();
    this._heapify(0);

    return max;
  },

  // Push a new element into the heap and maintains the heaps invariance.
  push: function(elem) {
    this._heap.push(-Infinity);
    this.update(this._heap.length - 1, elem);
  },

  // Update the value of an element and maintain the property of the
  // heap.
  update: function(i, val) {
    // The new value should be larger than the original one.
    if (this._heap[i] && this._heap[i] > val) return;

    this._heap[i] = val;
    var parent = (i - 1) >> 1;
    while (i > 0 && this._heap[parent] < this._heap[i]) {
      this._swap(i, parent);
      i = parent;
      parent = i - 1 >> 1;
    }
  },

}
