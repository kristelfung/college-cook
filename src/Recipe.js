import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowSize: window.innerWidth
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
      this.setState({windowSize: window.innerWidth})
  }

  renderHeader = () => {
    if (this.state.windowSize < 800) {
      return [
        <div className="row">
          <div className="recipe-img-wrap">
            <div className="recipe-image" 
                style={{backgroundImage: "url(" + this.props.recipe.image.fields.file.url + ")"}}>
            </div>
          </div>
          <div className="recipe-title">
              <h1>{this.props.recipe.name}</h1>
              <p>by Kristel</p>
              <button className="like">15</button>
          </div>
          <div className="recipe-details">
            <p>a;small {this.state.windowSize}</p>
          </div>
        </div>
      ]
    }
    else {
      return [
        <div className="row">
          <div className="recipe-img-wrap">
            <div className="recipe-image" 
                style={{backgroundImage: "url(" + this.props.recipe.image.fields.file.url + ")"}}>
            </div>
          </div>
          <div className="recipe-header"> 
            <div className="recipe-title">
              <h1>{this.props.recipe.name}</h1>
              <p>by Kristel</p>
              <button className="like">15</button>
            </div>
            <div className="recipe-details">
              <p>a;big {this.state.windowSize}</p>
            </div>
          </div>
        </div>
      ]
    }
  }

  render () {
    return (
      <div className="container">
        <div className="banner">
          <Link to="/" className="button button--secondary">Back</Link>
        </div>
        {this.renderHeader()}
      </div>
    )
  }
}

export default Recipe;