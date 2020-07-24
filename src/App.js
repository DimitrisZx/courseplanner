import React, { useEffect } from 'react';
import MainView from './components/mainView';
import Sidebar from './components/sidebar';
import './App.css';
import {
  getLessonsAsync
} from 'features/counter/counterSlice';
import { useDispatch } from 'react-redux';

// App Entry Point
function App() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getLessonsAsync()) });
  return (
    <div className="App container-fluid p-0" style={{ display: 'flex' }}>
      <Sidebar />
      <MainView name={[1, 2, 3]} />
    </div>
  );
}

export default App;
