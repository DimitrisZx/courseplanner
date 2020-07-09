
import React from 'react';
import useStyle from './styles';



const MainView = props => {
  const classes = useStyle(); 
  return (
    <div className={classes.text}>
      {'Eyp'}
    </div>
  )
}

export default MainView
