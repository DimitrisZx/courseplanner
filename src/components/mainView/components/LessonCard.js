import React from 'react'
import { addLesson, removeLesson, selectSelectedLessons } from '../../../features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { not } from 'utils'
const LessonCard = ({ name, semester }) => {
  const dispatch = useDispatch()
  const selectedLessons = useSelector(selectSelectedLessons);

  const isSelected = selectedLessons.some(lesson => lesson.name === name)

  const handleClick = lessonName => {
    const isLessonSelected = selectedLessons.some(lesson => lesson.name === lessonName)
    not(isLessonSelected) || selectedLessons.length === 0
      ? dispatch(addLesson({ name: lessonName }))
      : dispatch(removeLesson({ name: lessonName }))
  };

  const buttonType = (isSelected, semester = 'current') => {
    return `btn btn${not(isSelected) ? '-outline' : ''}-${semester === 'current' ? 'success' : 'secondary'} mr-2`
  }

  return (
    <div
      className={buttonType(isSelected)}
      onClick={() => handleClick(name)}
    >
      {name}
    </div>
  )
}

export default LessonCard
