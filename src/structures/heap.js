class Node {
  constructor(val, key) {
    this.val = val;
    this.key = key;
  }
}

class Heap {
  constructor() {
    this.values = [];
    // dict: val to array idx => you say the val it returns the idx
    this.idxs = {};
  }

  // return true if the element from index i is smaller than k idx element
  lessThan(i, k) {
    // out of bounds
    if (i < 0 || k < 0) return false;
    if (i > this.values.length - 1 || k > this.values.length - 1) return false;
    let key = this.values[i].key;
    let parent = this.values[k].key;
    if (key < parent) return true;
    return false;
  }

  //   return the parent's index of the ith node
  myParentIdx(i) {
    return Math.floor((i - 1) / 2);
  }

  //   return the children's index of the ith node
  myChildrenIdx(i) {
    // left 2 * i + 1 , right 2 * idx + 2
    return [2 * i + 1, 2 * i + 2];
  }

  // insert an element in the next free spot and then sort the Heap if it's needed
  //   return Heap sorted
  enqueue(val, key) {
    let node = new Node(val, key);
    this.values.push(node);
    // last position to insert this new node
    let idx = this.values.length - 1;
    // add the idx of this val on the dict
    this.idxs[val] = idx;
    let parentIdx = this.myParentIdx(idx);
    // sort (while this new node is smaller than its parent)
    while (this.lessThan(idx, parentIdx)) {
      //swap
      [this.values[idx], this.values[parentIdx]] = [
        this.values[parentIdx],
        this.values[idx],
      ];

      // swap idxs elements in dict val to idx
      [
        this.idxs[this.values[idx].val],
        this.idxs[this.values[parentIdx].val],
      ] = [
        this.idxs[this.values[parentIdx].val],
        this.idxs[this.values[idx].val],
      ];
      //   recalculate node idx, parent idx position
      idx = parentIdx;
      parentIdx = this.myParentIdx(idx);
    }
    return this;
  }

  //   update key of this node and return this heap sorted
  //   if there is not any node with this val in this heap return false
  decreaseKey(val, newKey) {
    // check whether this val belongs to this heap
    if (this.values[this.idxs[val]] === undefined) return false;
    //   get idx of this val
    let idx = this.idxs[val];
    //   update node with new key
    this.values[idx].key = newKey;
    let parentIdx = this.myParentIdx(idx);
    if (parentIdx < 0) return this;
    while (this.lessThan(idx, parentIdx)) {
      //swap
      [this.values[idx], this.values[parentIdx]] = [
        this.values[parentIdx],
        this.values[idx],
      ];

      // swap idxs elements in dict val to idx
      [
        this.idxs[this.values[idx].val],
        this.idxs[this.values[parentIdx].val],
      ] = [
        this.idxs[this.values[parentIdx].val],
        this.idxs[this.values[idx].val],
      ];
      //   recalculate node idx, parent idx position
      idx = parentIdx;
      parentIdx = this.myParentIdx(idx);
    }
    return this;
  }

  // Remove the root (min),
  //   put the last element in the top and then rearrange
  // return the root and the new arrangement
  dequeue() {
    // if is empty return undefined
    if (this.values.length === 0) return undefined;
    if (this.values.length === 1)
      return { element: this.values.pop(), heap: this };
    const min = this.values[0];
    // replace the root with the last element
    this.values[0] = this.values.pop();
    // delete from dict
    delete this.idxs[min.val];
    // update idx of the 'new root' in the dict
    this.idxs[this.values[0].val] = 0;
    // index of this node we have to sort and the idx of its children
    let idx = 0;
    let [lChild, rChild] = this.myChildrenIdx(idx);
    // to keep the smaller
    let smallIdx;
    // sort (while any child is smaller than the parent)
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

      // swap idxs elements in dict val to idx
      [
        this.idxs[this.values[idx].val],
        this.idxs[this.values[smallIdx].val],
      ] = [
        this.idxs[this.values[smallIdx].val],
        this.idxs[this.values[idx].val],
      ];

      // update idx and its children
      idx = smallIdx;
      [lChild, rChild] = this.myChildrenIdx(idx);
    }
    return { element: min, heap: this };
  }
}

export default Heap;
