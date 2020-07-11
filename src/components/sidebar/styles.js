import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  sidebar: {
    background: '#fff',
    width: '200px',
    height: 'auto',
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default useStyle;