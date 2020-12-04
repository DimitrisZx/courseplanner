import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import MainView from './components/mainView';
import Sidebar from './components/sidebar';
import './App.css';
import LoginForm from './components/loginForm';
import TopBar from './components/topBar'
import EditProfileForm from './components/editProfileForm';
import EditSelectedLessons from './components/editSelectedLessons';
import {
  getLessonsAsync,
} from 'features/store/stateSlice';
import { useDispatch } from 'react-redux';
import PrivateRoute from './privateRoute'

// App Entry Point
function App() {
  return (
    <Router>
      <div className="App container-fluid p-0" style={{ display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{display: 'flex'}}>
          <Route exact path="/">
            <Redirect to="auth" />
          </Route>
          <Route exact path='/auth'>
            <LoginForm />
          </Route>
          <Route exact path='/edit-profile'>
            <EditProfileForm />
          </Route>
          <PrivateRoute exact path='/edit-selected-lessons'>
            <EditSelectedLessons />
          </PrivateRoute>
          <PrivateRoute exact path='/my-schedule'>
            <Sidebar />
            <MainView />
          </PrivateRoute>
        </div>
      </div>
    </Router>
  );
}

export default App;
