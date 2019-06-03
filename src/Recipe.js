import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
              <p>by {this.props.recipe.author}</p>
              <button className="like">15</button>
          </div>
          <div className="recipe-details">
              <p>
                <span role="img" aria-label="clock">⏰</span>
                {this.props.recipe.time} mins
              </p>
              <p>
                <span role="img" aria-label="money">💸</span>
                ${this.props.recipe.cost} USD per serving
              </p>
            </div>
            <div className="recipe-details">
              <p>
                <span role="img" aria-label="plate">🍽️</span>
                {this.props.recipe.servings} servings
              </p>
              <p>
                <span role="img" aria-label="food">🥘</span>
                {this.props.recipe.cookwareToWash} cookware to wash
              </p>
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
              <p>by {this.props.recipe.author}</p>
              <button className="like">15</button>
            </div>
            <div className="recipe-details">
              <p>
                <span role="img" aria-label="clock">⏰</span>
                {this.props.recipe.time} mins
              </p>
              <p>
                <span role="img" aria-label="money">💸</span>
                ${this.props.recipe.cost} USD per serving
              </p>
            </div>
            <div className="recipe-details">
              <p>
                <span role="img" aria-label="plate">🍽️</span>
                {this.props.recipe.servings} servings
              </p>
              <p>
                <span role="img" aria-label="food">🥘</span>
                {this.props.recipe.cookwareToWash} cookware to wash
              </p>
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
        <div className="recipe-body">
          <div className="recipe-sidebar">
            <h3>Ingredients</h3>
            {documentToReactComponents(this.props.recipe.ingredients)}
            <br/>
            <h3>Cookware</h3>
            {documentToReactComponents(this.props.recipe.cookware)}
          </div>
          <div className="recipe-directions">
            <h3>Directions</h3>
            {documentToReactComponents(this.props.recipe.directions)}
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;