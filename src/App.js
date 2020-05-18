import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Canvas from './components/Canvas';
import LoginForm from './components/LoginForm';
import Library from './components/Library';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: null,
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
    this.setState(userObject)
  }

  logOut = () => {
    this.setState({
      username: null,
      displayName: null
    })
  }

  loadLibrary = () => {
    if (this.state.username){
      return(
        <Library
          user={this.state.username}
          displayName={this.state.displayName}
        />
      )
    }
  }

  render(){
    return (
      <Router>
        <h2 className="text-center">Oh happy perles !</h2>
        <Route exact path="/" render={(routerProps) =>
          <div>
            {this.loadLibrary()}
            <Canvas
              matrix={this.state.defaultMatrix}
              user={this.state.username}
              displayName={this.state.displayName}
              logOut={this.logOut}
              updateUser={this.updateUser}
              loginError={this.state.loginError}
            />
          </div>
        }/>
        <Route exact path="/login" render={(routerProps) => <LoginForm updateUser={this.updateUser}/>}/>
      </Router>
    );
  }

}
