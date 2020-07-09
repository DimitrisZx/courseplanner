import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectLessons } from '../../../features/counter/counterSlice';
import LessonCard from './LessonCard'
const TopPart = () => {
  const lessons = useSelector(selectLessons);
  return (
    <div
      className={'card'}
      style={{ width: '100%' }}
    >
      <div className={'card-body'}>
        <h5 className="card-title">{'Λίστα Μαθημάτων Εξαμήνου'}</h5>
        {lessons.map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
      </div>
    </div>
  )
}

export { TopPart }
