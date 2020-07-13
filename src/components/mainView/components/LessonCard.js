import React, { useState } from 'react'
import {
  addLesson, removeLesson, selectSelectedLessons, selectUser, selectTableValues, editSchedule
} from 'features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { not } from 'utils';
import { range, cloneDeep, isEmpty, indexOf } from 'lodash';

const LessonCard = ({ lesson }) => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const { name, semester, type } = lesson;
  const dispatch = useDispatch();
  const selectedLessons = useSelector(selectSelectedLessons);
  const { currentSemester } = useSelector(selectUser);
  const tableValues = useSelector(selectTableValues)
  const isSelected = selectedLessons.some(lesson => lesson.name === name);

  const handleClick = lesson => {
    const { hours: lessonHours, day: lessonDay, name: lName } = lesson;
    const localTableValues = cloneDeep(tableValues);
    const { hours: hoursRangeToModify } = localTableValues.find(day => day.name === lessonDay)

    if (lesson.type === 'workshop') {
      setIsDropdownExpanded(!isDropdownExpanded)
      return;
    }

    const hourValuesToUpdate = range(lessonHours[0], lessonHours[1]);
    hourValuesToUpdate.forEach(lessonHour => {
      const hourToUpdate = hoursRangeToModify.find(({ hour }) => hour === lessonHour);

      if (!isSelected) {
        hourToUpdate.writes += 1;
        hourToUpdate.lessons.push(lName);
      } else {
        hourToUpdate.writes -= 1;
        const lessonIndex = hourToUpdate.lessons.indexOf(lName);
        hourToUpdate.lessons.splice(lessonIndex, 1)
      }
    })
    const tableValuesPayload = { newTableValues: localTableValues }

    not(isSelected) || isEmpty(selectedLessons)
      ? dispatch(addLesson({ ...lesson }))
      : dispatch(removeLesson({ ...lesson }));

    dispatch(editSchedule(tableValuesPayload))

  };
  const handleWorkShopClick = (lesson, hourSet, day) => {
    const lessonObjectToSubmit = {
      name: lesson.name,
      semester: lesson.semester,
      hours: hourSet,
      type: 'workshop',
      day: day
    };

    const isLessonSelected = selectedLessons.some(sellesson => sellesson.name === lesson.name);
    isLessonSelected && dispatch(removeLesson({ ...lessonObjectToSubmit }));
    dispatch(addLesson({ ...lessonObjectToSubmit }));
    setIsDropdownExpanded(!isDropdownExpanded)
  }

  const buttonClasses = (isSelected, lessonSemester, lessonType) => {
    const selected = not(isSelected) ? '-outline' : ''
    const semesterColor = lessonSemester === currentSemester ? 'success' : 'secondary';
    const dropdownIfWorkshop = lessonType === 'workshop' && 'dropdown-toggle';
    return `btn btn${selected}-${semesterColor} mr-2 ${dropdownIfWorkshop}`;
  }

  return (
    <span className='btn-container' style={{ position: 'relative' }}>
      <button
        className={buttonClasses(isSelected, semester, type)}
        onClick={lesson.type === 'theory' ? () => handleClick(lesson) : () => setIsDropdownExpanded(!isDropdownExpanded)}
        id={`lesson-${name}-${type}`}
        type={'button'}
      >
        {name}
      </button>
      {type === 'workshop' && isDropdownExpanded &&
        <div
          style={{ display: 'block', top: '35px', cursor: 'pointer' }}
          className={'dropdown-menu'}
          onPointerLeave={() => setIsDropdownExpanded(!isDropdownExpanded)}
        >
          {lesson.days.map(
            day => {
              const dayName = day.day;
              return day.hours.map((hourSet, index) =>
                <div
                  key={index}
                  className={'dropdown-item'}
                  onClick={() => handleWorkShopClick(lesson, hourSet, day.day)}
                >
                  {`${dayName} ${hourSet[0]}:00-${hourSet[1]}:00`}
                </div>
              )
            }
          )
          }
        </div>
      }
    </span>
  )
}

export default LessonCard
