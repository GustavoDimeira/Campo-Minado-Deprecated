import React from 'react';
import './css/App.css';
import CampoMinado from './games/CampoMinado';

function App() {
  return (
    <div className="App">
      <CampoMinado size={ 8 } bombsAmount={ 12 }/>
    </div>
  );
}

export default App;
