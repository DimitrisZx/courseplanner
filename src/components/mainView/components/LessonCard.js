import React, { useState } from 'react'
import { addLesson, removeLesson, selectSelectedLessons, selectUser } from 'features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { not } from 'utils'
const LessonCard = ({ lesson }) => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const { name, semester, type } = lesson;
  const dispatch = useDispatch();
  const selectedLessons = useSelector(selectSelectedLessons);
  const { currentSemester } = useSelector(selectUser);
  const isSelected = selectedLessons.some(lesson => lesson.name === name);

  const handleClick = lessonName => {
    if (lesson.type === 'workshop') {
      setIsDropdownExpanded(!isDropdownExpanded)
      return;
    }
    const isLessonSelected = selectedLessons.some(lesson => lesson.name === lessonName);
    not(isLessonSelected) || selectedLessons.length === 0
      ? dispatch(addLesson({ ...lesson }))
      : dispatch(removeLesson({ ...lesson }));

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

  const buttonClasses = (isSelected, semester, type) => {
    return `btn btn${not(isSelected) ? '-outline' : ''}-${semester === currentSemester ? 'success' : 'secondary'} mr-2 ${type === 'workshop' && 'dropdown-toggle'}`
  }
  return (
    <span className='btn-container' style={{ position: 'relative' }}>
      <button
        className={buttonClasses(isSelected, semester, type)}
        onClick={lesson.type === 'theory' ? () => handleClick(name) : () => setIsDropdownExpanded(!isDropdownExpanded)}
        id={`lesson-${name}-${type}`}
        type={'button'}
      >
        {name}
      </button>
      {type === 'workshop' && isDropdownExpanded &&
        <div
          style={{ display: 'block', top: '35px', cursor: 'pointer' }}
          className="dropdown-menu"
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
