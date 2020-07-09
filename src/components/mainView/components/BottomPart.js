import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedLessons, selectUser } from 'features/counter/counterSlice';
import { isEmpty } from 'lodash'
const lessonDays = [
  'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'
];
const addExtraZero = num => num < 10 ? '0' : '';

const DayRowComponent = ({ dayName, availableHours, lessonsInDay }) => {
  const user = useSelector(selectUser);
  const availableHoursGen = [];
  availableHoursGen.length = availableHours;
  availableHoursGen.fill(0);
  const filledHours = lessonsInDay.map(lesson => lesson.hours);
  return (
    <tr>
      <th scope="row">{dayName}</th>
      {
        availableHoursGen.map((_, index) => {
          const cellTime = index + 8
          let isCellFilled = false;
          let lessonName = '-';
          filledHours.forEach(hourTuple => {
            if (cellTime >= hourTuple[0] && cellTime <= hourTuple[1]) {
              lessonName = cellTime === hourTuple[0] && lessonsInDay.find(lesson => lesson.hours[0] === hourTuple[0] && lesson.hours[1] === hourTuple[1]).name
              isCellFilled = true;
            }
          })
          return <td className={`bg-${isCellFilled ? 'success' : 'light'}`} key={index}>{lessonName}</td>
        })
      }
    </tr>
  )
}

const genHours = (times) => {
  const timesToDo = [];
  timesToDo.length = times;
  timesToDo.fill(0)
  const arrayToReturn = timesToDo.map((_, index) =>
    <th key={index} scope={'col'}>{`${addExtraZero((index + 8))}${index + 8}:00`}</th>)
  return arrayToReturn;
}

const BottomPart = () => {
  const selectedLessons = useSelector(selectSelectedLessons);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{'Ημέρα'}</th>
          {genHours(14)}
        </tr>
      </thead>
      <tbody>
        {
          lessonDays.map((day, index) => {
            const lessonsInDay = selectedLessons.filter(lesson => lesson.day === day)
            return <DayRowComponent
              key={index}
              dayName={day}
              lessonsInDay={lessonsInDay}
              availableHours={14}
            />
          }
          )
        }
      </tbody>
    </table>
  )
}

export { BottomPart }
