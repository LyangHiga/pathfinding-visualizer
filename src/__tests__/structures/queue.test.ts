import Queue from "../../structures/queue";

const FIRST = 1;
const SECOND = "2";
const THIRD = false;

// just to make a habit
test("testing enQueues and deQueues", () => {
  const queue = new Queue();
  queue.enQueue(FIRST);
  expect(queue.size).toEqual(1);
  queue.enQueue(SECOND);
  expect(queue.size).toEqual(2);
  queue.enQueue(THIRD);
  expect(queue.size).toEqual(3);

  const firstDequeue = queue.deQueue();
  expect(firstDequeue?.key).toEqual(FIRST);
  expect(queue.size).toEqual(2);
  const secondDequeue = queue.deQueue();
  expect(secondDequeue?.key).toEqual(SECOND);
  expect(queue.size).toEqual(1);
  const thirdDequeue = queue.deQueue();
  expect(thirdDequeue?.key).toEqual(THIRD);
  expect(queue.size).toEqual(0);
});
