import React from 'react';
import useStyle from './styles';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/counter/counterSlice';

const photolink = 'https://scontent.fath6-1.fna.fbcdn.net/v/t1.0-9/s960x960/40008512_2076065719073341_4810461597422059520_o.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=93Ckz8Of8poAX9gSN56&_nc_ht=scontent.fath6-1.fna&_nc_tp=7&oh=3b03f78d9c8882c5c293ea4c0b453aa6&oe=5F309F44'

const Sidebar = (props) => {
  const classes = useStyle();
  const { name, currentSemester } = useSelector(selectUser)
  return (
    <div className={`${classes.sidebar} card`}>
      <div className={`${classes.sidebarContent} card-body`}>
        <img src={photolink} alt="" width='100' height='100' className={'bg-secondary rounded-circle'} />
        <h5 className="card-title">{name}</h5>
        <div className="card-text">{'Εξάμηνο: '}{currentSemester}</div>
        <h6 className="card-subtitle">{'Ρυθμίσεις'}</h6>
        <h6 className="card-subtitle">{'Αποσύνδεση'}</h6>
      </div>
    </div>
  )
}

export default Sidebar
