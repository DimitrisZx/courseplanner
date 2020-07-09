import React from 'react';
import useStyle from './styles';
import { TopPart, BottomPart } from './components';
const MainView = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.mainView}>
      <TopPart />
      <BottomPart />
    </div>
  )
}

export default MainView