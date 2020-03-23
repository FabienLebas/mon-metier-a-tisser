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
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === '200') {
        this.props.updateUser({
          loggedIn: true,
          username: response.username,
          displayName: response.displayName
        })
        this.setState({
          redirectTo: '/'
        })
      }
    })
    .catch(error => {
      console.warn(`login error : ${error}`);
      this.setState({
        loginErrorMessage: true
      })

    })
  }

  errorMessage = () => {
    if (this.state.loginErrorMessage){
      return(
        <div className="alert alert-danger col-3 col-ml-auto" role="alert">
          Utilisateur / Mot de passe incorrect
        </div>
      )
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <h4>Connexion</h4>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-3 col-ml-auto">
                <label className="form-label" htmlFor="username">Nom d'utilisateur</label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-3 col-ml-auto">
                <label className="form-label" htmlFor="password">Mot de passe :</label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input" placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
              </div>
            </div>
            {this.errorMessage()}
            <div className="form-group ">
              <button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit} type="submit">Valider</button>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default LoginForm
