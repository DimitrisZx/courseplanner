import { createSlice } from '@reduxjs/toolkit';

export const stateSlice = createSlice({
  name: 'state',

  initialState: {
    user: {
      currentSemester: '5',
      name: 'Dimitris Zarachanis',
      AM: '14024',
    },
    selectedLessons: [],
    lessonsList:
      [
        { name: 'Προτυπα', day: 'Δευτέρα', hours: [8, 11], semester: '3' },
        { name: 'Βιβλιοθήκες', day: 'Δευτέρα', hours: [14, 16], semester: '3' },
        { name: 'Κώδικες', day: 'Πέμπτη', hours: [15, 17], semester: '5' },
      ]
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    addLesson: (state, lesson) => {
      state.selectedLessons.push(lesson.payload)
    },
    removeLesson: (state, lesson) => {
      state.selectedLessons = state.selectedLessons.filter(item => item.name !== lesson.payload.name)
    }
  },
});

export const { increment, addLesson, removeLesson } = stateSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    // dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.state.user;
export const selectLessons = state => state.state.lessonsList;
export const selectSelectedLessons = state => state.state.selectedLessons;
export default stateSlice.reducer;
