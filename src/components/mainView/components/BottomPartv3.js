import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedLessons } from 'features/store/stateSlice';
import { repeatX, addExtraZero, lessonDays, firstLessonHour } from 'utils';
import { groupBy, range } from 'lodash';

const shouldAddComma = (index, array) => index !== array.length - 1 ? ', ' : '';
const lessonNamesReducer = (acc, cur, index, lessonsList) => `${acc}${cur}${shouldAddComma(index, lessonsList)}`


class Hour {
  hourValue;
  hourColor = 'white';
  lessonsInHour = [];
  constructor(hourValue) { this.hourValue = hourValue+''}
}

const DayRowComponent = ({ dayName, availableHours }) => {
  const selectedLessons = useSelector(selectSelectedLessons);
  const lessonsOfThisDay = groupBy(selectedLessons, 'day')[dayName];

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

  return (
    <tr className="bg-white">
      <th scope='row'>{dayName}</th>
      {
        dayHours.map((dayHour, idx) => {
          const lessonNames = dayHour.lessonsInHour.reduce(lessonNamesReducer, ``);
          return <td className={`bg-${dayHour.hourColor || 'd5y'} border text-light `} key={idx}>
            {lessonNames}
          </td>
        })
      }
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

  return (
    <table className="table mt-3 border shadow-sm">
      <thead className="border bg-white rounded">
        <tr className="">
          <th scope="col">{''}</th>
          {genHours(14)}
        </tr>
      </thead>
      <tbody className="">
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
  const { green, yellow, red, white } = {green:'success', yellow:'warning', red:'danger', white:'light'};
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
  return dayHours;
}