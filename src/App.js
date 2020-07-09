import React from 'react';
import MainView from './components/mainView';
import Sidebar from './components/sidebar';
import './App.css';

function App() {
  return (
    <div className="App container-fluid p-0" style={{ display: 'flex' }}>
      <Sidebar />
      <MainView name={[1, 2, 3]} />
    </div>
  );
}

export default App;
