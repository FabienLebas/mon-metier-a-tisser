import React, { Component} from 'react';
import "../stylesheets/canvas.css";

export default class Library extends Component {
  constructor(props){
    super(props);
    this.state={
      canvas: []
    }
  }

  componentDidMount(){
    console.log(`user ${this.props.user}`);
    if (this.props.user){
      console.log(`username : ${this.props.user.username}`);
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
    let firstIsActive = "carousel-item";
    if (index === 0){
      firstIsActive += " active";
    }
    return(
      <div key={index} className={firstIsActive}>
        <div className="col-12 col-md-4">
          <div className="card mb-2">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/img (36).jpg"
              alt="Card cap 1"/>
            <div className="card-body">
              <h4 className="card-title font-weight-bold">{canvas.name}</h4>
              <div className="btn btn-primary btn-md btn-rounded">Ajouter</div>
            </div>
          </div>
        </div>
      </div>
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

  displayCarousel = () => {
    return (
      <div id="carousel-example-multi" className="carousel slide carousel-multi-item v-2" data-ride="carousel">

        <div className="controls-top">
          <a className="btn-floating" href="#carousel-example-multi" data-slide="prev"><i
              className="fas fa-chevron-left"></i></a>
            <a className="btn-floating" href="#carousel-example-multi" data-slide="next"><i
              className="fas fa-chevron-right"></i></a>
        </div>

        <ol className="carousel-indicators">
          {this.state.canvas.map((canvas, index) => this.carouselIndicator(canvas, index))}
        </ol>

        <div className="carousel-inner v-2" role="listbox">
          {this.state.canvas.map((canvas, index) => this.displayCanvas(canvas, index))}
        </div>

      </div>
    )
  }

  render(){
    if (this.props.user){
      return(
        <div>
          {this.displayCarousel()}
        </div>
      )
    } else return null;
  }
}
