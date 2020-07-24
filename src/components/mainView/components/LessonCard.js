import React from 'react';
import {
  addLesson, removeLesson, selectSelectedLessons, selectUser, selectTableValues, editSchedule, getLessonsAsync
} from 'features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { not } from 'utils';
import { range, cloneDeep, isEmpty, indexOf } from 'lodash';


const LessonCard = ({ lesson }) => {
  const { name, semester, type } = lesson;
  const dispatch = useDispatch();
  const selectedLessons = useSelector(selectSelectedLessons);
  const { currentSemester } = useSelector(selectUser);
  const tableValues = useSelector(selectTableValues)
  const isSelected = selectedLessons.some(lesson => lesson.name === name);


  const handleClick = lesson => {
    const { hours: lessonHours, day: lessonDay, name: lName, type } = lesson;
    const localTableValues = cloneDeep(tableValues);
    const { hours: hoursRangeToModify } = localTableValues.find(day => day.name === lessonDay)

    const hourValuesToUpdate = range(lessonHours[0], lessonHours[1]);
    hourValuesToUpdate.forEach(lessonHour => {
      const hourToUpdate = hoursRangeToModify.find(({ hour }) => hour === lessonHour);
      if (isSelected) {
        if (type === 'workshop') {
          const hoursThatHadThisWorkshop = localTableValues.map(day => day.hours.filter(hour => hour.lessons.includes(lName))).flat();
          console.log(hoursThatHadThisWorkshop)
          hoursThatHadThisWorkshop.forEach(hour => {
            hour.writes -= 1;
            const lessonIndex = hour.lessons.indexOf(lName);
            hour.lessons.splice(lessonIndex, 1)
          })

        } else if (type === 'theory') {
          hourToUpdate.writes -= 1;
          const lessonIndex = hourToUpdate.lessons.indexOf(lName);
          hourToUpdate.lessons.splice(lessonIndex, 1)
        }
      } else { // not selected
        if (type === 'workshop') {
          hourToUpdate.writes += 1;
          hourToUpdate.lessons.push(lName);
        } else if (type === 'theory') {
          hourToUpdate.writes += 1;
          hourToUpdate.lessons.push(lName);
        }
      }
    })

    const tableValuesPayload = { newTableValues: localTableValues }
    console.log(lesson)

    not(isSelected) || isEmpty(selectedLessons)
      ? dispatch(addLesson({ ...lesson }))
      : dispatch(removeLesson({ ...lesson }));

    dispatch(editSchedule(tableValuesPayload))
  };

  const buttonClasses = (isSelected, lessonSemester, lessonType) => {
    const selected = not(isSelected) ? '-outline' : ''
    const semesterColor = lessonSemester === currentSemester ? 'success' : 'secondary';
    return `btn btn${selected}-${semesterColor} mr-2`;
  }

  const constructObjectToSubmit = (lesson, hourSet, type, day) => ({
    name: lesson.name,
    semester: lesson.semester,
    hours: hourSet,
    type: type,
    day: day.day
  });

  return (
    <span className='btn-container' style={{ position: 'relative' }}>
      {type === 'workshop'
        ? lesson.days.map(day =>
          day.hours.map(hourSet =>
            <button
              onClick={() => handleClick(constructObjectToSubmit(lesson, hourSet, 'workshop', day))}
              className={buttonClasses(isSelected, semester, type)}>
              {name} | {day.day.slice(0, 3)} {`${day.hours[0][0]}:00-${day.hours[0][1]}:00`}
            </button>
          )
        )
        :
        <button
          className={buttonClasses(isSelected, semester, type)}
          onClick={() => handleClick(lesson)}
          id={`lesson-${name}-${type}`}
          type={'button'}
        >{name}</button>
      }
    </span>
  )
}

export default LessonCard


/* 
  red - direct conflict, (writes > 1)
  orange - one of its hours has conflict, (writes === 1 && writes === 2 στα γειτονικά) 
  green - no conflict (writes === 1)

  theory = light green
  workshop = green

  borders σε κάθε μάθημα
  εργαστήρια σε ξεχωριστά κουμπιά

  mock http request to get store data
*/