import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Canvas from './components/Canvas';
// import Login from './components/Login';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      displayName: null,
      loginError: false,
      defaultMatrix: [
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
      ]
    }
  }

  updateUser = (userObject) => {
    console.log(`je lance updateUser ${userObject}`);
    console.log(userObject.username);
    console.log(userObject.displayName);
    this.setState(userObject)
  }

  logOut = () => {
    this.setState({
      username: null,
      displayName: null
    })
  }

  render(){
    return (
      <Router>
        <Route exact path="/" render={(routerProps) =>
          <Canvas
            matrix={this.state.defaultMatrix}
            user={this.state.username}
            displayName={this.state.displayName}
            logOut={this.logOut}
            updateUser={this.updateUser}
            loginError={this.state.loginError}
            />}/>
          <Route exact path="/login" render={(routerProps) => <LoginForm updateUser={this.updateUser}></LoginForm>}/>
      </Router>
    );
  }

}
