import { range as _range } from 'lodash';

const lessonDays = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'];
const firstLessonHour = 8;

const not = bool => !bool;
function repeatX(times) {
  const timesArr = [];
  timesArr.length = times;
  timesArr.fill(0);
  return timesArr;
}

const validators = {
  name: (n) => {
    const regex = /^\p{Lu}\p{Ll}+( \p{Lu}\p{Ll}+)*$/;
    console.log(regex.test(n))
    console.log(n)
  },
  rn: () => {},
  semester: () => {},
  email: () => {},
  password: () => {},
}

// add extra zero to beginning of time string e.g. 8:00 => 08:00
const addExtraZero = num => num < 10 ? '0' : '';

const day = (name, range) => {
  const hours = hourRange => _range(hourRange[0], hourRange[1]).map(num => ({ hour: num, writes: 0, lessons: [] }))
  return { name, hours: hours(range) };
}

// Generates the time-table model | Used in redux-store 
const genDaysTable = () => lessonDays.map(lday => day(lday, [8, 22]));

export {
  not,
  repeatX,
  addExtraZero,
  genDaysTable,
  lessonDays,
  firstLessonHour,
  validators,
};