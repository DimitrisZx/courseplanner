import React from 'react';

import { useSelector } from 'react-redux';
import { selectSelectedLessons, selectUser, selectTableValues } from 'features/counter/counterSlice';
import { repeatX, addExtraZero, lessonDays, firstLessonHour } from 'utils';

const shouldAddComma = (index, array) => index !== array.length - 1 ? ', ' : '';
const lessonNamesReducer = (acc, cur, index, lessonsList) => `${acc}${cur}${shouldAddComma(index, lessonsList)}`

const DayRowComponent = ({ dayName, availableHours, lessonsInDay }) => {
  const { currentSemester } = useSelector(selectUser);
  const tableValues = useSelector(selectTableValues);
  const filledHours = lessonsInDay.map(lesson => lesson.hours);

  const defineCellProperties = (tableValues, dayName, cellTime) => {
    const currentDay = tableValues.find(day => day.name === dayName)
    const currentHour = currentDay.hours.find(hour => hour.hour === cellTime);
    const { writes, lessons } = currentHour;
    const cellProps = {
      cellColor: writes === 0 ? 'light' : writes > 1 ? 'danger' : 'success',
      lessons,
    }
    return cellProps;
  }

  return (
    <tr>
      <th scope='row'>{dayName}</th>
      {
        repeatX(availableHours).map((_, index) => {
          const cellTime = index + firstLessonHour;
          const { cellColor, lessons } = defineCellProperties(tableValues, dayName, cellTime);
          const lessonNames = lessons.reduce(lessonNamesReducer, ``)
          return <td className={`bg-${cellColor}`} key={index}>{lessonNames || '-'}</td>
        })
      }
    </tr>
  )





  return (
    <tr>
      <th scope="row">{dayName}</th>
      {
        repeatX(availableHours).map((_, index) => {
          const cellTime = index + 8
          let isCellFilled = false;
          let lessonName = '-';
          let lessonColor;
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

const BottomPartv2 = () => {
  const selectedLessons = useSelector(selectSelectedLessons);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{'#'}</th>
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

export { BottomPartv2 }
