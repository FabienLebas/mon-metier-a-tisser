import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      createNewUSer: false,
      loginErrorMessage: null,
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
    const baseUrlBack = process.env.REACT_APP_baseUrlBack;
    let createOrLogin = 'POST';
    if (this.state.createNewUSer){
      createOrLogin = 'PUT'
    }
    return fetch(`${baseUrlBack}/login`, {
      method: createOrLogin,
      headers:{"Content-Type": "application/json"},
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
          username: response,
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

  activateNewUserSection = () => {
    const newValue = !this.state.createNewUSer
    this.setState({
      createNewUSer: newValue
    })
  }

  displayNewUserSection = () => {
    if (this.state.createNewUSer){
      return(
        <div>
          <div className="col-ml-auto">
            <label className="form-label" htmlFor="password">Vérification du mot de passe :</label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input" placeholder="mot de passe" type="password" name="password" value={this.state.passwordCheck} onChange={this.checkPassword}/>
          </div>
        </div>
      )
    }
  }

  checkPassword = (event) => {
    this.setState({
      passwordCheck: event.target.value
    })
  }

  displayValidationButton = () => {
    if (!this.state.createNewUSer){
      return(
        <div className="form-group ">
          <button className="btn btn-primary col-mr-auto " onClick={this.handleSubmit} type="submit" data-dismiss="modal">Connecter</button>
          <p onClick={this.activateNewUserSection}>Nouvel utilisateur</p>
        </div>
      )
    } else {
      return(
        <div className="form-group ">
          <button disabled={this.state.password !== this.state.passwordCheck} className="btn btn-primary col-mr-auto " onClick={this.handleSubmit} type="submit" data-dismiss="modal">Nouvel utilisateur</button>
          <p onClick={this.activateNewUserSection}>Connecter un utilisateur existant</p>
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
              <label className="form-label" htmlFor="username">Email</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input" type="text" id="username" name="username" placeholder="votre email" value={this.state.username} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-ml-auto">
              <label className="form-label" htmlFor="password">Mot de passe :</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input" placeholder="mot de passe" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            {this.displayNewUserSection()}
          </div>
          {this.loginErrorMessage()}
          {this.displayValidationButton()}
        </form>
      </div>
    )
  }
}
