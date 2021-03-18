import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  sidebar: {
    width: '200px',
    height: '100%',
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default useStyle;