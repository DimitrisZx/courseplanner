import React from 'react';

import { useSelector } from 'react-redux';
import { selectSelectedLessons, selectUser } from 'features/counter/counterSlice';
import { repeatX } from 'utils';
const lessonDays = [
  'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'
];
const addExtraZero = num => num < 10 ? '0' : '';

const DayRowComponent = ({ dayName, availableHours, lessonsInDay }) => {
  const { currentSemester } = useSelector(selectUser);
  const filledHours = lessonsInDay.map(lesson => lesson.hours);
  return (
    <tr>
      <th scope="row">{dayName}</th>
      {
        repeatX(availableHours).map((_, index) => {
          const cellTime = index + 8
          let isCellFilled = false;
          let lessonName = '-';
          let lessonColor = '-';
          filledHours.forEach(hourTuple => {
            if (cellTime >= hourTuple[0] && cellTime <= hourTuple[1]) {
              const currentLesson = lessonsInDay.find(lesson => lesson.hours[0] === hourTuple[0] && lesson.hours[1] === hourTuple[1]);
              lessonName = cellTime === hourTuple[0] && currentLesson.name
              isCellFilled = true;
              lessonColor = currentLesson.semester === currentSemester ? 'success' : 'secondary';
            }
          })
          return <td className={`bg-${isCellFilled ? lessonColor : 'light'}`} key={index}>{lessonName}</td>
        })
      }
    </tr>
  )
}

const genHours = (times) => {
  const arrayToReturn = repeatX(times).map((_, index) =>
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
