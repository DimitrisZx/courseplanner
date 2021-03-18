import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { selectLessons, selectUser } from 'features/store/stateSlice';
import LessonCard from '../LessonCard';
import useStyle from './styles';

import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'

const TopPart = () => {
  const [oldSemestersHidden, setOldSemestersHidden] = useState(false)
  const [currentSemesterHidden, setCurrentSemesterHidden] = useState(false)
  const lessons = useSelector(selectLessons);
  const { currentSemester } = useSelector(selectUser);
  
  const currentSemesterLessons = lessons.filter(lesson => lesson.semester === +currentSemester)
  const prevSemesterLessons = lessons.filter(lesson => lesson.semester !== +currentSemester)
  
  const noRegisteredLessons = lessons.length === 0;

  const classes = useStyle();

  return (
    <div
      className={'card shadow-sm'}
      style={{ width: '100%' }}
    >
      <div className={`card-body ${noRegisteredLessons ? 'no-lessons' : ''}`}>
        {noRegisteredLessons 
          ? 
            <>
              <h4><span role='img' aria-label='sad-emoji'>😢</span> Δεν βρέθηκαν επιλεγμένα μαθήματα</h4>
              <hr></hr>
              <p><span role='img' aria-label='lamp-emoji'>💡</span> Παρακαλώ επιλέξτε μαθήματα από την ενότητα "Επιλεγμένα Μαθήματα"</p>
            </>
          : 
            <>
              <div className={classes.lessonList} id={'current-semester'}>
                <h5>
                  <span className={classes.caret}onClick={() => setCurrentSemesterHidden(!currentSemesterHidden)}>
                    {currentSemesterHidden ? <AiFillCaretDown /> : <AiFillCaretRight />}
                  </span>
                  {' Μαθημάτα Τρέχοντος Εξαμήνου'}
                </h5>
                {currentSemesterHidden && <>
                  <h6>Θεωρίες:</h6> 
                  {currentSemesterLessons.filter(lesson => lesson.type === 'theory').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
                  <br />
                  <br />
                  <h6>Εργαστήρια:</h6> 
                  {currentSemesterLessons.filter(lesson => lesson.type === 'workshop').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
                </>}
              </div>
              <hr/>
              <div className={classes.lessonList} id={'prev-semesters'}>
                <h5>
                  <span className={classes.caret}onClick={() => setOldSemestersHidden(!oldSemestersHidden)}>
                    {oldSemestersHidden ? <AiFillCaretDown /> : <AiFillCaretRight />}
                  </span>
                  {' Μαθημάτα Προηγούμενων Εξαμήνων'}
                </h5>
          
                { oldSemestersHidden && <>
                  <h6>Θεωρίες:</h6>  
                    {prevSemesterLessons.filter(lesson => lesson.type === 'theory').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
                    <br />
                    <br />
                    <h6>Εργαστήρια:</h6>
                    {prevSemesterLessons.filter(lesson => lesson.type === 'workshop').map((lesson, index) => <LessonCard key={index} lesson={lesson} />)}
                </> }
              </div>
            </>}
      </div>
    </div>
  )
}

export default TopPart; 
