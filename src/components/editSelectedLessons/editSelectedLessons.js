import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  selectLessonNames,
  updateRegisteredLessonsAsync,
  selectUser,
  selectRegisteredLessons,
  updateSchedule,
  clearLocalSchedule
} from 'features/store/stateSlice';

export default function EditSelectedLessons() {
  const lessonsNames = useSelector(selectLessonNames).slice().sort();
  const registeredLessons = useSelector(selectRegisteredLessons);
  const [usersLessons, setUsersLessons] = useState(registeredLessons);
  const userUuid = useSelector(selectUser).uuid;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser)
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
    handleClearSchedule();
    history.push('/my-schedule')
  }
  const handleClearSchedule = () => {
    dispatch(updateSchedule({userId: user.registryNumber, selectedlessons:[]}))
    dispatch(clearLocalSchedule())
  }

  return (
    <div className='container '>
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 mt-3 bg-white">
          <form className="p-4">
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
          <div className="justify-content-center">
            <button
              className="btn btn-primary mr-3"
              onClick={handleClick}
            >{"Υποβολή"}</button>
            <button
              className="btn btn-success mr-3"
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
