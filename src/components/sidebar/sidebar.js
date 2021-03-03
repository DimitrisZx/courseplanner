import React from 'react';
import useStyle from './styles';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/store/stateSlice';

const Sidebar = () => {
  const classes = useStyle();
  const { name, currentSemester, email, registryNumber } = useSelector(selectUser)
  return (
    <div className={`${classes.sidebar} card border rounded-0`}>
      <div className={`${classes.sidebarContent} card-body`}>
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle">{registryNumber}</h6>
        <hr />
        <div className="card-text">{'Εξάμηνο: ' + currentSemester+'o'}</div>
        <h6 className="card-subtitle">{email}</h6>
      </div>
    </div>
  )
}

export default Sidebar
