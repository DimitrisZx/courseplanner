import React from 'react';
import useStyle from './styles';
import { TopPart, BottomPartv2 } from './components';

const MainView = () => {
  const classes = useStyle();
  return (
    <div className={classes.mainView}>
      <TopPart />
      <BottomPartv2 />
    </div>
  )
}

export default MainView