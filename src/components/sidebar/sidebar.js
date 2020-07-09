import React from 'react';
import useStyle from './styles';

type Props = {
  name: string,
}

const Sidebar = (props: Props) => {
  const classes = useStyle();
  return (
    <div className={classes.sidebar}>
      <div>asas</div>
    </div>
  )
}

export default Sidebar
