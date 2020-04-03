const sleep = m => new Promise(r => setTimeout(r, m));

export async function pathAnimation(path) {
  let vertex;
  for (let i = 0; i < path.length; i++) {
    vertex = document.getElementById(`node-${path[i]}`).style;
    await sleep(1);
    vertex.backgroundColor = 'yellow';
  }
}
