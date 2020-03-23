import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      loginErrorMessage: null
    }
  }

  handleChange = (event) => {
    this.props.updateUser({
      loginError: false
    })
    this.setState({
      [event.target.name]: event.target.value,
      loginErrorMessage: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    return fetch("http://localhost:4000/login", {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === '200') {
        this.props.updateUser({
          loggedIn: true,
          username: response.username,
          displayName: response.displayName,
          loginError: false
        })
        this.setState({
          redirectTo: '/'
        })
      }
    })
    .catch(error => {
      console.warn(`login error : ${error}`);
      this.props.updateUser({
        loginError: true
      })
      this.setState({
        loginErrorMessage: true
      })

    })
  }

  loginErrorMessage = () => {
    if (this.state.loginErrorMessage){
      return(
        <div className="alert alert-danger col-ml-auto" role="alert">
          Utilisateur / Mot de passe incorrect
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-ml-auto">
              <label className="form-label" htmlFor="username">Nom d'utilisateur :</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-ml-auto">
              <label className="form-label" htmlFor="password">Mot de passe :</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input" placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
          </div>
          {this.loginErrorMessage()}
          <div className="form-group ">
            <button className="btn btn-primary col-mr-auto " onClick={this.handleSubmit} type="submit" data-dismiss="modal">Valider</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
