function robot_walk(steps) {
  let position = 0;
  for (let i = 0; i < steps; i++) {
    position += Math.random() < 0.5 ? -1 : 1;
  }
  return position;
}