import Heap from "../../structures/heap";

const A = { key: "a", val: 3 };
const B = { key: "b", val: 7 };
const C = { key: "c", val: 12 };

test("Heap: Testing enqueue and dequeue", () => {
  const heap = new Heap();
  heap.enqueue(A.key, A.val);
  heap.enqueue(B.key, B.val);
  heap.enqueue(C.key, C.val);
  expect(heap.size).toBe(3);
  const first = heap.dequeue()!;
  expect(first.key).toBe(A.key);
  expect(first.val).toBe(A.val);
  const second = heap.dequeue()!;
  expect(second.val).toBe(B.val);
  expect(second.key).toBe(B.key);
  const third = heap.dequeue()!;
  expect(third.val).toBe(C.val);
  expect(third.key).toBe(C.key);
});

test("Heap: testing decrease key", () => {
  const heap = new Heap();
  const newCVal = -5;
  heap.enqueue(A.key, A.val);
  heap.enqueue(B.key, B.val);
  heap.enqueue(C.key, C.val);
  expect(heap.size).toBe(3);
  heap.decreaseKey(C.key, newCVal);
  const first = heap.dequeue()!;
  expect(first.key).toBe(C.key);
  expect(first.val).toBe(newCVal);
  const second = heap.dequeue()!;
  expect(second.val).toBe(A.val);
  expect(second.key).toBe(A.key);
  const third = heap.dequeue()!;
  expect(third.val).toBe(B.val);
  expect(third.key).toBe(B.key);
});
