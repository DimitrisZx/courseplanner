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
    const isLessonSelected = selectedLessons.some(lesson => lesson.name === lessonName);
    not(isLessonSelected) || selectedLessons.length === 0
      ? dispatch(addLesson({ ...lesson }))
      : dispatch(removeLesson({ ...lesson }));
    if (lesson.type === 'workshop') {
      setIsDropdownExpanded(!isDropdownExpanded)
    }
  };
  const workShopClick = () => {

  }

  const buttonClasses = (isSelected, semester, type) => {
    return `btn btn${not(isSelected) ? '-outline' : ''}-${semester === currentSemester ? 'success' : 'secondary'} mr-2 ${type === 'workshop' && 'dropdown-toggle'}`
  }
  console.log(lesson)
  return (
    <span className='btn-container' style={{ position: 'relative' }}>
      <button
        className={buttonClasses(isSelected, semester, type)}
        onClick={() => handleClick(name)}
        id={`lesson-${name}-${type}`}
        type={'button'}
      >
        {name}
      </button>
      {type === 'workshop' && isDropdownExpanded &&
        <div
          style={{ display: 'block', top: '35px' }}
          className="dropdown-menu"
        >
          {lesson.days.map(day =>
            <a
              className="dropdown-item" href="#"
            >
              {`${day.day} ${day.hours[0][0]}:00-${day.hours[0][1]}:00`}
            </a>)}
        </div>
      }
    </span>
  )
}

export default LessonCard
