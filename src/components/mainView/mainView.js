import React, { useEffect } from 'react';
import useStyle from './styles';
import { TopPart, BottomPartv3 } from './components';
import {
  getLessonsAsync,
  updateSchedule,
  selectSelectedLessons,
  selectUser,
  clearLocalSchedule
} from 'features/store/stateSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainView = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const selectedlessons = useSelector(selectSelectedLessons);
  const user = useSelector(selectUser)
  useEffect(() => { dispatch(getLessonsAsync({uuid: user.uuid, semester: 'springSemester', schoolCode: user.schoolCode})) }, []);
  const isMobile = window.matchMedia('(max-width: 450px)').matches;
  const handleSaveSchedule = () => {
    const payload = {userId: user.registryNumber, selectedlessons}
    dispatch(updateSchedule(payload))
  }

  const handleClearSchedule = () => {
    dispatch(updateSchedule({userId: user.registryNumber, selectedlessons:[]}))
    dispatch(clearLocalSchedule())
  }

  return (
    <div className={classes.mainView}>
      {!isMobile && <TopPart />}
      <BottomPartv3 />
      {!isMobile &&
      <div className="buttons d-flex justify-content-end">
        <button className={'btn btn-primary shadow-sm'} onClick={handleSaveSchedule}>Αποθήκευση</button>
        <button className={'btn btn-danger ml-2 shadow-sm'} onClick={handleClearSchedule}>Καθαρισμός</button>
      </div>}
    </div>
  )
}

export default MainView