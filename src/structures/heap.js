class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class Heap {
  constructor() {
    this.values = [];
  }

  // return true if the element from index i is less than k idx element
  lessThan(i, k) {
    // out of bounds
    if (i < 0 || k < 0) return false;
    if (i > this.values.length - 1 || k > this.values.length - 1) return false;
    let val = this.values[i].val;
    let parent = this.values[k].val;
    if (val < parent) return true;
    return false;
  }

  // insert an element in the next free spot and then sort the Heap if it's needed
  //   return Heap sorted
  enqueue(key, val) {
    let node = new Node(key, val);
    this.values.push(node);
    // last position to insert this new node
    let idx = this.values.length - 1;
    // parent of this new node
    let parentIdx = Math.floor((idx - 1) / 2);
    // sort (while this new node is smaller than its parent)
    while (this.lessThan(idx, parentIdx)) {
      //swap
      [this.values[idx], this.values[parentIdx]] = [
        this.values[parentIdx],
        this.values[idx],
      ];
      //   recalculate node, parent idx position
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return this;
  }

  // Remove the root (min), put the last element in the top and then rearrange
  // return the root and the new arrangement
  dequeue() {
    // if is empty return undefined
    if (this.values.length === 0) return undefined;
    if (this.values.length === 1)
      return { element: this.values.pop(), heap: this };
    const min = this.values[0];
    // replace the root with the last element
    this.values[0] = this.values.pop();
    // index of this node we have to sort and the idx of its children
    let idx = 0;
    let lChild = 2 * idx + 1;
    let rChild = 2 * idx + 2;
    // to keep the smaller
    let smallIdx;
    // sort (while some child is smaller than the parent)
    while (this.lessThan(lChild, idx) || this.lessThan(rChild, idx)) {
      if (this.lessThan(lChild, rChild)) {
        smallIdx = lChild;
      } else if (this.lessThan(rChild, lChild)) {
        smallIdx = rChild;
      } else {
        smallIdx = lChild;
      }
      // swap element from idx with greater
      [this.values[idx], this.values[smallIdx]] = [
        this.values[smallIdx],
        this.values[idx],
      ];
      // update idx and its children
      idx = smallIdx;
      lChild = 2 * idx + 1;
      rChild = 2 * idx + 2;
    }
    return { element: min, heap: this };
  }
}
