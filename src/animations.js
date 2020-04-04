const sleep = (m) => new Promise((r) => setTimeout(r, m));

export async function pathAnimation(path) {
  let vertex;
  for (let i = 0; i < path.length; i++) {
    vertex = document.getElementById(`node-${path[i]}`).style;
    await sleep(1);
    vertex.backgroundColor = 'yellow';
  }
}

export async function visitedAnimation(v, end) {
  if (v === end.val) return;
  const vertex = document.getElementById(`node-${v}`).style;
  await sleep(10);
  vertex.backgroundColor = 'blue';
}
