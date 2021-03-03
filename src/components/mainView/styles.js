import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  mainView: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // background: '#fff',
    margin: '0 auto',
    marginTop: '25px'
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