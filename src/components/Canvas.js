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
      defaultColor: "black"
    }
  }

  handleChangeColumns = (event) => {
    const valueInput = parseInt(event.target.value, 10);
    const initialNbColumns = this.state.matrix[0].length;
    if ( valueInput > 1 && valueInput < initialNbColumns){ //decrease
      const newMatrix = this.state.matrix.map(line => line.slice(0,valueInput));
      this.setState({
        columnsInput: valueInput,
        matrix: newMatrix
      })
    } else if (valueInput > 1 && valueInput > initialNbColumns) { //increase
      const newMatrix = this.state.matrix.map(line => this.addColumns(line, valueInput - initialNbColumns));
      this.setState({
        columnsInput: valueInput,
        matrix: newMatrix
      })
    }
    else {
      this.setState({
        columnsInput: valueInput
      })
    }
  }

  addColumns = (line, numberOfColumnsToAdd) => {
    const result = line;
    for (let i = 0; i < numberOfColumnsToAdd; i++){
      result.push("default");
    }
    return result;
  }

  handleChangeLines = (event) => {
    const valueInput = parseInt(event.target.value, 10);
    const initalNbLines = this.state.matrix.length;
    if ( valueInput > 1 && valueInput < initalNbLines){ //decrease
      const newMatrix = this.state.matrix.slice(0, valueInput);
      this.setState({
        matrix: newMatrix,
        linesInput: valueInput
      })
    } else if (valueInput > 1 && valueInput > initalNbLines) { //increase
      const newLine = [];
      for (let j = 0; j < this.state.matrix[0].length; j++){
        newLine.push("default");
      }
      const newMatrix = this.state.matrix;
      for (let i = 0; i < valueInput - initalNbLines; i++){
        newMatrix.push([...newLine]);
      }
      this.setState({
        matrix: newMatrix,
        linesInput: valueInput
      })
    }
    else {
      this.setState({
        linesInput: valueInput
      })
    }
  }

  drawLineMatrix = (line, indexLine) => {
    return(
      <Row key={indexLine}>
        {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine))}
      </Row>
    )
  }

  drawPerle = (perleColor, indexColumn, indexLine) => {
    let myColor = this.state.defaultColor;
    if (perleColor !== "default") {
      myColor = perleColor;
    }
    return(
      <Col key={indexColumn} style={{color: myColor}} onClick={(event) => this.changeColor(indexColumn, indexLine, "blue")}>O</Col>
    )
  }

  changeColor = (indexColumn, indexLine, newColor) => {
    console.log(`changeColor for column ${indexColumn} and line ${indexLine}`);
    const newMatrix = this.state.matrix;
    newMatrix[indexLine][indexColumn] = newColor;
    this.setState({
      matrix: newMatrix
    })
  }

  render(){
    console.log(this.state.matrix);
    return(
      <div>
        <div>
          <label htmlFor="columns">Nombre de colonnes dans le bracelet :</label>
          <input type="number" id="columns" name="columns" min="1" max="20" value={this.state.columnsInput} onChange={this.handleChangeColumns}></input>
        </div>
        <div>
          <label htmlFor="lines">Longueur du bracelet (en nombre de perles) :</label>
          <input type="number" id="lines" name="lines" min="10" max="1000" value={this.state.linesInput} onChange={this.handleChangeLines}></input>
        </div>
        <Container>
          {this.state.matrix.map((line, index) => this.drawLineMatrix(line, index))}
        </Container>
      </div>
    )
  }
}
