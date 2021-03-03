import React from 'react';
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
import {AdminPanel} from './components/adminPanel';
import EditSelectedLessons from './components/editSelectedLessons';
import PrivateRoute from './privateRoute'

// App Entry Point
function App() {
  return (
    <Router>
      <div className="App bg-light container-fluid p-0" style={{ display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{display: 'flex', height: '100%'}}>
          <Route exact path="/">
            {/* <Redirect to="auth" /> */}
            <LoginForm />
          </Route>
          {/* <Route exact path='/auth'>
            <LoginForm />
          </Route> */}
          <Route exact path='/edit-profile'>
            <EditProfileForm />
          </Route>
          <PrivateRoute exact path='/edit-selected-lessons'>
            <EditSelectedLessons />
          </PrivateRoute>
          <PrivateRoute exact path='/admin-panel'>
            <AdminPanel />
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
