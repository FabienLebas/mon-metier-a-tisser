import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Canvas extends Component {
  constructor(props){
    super(props);
    this.state={
      columnsToDraw: 7,
      columnsInput: 7,
      linesInput: 9,
      matrix:[
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"],
        ["default", "default", "default", "default", "default", "default", "default"]
      ],
      defaultColor: "black",
      nextColor: "gold"
    }
  }

  addColumn = (side) => {
    let newMatrix = this.state.matrix;
    if (side === "left"){
      newMatrix = newMatrix.map(line => ["default"].concat(line))
    } else if (side === "right") {
      newMatrix = newMatrix.map(line => line.concat(["defaul"]))
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
      newLine.push("default");
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
      <div key={indexColumn} style={{color: myColor}} className="perle" onClick={(event) => this.changePerleColor(indexColumn, indexLine, this.state.nextColor)}>O</div>
    )
  }

  changePerleColor = (indexColumn, indexLine, newColor) => {
    const newMatrix = this.state.matrix;
    newMatrix[indexLine][indexColumn] = newColor;
    this.setState({
      matrix: newMatrix
    })
  }

  render(){
    return(
      <div>
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

            <Col>
              <div>
                <label htmlFor="defaultColor">Couleur par défaut :</label>
                <input type="text" id="defaultColor" name="defaultColor" value={this.state.defaultColor} onChange={this.handleChangeDefaultColor}></input>
              </div>
              <div>
                <label htmlFor="nextColor">Prochaine perle :</label>
                <input type="text" id="nextColor" name="nextColor" value={this.state.nextColor} onChange={this.handleChangeNextColor}></input>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
