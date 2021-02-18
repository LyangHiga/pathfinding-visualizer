class Node<T> {
  public key: T;
  public val: number;
  constructor(key: T, val: number) {
    this.key = key;
    this.val = val;
  }
}

class Heap<T> {
  public values: Node<T>[];
  // maps Node key (T) to index of node array (Heap)
  public idxs: Map<T, number>;
  public size: number;
  constructor() {
    this.values = [];
    // dict: key to array idx => you say the key it returns the idx
    this.idxs = new Map();
    this.size = 0;
  }

  // Returns true if this heap constains this key
  // Otherwise returns false
  contains = (key: T) => {
    if (this.idxs.get(key) === undefined) return false;
    return true;
  };

  // Returns true if this heap is empty
  // Otherwise returns false
  isEmpty = () => {
    return this.size === 0;
  };

  // Returns true if the element from index i is smaller than k idx element
  // otherwise returns false
  lessThan = (i: number, k: number) => {
    // out of bounds
    if (i < 0 || k < 0) return false;
    if (i > this.size - 1 || k > this.size - 1) return false;
    if (this.values[i].val < this.values[k].val) return true;
    return false;
  };

  // Returns the parent's index of the ith node
  myParentIdx = (i: number) => {
    return Math.floor((i - 1) / 2);
  };

  // Returns the children's index of the ith node
  myChildrenIdx = (i: number) => {
    // left 2 * i + 1 , right 2 * idx + 2
    return [2 * i + 1, 2 * i + 2];
  };

  // swap idxs elements in map key to idx
  swapIdxs = (a: T, b: T) => {
    const temp = this.idxs.get(a)!;
    this.idxs.set(a, this.idxs.get(b)!);
    this.idxs.set(b, temp);
  };

  // Rearrange values and map
  bubbleUp = (i: number, j: number) => {
    //swap i and j
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];

    // swap idxs elements in map key to idx
    const a = this.values[i].key;
    const b = this.values[j].key;
    this.swapIdxs(a, b);
  };

  // Returns the smmaller child idx
  // Rearrange values and map
  bubbleDown = (idx: number, l: number, r: number) => {
    // to keep track of the smallest child
    let smallIdx;
    if (this.lessThan(l, r)) {
      smallIdx = l;
    } else if (this.lessThan(r, l)) {
      smallIdx = r;
      // if they have the same val we take the left child as the smallest
    } else {
      smallIdx = l;
    }
    // swap element from idx with greater
    [this.values[idx], this.values[smallIdx]] = [
      this.values[smallIdx],
      this.values[idx],
    ];

    // swap idxs elements in map key to idx
    const a = this.values[idx].key;
    const b = this.values[smallIdx].key;
    this.swapIdxs(a, b);
    return smallIdx;
  };

  // Inserts a node (key,val) in the last position and rearrange
  // Returns the node inserted
  // Returns false whether this key is already in this heap
  enqueue = (key: T, val: number) => {
    // to avoid duplicate keys
    if (this.contains(key)) return false;
    let node = new Node(key, val);
    this.values.push(node);
    this.size++;
    // last position to insert this new node
    let idx = this.size - 1;
    // add the idx of this key on the map
    this.idxs.set(key, idx);
    let parentIdx = this.myParentIdx(idx);
    // bubble-up (while this new node is smaller than its parent)
    while (this.lessThan(idx, parentIdx)) {
      this.bubbleUp(idx, parentIdx);
      //   recalculate node idx, parent idx position
      idx = parentIdx;
      parentIdx = this.myParentIdx(idx);
    }
    return node;
  };

  // Update the val of this key
  // Returns true if works
  // Returns false if there is not any node with this key in this heap
  // Returns undefined if newVal is equal to the actual val of key
  // Returns -1 if newVal is greater than the actual val of key
  decreaseKey = (key: T, newVal: number) => {
    // check whether this key belongs to this heap
    if (!this.contains(key)) return false;
    let idx = this.idxs.get(key)!;
    // to ensure newVal < val
    if (newVal > this.values[idx].val) return -1;
    // if they are the same just return
    if (newVal === this.values[idx].val) return;
    //   update node with new val
    this.values[idx].val = newVal;
    let parentIdx = this.myParentIdx(idx);
    // bubble-up (while this new node is smaller than its parent)
    while (this.lessThan(idx, parentIdx)) {
      this.bubbleUp(idx, parentIdx);
      //   recalculate node idx, parent idx position
      idx = parentIdx;
      parentIdx = this.myParentIdx(idx);
    }
    return true;
  };

  // Removes the root (min),
  // Returns the root
  // Returns null if this heap is empty
  dequeue = () => {
    if (this.isEmpty()) return null;
    if (this.size === 1) {
      this.size--;
      return this.values.pop()!;
    }
    const min = this.values[0];
    // replace the root with the last element
    this.values[0] = this.values.pop()!;
    this.size--;
    // delete from map
    this.idxs.delete(min.key);
    // update idx of the 'new root' in the map
    this.idxs.set(this.values[0].key, 0);
    // index of this node we have to rearrange and the idx of its children
    let idx = 0;
    let [lChild, rChild] = this.myChildrenIdx(idx);
    // bubble-down (while any child is smaller than the parent)
    while (this.lessThan(lChild, idx) || this.lessThan(rChild, idx)) {
      // update idx and its children
      idx = this.bubbleDown(idx, lChild, rChild);
      [lChild, rChild] = this.myChildrenIdx(idx);
    }
    return min;
  };
}

export default Heap;
