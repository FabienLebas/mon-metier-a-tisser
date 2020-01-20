import React, { Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { SwatchesPicker } from 'react-color';

export default class Canvas extends Component {
  constructor(props){
    super(props);
    this.state={
      matrix:[
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default", "default", "default", "default"]
      ],
      defaultColor: "black",
      nextColor: "gold",
      history: []
    }
  }

  addColumn = (side) => {
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

  drawLineMatrix = (line, indexLine) => {
    switch(indexLine){
      case 0:
        return (
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <span onClick={(event) => this.addLine("top")}>+</span>
          </Row>
        )
      case 1:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <span onClick={(event) => this.removeLine("top")}>-</span>
          </Row>
        )
      case this.state.matrix.length - 2:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <span onClick={(event) => this.removeLine("bottom")}>-</span>
          </Row>
        )
      case this.state.matrix.length -1:
        return(
          <Row key={indexLine}>
            {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
            <span onClick={(event) => this.addLine("bottom")}>+</span>
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
      <div key={indexColumn} style={{color: myColor}} className="perle" onClick={(event) => this.changePerleColor(indexColumn, indexLine, this.state.nextColor, true)}>O</div>
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

  displayModal = (modalName, functionWhenSelected, textTitle) => {
    const label = modalName + "Label";
    return(
      <div className="modal fade" id={modalName} tabindex="-1" role="dialog" aria-labelledby={label} aria-hidden="true">
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



  render(){
    return(
      <div>
        <h2 className="text-center">Création</h2>
        <Container>
          <Row>
            <Col className="offset-1">
              <Row>
                <Col className="col-4">
                  <Row>
                    <span onClick={(event) => this.addColumn("left")}>+</span>
                    <span onClick={(event) => this.removeColumn("left")}>-</span>
                  </Row>
                </Col>
                <Col className="col-4 offset-2">
                  <Row>
                    <span onClick={(event) => this.removeColumn("right")}>-</span>
                    <span onClick={(event) => this.addColumn("right")}>+</span>
                  </Row>
                </Col>
              </Row>
              {this.state.matrix.map((line, index) => this.drawLineMatrix(line, index))}
            </Col>

            <Col className="col-4">
              <div data-toggle="modal" data-target="#defaultColorModal">
                Base <span className="colorSample" style={{color: this.state.defaultColor}}>0</span>
              </div>
              <div data-toggle="modal" data-target="#nextColorModal">
                Prochaine  <span className="colorSample" style={{color: this.state.nextColor}}>O</span>
              </div>
              <i class="fas fa-undo" onClick={this.undo}></i>
            </Col>
          </Row>
        </Container>
        {this.displayModal("nextColorModal", this.handleChangeCompleteNextColor, "Prochaine perle")}
        {this.displayModal("defaultColorModal", this.handleChangeCompleteDefaultColor, "Couleur par défaut")}
      </div>
    )
  }
}
