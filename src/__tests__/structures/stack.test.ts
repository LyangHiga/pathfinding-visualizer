import Stack from "../../structures/stack";

const FIRST = 1;
const SECOND = 2;
const THIRD = 3;

// just to make a habit
test("testing pushing and poping", () => {
  const queue = new Stack<number>();
  queue.push(FIRST);
  expect(queue.size).toEqual(1);
  queue.push(SECOND);
  expect(queue.size).toEqual(2);
  queue.push(THIRD);
  expect(queue.size).toEqual(3);

  const firstPop = queue.pop();
  expect(firstPop?.key).toEqual(THIRD);
  expect(queue.size).toEqual(2);
  const secondPop = queue.pop();
  expect(secondPop?.key).toEqual(SECOND);
  expect(queue.size).toEqual(1);
  const thirdPop = queue.pop();
  expect(thirdPop?.key).toEqual(FIRST);
  expect(queue.size).toEqual(0);
});
