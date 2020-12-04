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
import { useHistory } from 'react-router-dom';
const MainView = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedlessons = useSelector(selectSelectedLessons);
  const user = useSelector(selectUser)
  useEffect(() => { dispatch(getLessonsAsync()) },[]);

  const handleSaveSchedule = () => {
    const payload = {userId: user.registryNumber, selectedlessons}
    dispatch(updateSchedule(payload))
    history.push('/auth')
  }

  const handleClearSchedule = () => {
    dispatch(updateSchedule({userId: user.registryNumber, selectedlessons:[]}))
    dispatch(clearLocalSchedule())
  }

  return (
    <div className={classes.mainView}>
      <TopPart />
      <BottomPartv3 />
      <div className="buttons">
        <button className={'btn btn-success'} onClick={handleSaveSchedule}>Save Schedule</button>
        <button className={'btn btn-danger'} onClick={handleClearSchedule}>Clear Schedule</button>
      </div>
    </div>
  )
}

export default MainView