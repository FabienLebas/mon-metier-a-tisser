import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './components/Canvas';

function App() {
  const defaultMatrix = [
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"],
    ["default", "default", "default", "default", "default", "default", "default", "default", "default"]
  ];
  return (
    <div className="Mon métier à tisser">
      <Canvas matrix={defaultMatrix}></Canvas>
    </div>
  );
}

export default App;
