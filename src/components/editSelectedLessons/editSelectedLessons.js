import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLessonNames,
  updateRegisteredLessonsAsync,
  selectUser,
  selectRegisteredLessons,
} from 'features/store/stateSlice';

export default function EditSelectedLessons() {
  const lessonsNames = useSelector(selectLessonNames).slice().sort();
  const registeredLessons = useSelector(selectRegisteredLessons);
  const [usersLessons, setUsersLessons] = useState(registeredLessons);
  const userUuid = useSelector(selectUser).uuid;
  const dispatch = useDispatch();

  function updateUsersLessons(lessonName) {
    if(usersLessons.includes(lessonName)) {
      setUsersLessons([...usersLessons.filter(item => item !== lessonName)])
    } else {
      setUsersLessons([...usersLessons, lessonName])
    }
  }
  function handleSelectAll() {
    setUsersLessons([...lessonsNames]);
  }
  function handleUnselectAll() {
    setUsersLessons([]);
  }
  function handleClick() {
    dispatch(updateRegisteredLessonsAsync({uuid: userUuid, registeredLessons: usersLessons}));
  }

  return (
    <div className='container '>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 bg-white pd-5">
          <form>
            <h3>{"Διαθέσιμα Μαθήματα"}</h3>
            <hr/>
            {lessonsNames.map((lessonName, index) => {
              const isChecked = usersLessons.includes(lessonName);
              return (<div key={index} className="d-flex flex-column justify-content-center">
                <div className="row d-flex cursor-pointer align-items-center">
                  <input 
                    type="checkbox" 
                    value={lessonName}
                    checked={isChecked} 
                    onChange={() => updateUsersLessons(lessonName)}
                    className="mr-1"
                  />
                  <div>{lessonName}</div>
                </div>
              </div>)
            })}
          </form>
          <hr/>
          <div className="justify-content-center">
            <button
              className="btn btn-primary mr-1"
              onClick={handleClick}
            >{"Υποβολή"}</button>
            <button
              className="btn btn-success"
              onClick={handleSelectAll}
            >{"Επιλογή Όλων"}
            </button>
            <button
              className="btn btn-warning"
              onClick={handleUnselectAll}
            >{"Αποεπιλογή Όλων"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
