import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Canvas from './components/Canvas';
import Login from './components/Login';
import LoginForm from './components/LoginForm';

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
      <Login></Login>
      <LoginForm></LoginForm>
      <Canvas matrix={defaultMatrix}></Canvas>
    </div>
  );
}

export default App;
