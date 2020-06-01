import React, { Component} from 'react';
import {Row} from 'react-bootstrap';
import "../stylesheets/library.css";

export default class Library extends Component {
  constructor(props){
    super(props);
    this.state={
      canvas: []
    }
  }

  componentDidMount(){
    if (this.props.user){
      this.getCanvas(this.props.user.username);
    }
  }

  getCanvas = (username) => {
    const baseUrlBack = process.env.REACT_APP_baseUrlBack;
    return fetch(`${baseUrlBack}/users/${this.props.user.username}/canvas`)
    .then(result => result.json())
    .then(result => {
      this.setState({
        canvas: result
      })
    })
  }

  displayCanvas = (canvas, index) => {
    const details = JSON.parse(canvas.details)
    if (details.length > 0){
      return(
          <div key={index} className="col-12 col-md-4">
            <div className="card mb-2">
              {details.map((line, index) => this.drawLineMatrix(line, index, canvas.default_color))}
              <div className="card-body">
                <h4 className="card-title font-weight-bold">{canvas.name}</h4>
                <div className="btn btn-primary btn-md btn-rounded">Ajouter</div>
              </div>
            </div>
          </div>
      )
    }
  }

  drawPerle = (perleColor, indexColumn, indexLine, defaultColor) => {
    let myColor = defaultColor;
    if (perleColor !== "default") {
      myColor = perleColor;
    }
    return(
      <div key={indexColumn} style={{background: myColor}} className="perle-library"></div>
    )
  }

  drawLineMatrix = (line, indexLine, defaultColor) => {
    return(
      <Row key={indexLine} className="row-library">
        {line.map((perleColor, indexColumn) => this.drawPerle(perleColor, indexColumn, indexLine, defaultColor))}
      </Row>
    )
  }

  carouselIndicator = (canvas, index) => {
    let firstIsActive = "";
    if (index === 0){
      firstIsActive = "active";
    }
    return(
      <li key={index} data-target="#carousel-example-multi" data-slide-to={index} className={firstIsActive}></li>
    )
  }

  displayCarouselGroup = (startIndex) => {
    switch (this.state.canvas.length){
      case 0:
        break;
      case 1:
        return(
          <div className="carousel-item active">
            {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
          </div>
        )
      case 2:
        if (startIndex === 0){
          return(
            <div key={startIndex} className="carousel-item active">
              {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
              {this.displayCanvas(this.state.canvas[startIndex + 1], startIndex + 1)}
            </div>
          )
        } else {
          return(
            <div key={startIndex} className="carousel-item">
              {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
              {this.displayCanvas(this.state.canvas[0], 0)}
            </div>
          )
        }
      default:
        if (startIndex + 2 <= this.state.canvas.length){
          return(
            <div key={startIndex} className="carousel-item">
              {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
              {this.displayCanvas(this.state.canvas[startIndex + 1], startIndex + 1)}
              {this.displayCanvas(this.state.canvas[startIndex + 2], startIndex + 2)}
            </div>
          )
        } else if (startIndex + 1 === this.state.canvas.length){
          return(
            <div key={startIndex} className="carousel-item">
              {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
              {this.displayCanvas(this.state.canvas[startIndex + 1], startIndex + 1)}
              {this.displayCanvas(this.state.canvas[0], 0)}
            </div>
          )
        } else {
          return(
            <div key={startIndex} className="carousel-item active">
              {this.displayCanvas(this.state.canvas[startIndex], startIndex)}
              {this.displayCanvas(this.state.canvas[0], 0)}
              {this.displayCanvas(this.state.canvas[1], 1)}
            </div>
          )
        }
      }
  }

  displayCarousel = () => {
    return (
      <div id="carousel-example-multi" className="carousel slide carousel-multi-item v-2" data-ride="carousel">
        <div className="controls-top text-center">
          <a className="btn-floating waves-effect waves-light" href="#carousel-example-multi" data-slide="prev"><i className="fas fa-chevron-left"></i></a>
          <a className="btn-floating waves-effect waves-light" href="#carousel-example-multi" data-slide="next"><i className="fas fa-chevron-right"></i></a>
        </div>
        <ol className="carousel-indicators">
          {this.state.canvas.map((canvas, index) => this.carouselIndicator(canvas, index))}
        </ol>
        <div className="carousel-inner v-2" role="listbox">
          {this.state.canvas.map((canvas, index) => this.displayCarouselGroup(index))}
        </div>
      </div>
    )
  }

  render(){
    if (this.props.user && this.state.canvas.length > 0){
      return(
        <div>
          {this.displayCarousel()}
        </div>
      )
    } else return null;
  }
}
