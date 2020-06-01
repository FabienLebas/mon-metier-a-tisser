import React, { Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { SwatchesPicker } from 'react-color';
import { Redirect } from 'react-router-dom'
import LoginForm from "./LoginForm.js";
import "../stylesheets/canvas.css";

export default class Canvas extends Component {
  constructor(props){
    super(props);
    this.state={
      matrix:this.props.matrix,
      defaultColor: "grey",
      nextColor: "gold",
      topEmptySpots: [1, 2, 3, 4, 5, 6],
      history: [],
      loginErrorMessage: false,
      canvasName: ''
    }
  }

  addColumn = (side) => {
    this.state.topEmptySpots.push(this.state.topEmptySpots.length + 1);
    let newMatrix = this.state.matrix;
    if (side === "left"){
      newMatrix = newMatrix.map(line => [this.state.defaultColor].concat(line))
    } else if (side === "right") {
      newMatrix = newMatrix.map(line => line.concat([this.state.defaultColor]))
    }
    this.setState({
      matrix: newMatrix
    })
  }

  removeColumn = (side) => {
    this.state.topEmptySpots.pop();
    let newMatrix = this.state.matrix;
    if (side === "left"){
      newMatrix = newMatrix.map(line => {
        line.shift();
        return line;
      })
    } else if (side === "right") {
      newMatrix = newMatrix.map(line => {
        line.pop();
        return line;
      } )
    }
    this.setState({
      matrix: newMatrix
    })
  }

  addLine = (side) => {
    let newMatrix = this.state.matrix;
    let newLine = [];
    for (let i = 0; i < this.state.matrix[0].length; i++){
      newLine.push(this.state.defaultColor);
    }
    if (side === "top"){
      newMatrix.unshift(newLine);
    } else if (side === "bottom") {
      newMatrix.push(newLine);
    }
    this.setState({
      matrix: newMatrix
    })
  }

  removeLine = (side) => {
    let newMatrix = this.state.matrix;
    if (side === "top"){
      newMatrix.shift();
    } else if (side === "bottom") {
      newMatrix.pop();
    }
    this.setState({
      matrix: newMatrix
    })
  }

  handleChangeDefaultColor = (event) => {
    this.setState({
      defaultColor: event.target.value
    })
  }

  handleChangeNextColor = (event) => {
    this.setState({
      nextColor: event.target.value
    })
  }

  handleChangeCanvasName = (event) => {
    this.setState({
      canvasName: event.target.value
    })
  }

  drawLineMatrix = (line, indexLine) => {
    switch(indexLine){
      case 0:
        return (
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <div className="perle-canvas" onClick={(event) => this.addLine("top")}><i className="fas perle-canvas fa-arrow-circle-up clickable"></i></div>
          </Row>
        )
      case 1:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <div className="perle-canvas" onClick={(event) => this.removeLine("top")}><i className="fas perle-canvas fa-arrow-circle-down clickable"></i></div>
          </Row>
        )
      case this.state.matrix.length - 2:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <div className="perle-canvas" onClick={(event) => this.removeLine("bottom")}><i className="fas perle-canvas fa-arrow-circle-up clickable"></i></div>
          </Row>
        )
      case this.state.matrix.length -1:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <div className="perle-canvas" onClick={(event) => this.addLine("bottom")}><i className="fas perle-canvas fa-arrow-circle-down clickable"></i></div>
          </Row>
        )
      default:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
          </Row>
        )
    }
  }

  drawPerle = (perleColor, indexColumn, indexLine) => {
    let myColor = this.state.defaultColor;
    if (perleColor !== "default") {
      myColor = perleColor;
    }
    return(
      <div key={indexColumn} style={{background: myColor}} className="perle-canvas" onClick={(event) => this.changePerleColor(indexColumn, indexLine, this.state.nextColor, true)}></div>
    )
  }

  changePerleColor = (indexColumn, indexLine, newColor, saveInHistory) => {
    if (saveInHistory){
      this.state.history.push({
        indexColumn: indexColumn,
        indexLine: indexLine,
        oldColor: this.state.matrix[indexLine][indexColumn]
      })
    }

    const newMatrix = this.state.matrix;
    newMatrix[indexLine][indexColumn] = newColor;
    this.setState({
      matrix: newMatrix
    })
  }

  undo = () => {
    const lastAction = this.state.history[this.state.history.length - 1];
    this.changePerleColor(lastAction.indexColumn, lastAction.indexLine, lastAction.oldColor, false);
    this.state.history.pop();
  }

  handleChangeCompleteNextColor = (color, event) => {
    this.setState({ nextColor: color.hex });
  };

  handleChangeCompleteDefaultColor = (color, event) => {
    this.setState({ defaultColor: color.hex });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }


  displayModal = (modalName, functionWhenSelected, textTitle) => {
    const label = modalName + "Label";
    return(
      <div className="modal fade" id={modalName} tabIndex="-1" role="dialog" aria-labelledby={label} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={label}>{textTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SwatchesPicker onChangeComplete={ functionWhenSelected }/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  saveModal = () => {
    if (this.props.user === null){
      return(
        <div className="modal fade" id="saveModal" tabIndex="-1" role="dialog" aria-labelledby="labelSave" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Connexion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Pour sauvegarder, j'ai besoin d'un compte utilisateur</p>
                <LoginForm updateUser={this.props.updateUser} loginErrorMessage={this.loginErrorMessage}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="modal fade" id="saveModal" tabIndex="-1" role="dialog" aria-labelledby="labelSave" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sauvegarde</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Utilisateur : {this.props.user.username}</p>
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="col-ml-auto">
                      <label className="form-label" htmlFor="canvasName">Nom du bracelet :</label>
                    </div>
                    <div className="col-3 col-mr-auto">
                      <input className="form-input" type="text" id="canvasName" name="canvasName" placeholder="nom de la création" value={this.state.canvasName} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="form-group ">
                    <button className="btn btn-primary col-mr-auto " onClick={this.saveCanvas} type="submit" data-dismiss="modal">Sauvegarder</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  saveCanvas = () => {
    const baseUrlBack = process.env.REACT_APP_baseUrlBack;
    return fetch(`${baseUrlBack}/canvas`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.user.username,
        details: JSON.stringify(this.state.matrix),
        canvasName: this.state.canvasName,
        defaultColor: this.state.defaultColor
      })
    })
  }

  emptySpot = (key) => {
    return(
      <div key={key} className="perle-canvas"></div>
    )
  }

  save = () => {
    console.log("save");
    return(
      <Redirect to={{ pathname: "/login" }} />
    )
  }

  displayUser = () => {
    if (this.props.user){
      return (
        <div className="row">
          <p>{this.props.user.username}</p>
          <i className="fas fa-power-off clickable" aria-hidden="true" onClick={this.props.logOut}></i>
        </div>
      )
    }
  }

  loginErrorMessage = () => {
    if (this.props.loginError){
      return(
        <div className="alert alert-danger col-ml-auto" role="alert">
          Utilisateur / Mot de passe incorrect
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        <Container>
          <Row>
            <Col className="offset-1">
              <Row>
                <Col >
                  <Row>
                    <div className="perle-canvas" onClick={(event) => this.addColumn("left")}><i className="fas fa-arrow-circle-left clickable"></i></div>
                    <div className="perle-canvas" onClick={(event) => this.removeColumn("left")}><i className="fas perle-canvas fa-arrow-circle-right clickable"></i></div>
                    {this.state.topEmptySpots.map(e => this.emptySpot(e) )}
                    <div className="perle-canvas" onClick={(event) => this.removeColumn("right")}><i className="fas perle-canvas fa-arrow-circle-left clickable"></i></div>
                    <div className="perle-canvas" onClick={(event) => this.addColumn("right")}><i className="fas perle-canvas fa-arrow-circle-right clickable"></i></div>
                  </Row>
                </Col>
              </Row>
              {this.state.matrix.map((line, index) => this.drawLineMatrix(line, index))}
            </Col>

            <Col className="col-3">
              {this.displayUser()}
              {this.loginErrorMessage()}
              <div data-toggle="modal" data-target="#saveModal">
                <i className="fas fa-cloud-upload-alt fa-lg clickable"></i>
              </div>
              <div className="icon">
                <i className="fas fa-undo clickable" onClick={this.undo}></i>
              </div>
              <div data-toggle="modal" data-target="#defaultColorModal">
                Base <div className="perle-canvas clickable" style={{background: this.state.defaultColor}}></div>
              </div>
              <div data-toggle="modal" data-target="#nextColorModal">
                Prochaine  <div className="perle-canvas clickable" style={{background: this.state.nextColor}}></div>
              </div>
            </Col>
          </Row>
        </Container>
        {this.displayModal("nextColorModal", this.handleChangeCompleteNextColor, "Prochaine perle")}
        {this.displayModal("defaultColorModal", this.handleChangeCompleteDefaultColor, "Couleur par défaut")}
        {this.saveModal()}
      </div>
    )
  }
}
