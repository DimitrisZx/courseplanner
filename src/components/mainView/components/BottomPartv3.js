import React from 'react';
import useStyle from './styles';
import { useSelector } from 'react-redux';
import { selectSelectedLessons, selectTableValues } from 'features/store/stateSlice';
import { repeatX, addExtraZero, lessonDays, firstLessonHour } from 'utils';
import { groupBy, range } from 'lodash';

const shouldAddComma = (index, array) => index !== array.length - 1 ? ', ' : '';
const lessonNamesReducer = (acc, cur, index, lessonsList) => `${acc}${cur}${shouldAddComma(index, lessonsList)}`

function translateDataTableToUITable(dataTable) {
  let uiTable = [];
  
  return uiTable;
}

class Hour {
  hourValue;
  hourColor = 'white';
  lessonsInHour = [];
  constructor(hourValue) { this.hourValue = hourValue+''}
}

const DayRowComponent = ({ dayName, availableHours }) => {
  const tableValues = useSelector(selectTableValues);
  const classes = useStyle();
  const selectedLessons = useSelector(selectSelectedLessons);
  const lessonsOfThisDay = groupBy(selectedLessons, 'day')[dayName];
  // console.clear()
  console.log(lessonsOfThisDay)
  let dayHours = repeatX(availableHours).map((_, index) => new Hour(index + firstLessonHour)); 
  if(lessonsOfThisDay) {
    const hours = repeatX(availableHours).map((_, index) => new Hour(index + firstLessonHour))
    hours.forEach(hour => {
      lessonsOfThisDay.forEach(lesson => {
        if (range(lesson.hours[0], lesson.hours[1]).includes(+hour.hourValue)){
          hour.lessonsInHour.push(lesson.name)
        }
      })
    })
    const conflictingLessonsList = findConflictingLessons(hours)
    dayHours = markDuplicates(conflictingLessonsList, hours)


  }
  console.log(dayHours)
  function defineCellProperties(tableValues, dayName, cellTime) {
    const currentDay = tableValues.find(day => day.name === dayName)
    const currentHour = currentDay.hours.find(hour => hour.hour === cellTime);
    const { writes, lessons } = currentHour;

    return {
      cellColor: writes === 0 ? 'light' : writes > 1 ? 'danger' : 'success',
      lessons,
    };
  }

  return (
    <tr>
      <th scope='row'>{dayName}</th>
      {
        dayHours.map((dayHour, idx) => {
          const lessonNames = dayHour.lessonsInHour.reduce(lessonNamesReducer, ``);
          return <td className={`bg-${dayHour.hourColor || 'light'} border`} key={idx}>
            {lessonNames || '-'}
          </td>
        })
      }
      {/* {
        repeatX(availableHours).map((_, index) => {
          const cellTime = index + firstLessonHour;
          const { cellColor, lessons } = defineCellProperties(tableValues, dayName, cellTime);
          const lessonNames = lessons.reduce(lessonNamesReducer, ``);
          const isTheory = lessonNames => selectedLessons.find(lesson => lesson.name === lessonNames[0]);
          const { type } = isTheory(lessons) || '';
          const className = `bg-${cellColor} ${type === 'theory' && classes.theoryColor} border`;

          return (
            <td 
              className={className} 
              key={index}
            >
              {lessonNames || '-'}
            </td>
          )
        })
      } */}
    </tr >
  );
}

const genHours = times => {
  const arrayToReturn = repeatX(times).map((_, index) =>
    <th key={index} scope={'col'}>{`${addExtraZero((index + 8))}${index + 8}:00`}</th>)
  return arrayToReturn;
}

export function BottomPartv3() {
  const selectedLessons = useSelector(selectSelectedLessons);
  
  const uiTable = translateDataTableToUITable(selectedLessons)

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


const colors = {green:'success', yellow:'warning', red:'danger', white:'light'};

function findConflictingLessons(hours) {
  const conflictingLessonsList = [];
  hours.forEach(hour => {
    if (hour.lessonsInHour.length > 1) {
      conflictingLessonsList.push(...hour.lessonsInHour.filter(lesson => !conflictingLessonsList.includes(lesson)))
    }
  })
  return conflictingLessonsList;
}



function markDuplicates(conflictingLessonsList, dayHours) {
  const { green, yellow, red, white } = colors;
  dayHours.forEach(hour => {
    hour.hourColor = hour.lessonsInHour.length === 0 ? white : green;
    conflictingLessonsList.forEach(conflictinglesson => {
      if(hour.lessonsInHour.includes(conflictinglesson)) {
        if (hour.lessonsInHour.length <= 1) {
          hour.hourColor = yellow;
        } else if (hour.lessonsInHour.length > 1) {
          hour.hourColor = red;
        } 
      } 
    })
  })
  return dayHours

}

// const conflictingLessonsList = findConflictingLessons(day.hours)
// const dayHours = markDuplicates(conflictingLessonsList, day.hours)

// console.log(dayHours)