import { range as _range } from 'lodash';

const not = bool => !bool;

function repeatX(times) {
  const timesArr = [];
  timesArr.length = times;
  timesArr.fill(0);
  return timesArr;
}

const addExtraZero = num => num < 10 ? '0' : '';

const day = (name, range) => {
  const hours = range => _range(range[0], range[1]).map(num => ({ hour: num, writes: 0, lessons: [] }))
  return { name, hours: hours(range) };
}

const lessonDays = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'];
const genDaysTable = () => {
  return lessonDays.map(lday => day(lday, [8, 21]));
}

export { not, repeatX, addExtraZero, genDaysTable, lessonDays };