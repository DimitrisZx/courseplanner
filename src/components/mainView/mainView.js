import React, { useEffect } from 'react';
import useStyle from './styles';
import { TopPart, BottomPartv2 } from './components';
import {
  getLessonsAsync,
  updateLessonsAsync,
} from 'features/counter/counterSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const MainView = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => { dispatch(getLessonsAsync()) });

  const handleSaveSchedule = () => {
    dispatch(updateLessonsAsync())
    history.push('/auth')
  }

  return (
    <div className={classes.mainView}>
      <TopPart />
      <BottomPartv2 />
      <button className={'btn btn-success'} onClick={handleSaveSchedule}>Save Schedule</button>
    </div>
  )
}

export default MainView