import React from 'react'
import { addLesson, removeLesson, selectSelectedLessons, selectUser } from 'features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { not } from 'utils'
const LessonCard = ({ lesson }) => {
  const { name, semester } = lesson;
  const dispatch = useDispatch();
  const selectedLessons = useSelector(selectSelectedLessons);
  const { currentSemester } = useSelector(selectUser);
  const isSelected = selectedLessons.some(lesson => lesson.name === name);

  const handleClick = lessonName => {
    const isLessonSelected = selectedLessons.some(lesson => lesson.name === lessonName);
    not(isLessonSelected) || selectedLessons.length === 0
      ? dispatch(addLesson({ ...lesson }))
      : dispatch(removeLesson({ ...lesson }));
  };

  const buttonClasses = (isSelected, semester) => {
    return `btn btn${not(isSelected) ? '-outline' : ''}-${semester === currentSemester ? 'success' : 'secondary'} mr-2`
  }

  return (
    <div
      className={buttonClasses(isSelected, semester)}
      onClick={() => handleClick(name)}
    >
      {name}
    </div>
  )
}

export default LessonCard
