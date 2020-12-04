import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  mainView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
  },
  viewPart: {
    width: '100%',
    height: '50%',
  },
  buttons: {
    display: 'flex',
  }
});

export default useStyle;