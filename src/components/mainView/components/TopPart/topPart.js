import React from 'react';
import { useSelector } from 'react-redux';
import { selectLessons, selectUser } from 'features/counter/counterSlice';
import LessonCard from '../LessonCard';
import useStyle from './styles';

const TopPart = () => {
  const lessons = useSelector(selectLessons);
  const { currentSemester } = useSelector(selectUser);
  const currentSemesterLessons = lessons.filter(lesson => lesson.semester === currentSemester)
  const prevSemesterLessons = lessons.filter(lesson => lesson.semester !== currentSemester)
  const classes = useStyle();

  return (
    <div
      className={'card'}
      style={{ width: '100%' }}
    >
      <div className={'card-body'}>
        <div className={classes.lessonList} id={'current-semester'}>
          <h5>{'Μαθημάτα Τρέχοντος Εξαμήνου'}</h5>
          Θεωρίες: {currentSemesterLessons.filter(lesson => lesson.type === 'theory').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
          <br />
          Εργαστήρια: {currentSemesterLessons.filter(lesson => lesson.type === 'workshop').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
        </div>
        <br />
        <div className={classes.lessonList} id={'prev-semesters'}>
          <h5>{'Μαθημάτα Προηγούμενων Εξαμήνων'}</h5>
          Θεωρίες: {prevSemesterLessons.filter(lesson => lesson.type === 'theory').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
          <br />
          Εργαστήρια: {prevSemesterLessons.filter(lesson => lesson.type === 'workshop').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
        </div>
      </div>
    </div>
  )
}

export default TopPart; 
