const not = bool => !bool;

function repeatX(times) {
  const timesArr = [];
  timesArr.length = times;
  timesArr.fill(0);
  return timesArr;
}

export { not, repeatX };