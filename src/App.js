import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import MainView from './components/mainView';
import Sidebar from './components/sidebar';
import './App.css';
import LoginForm from './components/loginForm'
import {
  getLessonsAsync,
} from 'features/counter/counterSlice';
import { useDispatch } from 'react-redux';

// App Entry Point
function App() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getLessonsAsync()) });
  return (
    <div className="App container-fluid p-0" style={{ display: 'flex' }}>
      <Router>
        <Route exact path='/auth'>
          <LoginForm />
        </Route>
        <Route exact path='/my-schedule'>
          <Sidebar />
          <MainView name={[1, 2, 3]} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
