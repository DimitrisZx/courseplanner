import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  lessonList: {
    // '&:first-child': {
    //   marginRight: '20px',
    //   paddingRight: '20px',
    //   borderRight: '1px solid grey',
    // }
  },
  caret: {
    cursor: 'pointer'
  }
});

export default useStyle;