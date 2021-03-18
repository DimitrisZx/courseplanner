import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { genDaysTable } from 'utils';
import axios from 'axios';
// const baseUrl = 'http://localhost:5000/';
const baseUrl = 'https://courseplannerlis.herokuapp.com/';
const headers = (method, data = {}) => ({
  method, // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://courseplannerlis.herokuapp.com/',
    // 'Access-Control-Allow-Origin': 'http://localhost:5000/',
    'Access-Control-Allow-Credentials': 'true'
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data),
});

export async function uploadFile(file) {
  const URL = baseUrl + 'uploadSchedule';
  const formData = new FormData();
  console.log(file)
  formData.append("myfile", file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  await axios.post(URL, formData, config)
} 

export const updateSchedule = createAsyncThunk(
  'app/updateSchedule',
  async (payload, thunkAPI) => {
    const URL = baseUrl + 'updateSchedule';
    // const { lessonSchedule } = payload;
    console.log(payload)
    const {userId, selectedLessons} = payload;
    const response = await fetch(URL, headers('POST',  payload));
    const parsed = await response.json();
    return parsed;
  }
)

export const getLessonsAsync = createAsyncThunk(
  'app/fetchLessons',
  async (payload, thunkAPI) => {
    // const URL = baseUrl + 'lessons?uuid="' + payload.uuid;
    const URL = `${baseUrl}lessons?uuid=${payload.uuid}&schoolCode=${payload.schoolCode}&semester=${payload.semester}`;
    const response = await fetch(URL);
    const parsed = await response.json();
    return parsed;
  }
)

export const updateRegisteredLessonsAsync = createAsyncThunk(
  'app/updateRegisteredLessons',
  async (payload, thunkAPI) => {
    const URL = baseUrl + 'updateRegisteredLessons';
    const response = await fetch(URL, headers('POST', payload));
    const parsed = await response.json()
    console.log(parsed);
    return parsed;
  }
)

export const requestSignUp = createAsyncThunk(
  'app/requestSignUp',
  async (payload, thunkAPI) => {
    const { email, password, name, registryNumber, semester, history, schoolCode } = payload;
    const URL = baseUrl + 'requestSignUp';
    const response = await fetch(URL, headers('POST', {email, password, name, registryNumber, semester, schoolCode}));
    const parsed = await response.json();
    if (parsed.success) {
      history.push('/my-schedule')
    } else {
      console.log(parsed.errorMsg)
    }
    console.log(parsed)
    return parsed;
  }
)

export const getSchoolNames = createAsyncThunk(
  'app/getAvailableSchools',
  async (payload, thunkAPI) => {
    const URL = baseUrl + 'getAvailableSchools';
    const response = await fetch(URL, headers('POST', {}));
    const parsed = await response.json();
    return parsed;
  }
)

export const requestLogin = createAsyncThunk(
  'app/requestLogin',
  async (payload, thunkAPI) => {
    const { email, password, history } = payload;
    const URL = baseUrl + 'requestLogin';
    const response = await fetch(URL, headers('POST',  {email, password}));
    const parsed = await response.json();
    if (parsed.success) {
      history.push('/my-schedule')
    } else {
      console.log(parsed.errorMsg)
    }
    return parsed
  }
)

export const getSavedSelectedLessons = createAsyncThunk(
  'app/getSavedSelectedLessons',
  async (payload, thunkAPI) => {
    const { rn } = payload;
    const URL = baseUrl + 'getSavedSelectedLessons';
    const response = await fetch(URL, {...headers('POST', {rn})})
  }
);
export const requestProfileEdit = createAsyncThunk(
  'app/requestProfileEdit',
  async (payload, thunkAPI) => {
    const {name, rn, semester, localId} = payload;
    console.log(localId)
    const URL = baseUrl + 'requestProfileEdit';
    const response = await fetch(URL, {...headers('POST', {name, rn, semester, localId})})
    const parsed = await response.json();
    if (parsed.success) {
      // history.push('/my-schedule')
    } else {
      console.log(parsed.errorMsg)
    }
    return parsed
  }
);

// export const updateLessonsAsync = createAsyncThunk(
//   'app/updateLessonsAsync',
//   async (_, thunkAPI) => {
//     const URL = baseUrl + 'updateSelectedLessons';
//     const response = await fetch(URL, { ...headers('POST', { msg: 'yo' }) });
//   }
// )

export const stateSlice = createSlice({
  name: 'state',

  initialState: {
    loggedIn: false,
    user: {
      localId: '',
      currentSemester: '',
      name: ' ',
      registryNumber: '',
      sessionExpiresIn: 0,
      email: '',
      isAdmin: false
    },
    registeredLessons: [],
    selectedLessons: [],
    tableValues: genDaysTable(5, 13),
    asyncLessons: [],
    lessonNames: [],
    filesToUpload: [],
    availableSchoolNames: [],
    errors: [],
  },
  reducers: {
    updateRegisteredLessons: (state, payload) => {
      state.registeredLessons = payload.payload;
    },
    addLesson: (state, lesson) => {
      state.selectedLessons.push(lesson.payload);
    },
    addFileToUpload: (state, payload) => {
      state.filesToUpload.push(payload.payload)
    },
    removeLesson: (state, lesson) => {
      state.selectedLessons = state.selectedLessons.filter(item => item.name !== lesson.payload.name)
    },
    editSchedule: (state, payload) => {
      state.tableValues = payload.payload.newTableValues;
    },
    loginSuccess: (state, payload) => {
      console.log(payload)
      state.sessionExpiresIn = payload.sessionExpiresIn;
      state.email = payload.email;
    },
    logout: state => {
      state.loggedIn = false
      state.user = {
        localId: '',
        currentSemester: '',
        name: ' ',
        registryNumber: '',
        sessionExpiresIn: 0,
        email: '',
        isAdmin: false,
        schoolCode: '',
      }
      state.registeredLessons = []
      state.selectedLessons = []
      state.tableValues = genDaysTable(5, 13)
      state.asyncLessons = []
      state.lessonNames = []
      state.filesToUpload = []
      state.availableSchoolNames = []
      state.errors = []
    },
    clearLocalSchedule: state => {
      state.selectedLessons = []
    },
    clearErrors: state => {
      state.errors = []
    },
  },
  extraReducers: {
    [getLessonsAsync.fulfilled]: (state, { payload }) => {
      state.asyncLessons = [...payload.lessons]
      state.lessonNames = payload.lessonNames;
    },
    [requestLogin.fulfilled]: (state, { payload }) => {

      const { email, expiresIn, localId, userType } = payload.payload;
      state.loggedIn = true;
      state.user.email = email;
      state.user.sessionExpiresIn = expiresIn;
      state.user.localId = localId;
      state.user.name = payload.payload.name;
      state.user.currentSemester = payload.payload.semester;
      state.user.registryNumber = payload.payload.registryNumber;
      state.user.uuid = payload.payload.uuid;
      state.selectedLessons = [...payload.payload.selectedLessons];
      state.registeredLessons = [...payload.payload.registeredLessons];
      state.user.isAdmin = userType === 'admin';
      state.user.schoolCode = payload.payload.schoolCode
    },
    [requestSignUp.fulfilled]: (state, { payload }) => {
      console.log(payload)
      if (payload?.payload?.errorMsg) { 
        state.errors.push(payload?.payload?.errorMsg)
        return;
      }
      state.user.localId = payload.payload.localId;
      state.loggedIn = true;
      state.user.email = payload.payload.email;
      state.user.name = payload.payload.name;
      state.user.currentSemester = payload.payload.semester;
      state.user.registryNumber = payload.payload.registryNumber;
      state.user.uuid = payload.payload.uuid;
      state.user.schoolCode = payload.payload.schoolCode;
    },
    [getSavedSelectedLessons]: (state, { payload }) => {
      state.selectedLessons = payload.payload.selectedLessons;
    },
    [updateRegisteredLessonsAsync.fulfilled]: (state, {payload}) => {
      state.registeredLessons = [...payload.payload];
    },
    [getSchoolNames.fulfilled]: (state, {payload}) => {
      state.availableSchoolNames = [...payload];
    }
  }
});

export const {
  addLesson,
  removeLesson,
  editSchedule,
  loginSuccess,
  logout,
  clearLocalSchedule,
  updateRegisteredLessons,
  addFileToUpload,
  clearErrors
} = stateSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    // dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectUser = state => state.state.user;
export const selectLessons = state => state.state.asyncLessons;
export const selectTableValues = state => state.state.tableValues;
export const selectSelectedLessons = state => state.state.selectedLessons;
export const selectRegisteredLessons = state => state.state.registeredLessons;
export const selectIsLoggedIn = state => state.state.loggedIn;
export const selectIsAdmin = state => state.state.user.isAdmin;
export const selectLocalId = state => state.state.user.localId;
export const selectLessonNames = state => state.state.lessonNames;
export const selectFilesToUpload = state => state.state.filesToUpload;
export const selectAvailableSchoolNames = state => state.state.availableSchoolNames;
export const selectSchoolCode = state => state.state.user.schoolCode;
export const selectErrors = state => state.state.errors;
export default stateSlice.reducer;
