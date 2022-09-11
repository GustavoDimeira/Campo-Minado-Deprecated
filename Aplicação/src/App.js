import React from 'react';
import './css/App.css';
import CampoMinado from './games/CampoMinado';

function App() {
  return (
    <div className="App">
      <CampoMinado size={ 4 } bombsAmount={ 15 }/>
    </div>
  );
}

export default App;
