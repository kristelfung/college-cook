import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowSize: window.innerWidth,
      buttonBackground: '#efefef',
      buttonText: '#000000'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    // check if its liked or not
    try {
      const like = localStorage.getItem(this.props.urlify(this.props.recipe.name))
      if (like === '1') {
        this.setState(() => ({
          buttonBackground: '#fd4c4c', 
          buttonText: '#ffffff'
        }))
      }
    } 
    catch (e) {}
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({windowSize: window.innerWidth})
  }

  handleClickLike = () => {
    const like = localStorage.getItem(this.props.urlify(this.props.recipe.name))
    if (like === '1') {
      this.setState(() => ({
        buttonBackground: '#efefef',
        buttonText: '#000000'
      }))
      localStorage.setItem(this.props.urlify(this.props.recipe.name), 0)
      // DEDUCT 1 FROM STATE
      // SEND UPDATE TO FIREBASE
    } 
    else {
      this.setState(() => ({
        buttonBackground: '#fd4c4c',
        buttonText: '#ffffff'
      }))
      localStorage.setItem(this.props.urlify(this.props.recipe.name), 1)
      // ADD 1 TO STATE
      // SEND UPDATE TO FIREBASE
    }
  }

  renderHeader = () => {
    if (this.state.windowSize < 800) {
      return [
        <div className="row" key="mobile">
          <div className="recipe-img-wrap">
            <div className="recipe-image" 
                style={{backgroundImage: "url(" + this.props.recipe.image.fields.file.url + ")"}}>
            </div>
          </div>
          <div className="recipe-title">
              <h1>{this.props.recipe.name}</h1>
              <p>by {this.props.recipe.author}</p>
              <button 
                className="recipe-like" 
                style={{backgroundColor: this.state.buttonBackground}}
                onClick={this.handleClickLike}
              >
                <span className="emoji" role="img">👍</span>
                <span className="recipe-like-num" style={{color: this.state.buttonText}}>15</span>
              </button>
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
        <div className="row" key="desktop">
          <div className="recipe-img-wrap">
            <div className="recipe-image" 
                style={{backgroundImage: "url(" + this.props.recipe.image.fields.file.url + ")"}}>
            </div>
          </div>
          <div className="recipe-header"> 
            <div className="recipe-title">
              <h1>{this.props.recipe.name}</h1>
              <p>by {this.props.recipe.author}</p>
              <button 
                className="recipe-like" 
                style={{backgroundColor: this.state.buttonBackground}}
                onClick={this.handleClickLike}
              >
                <span className="emoji" role="img">👍</span>
                <span className="recipe-like-num" style={{color: this.state.buttonText}}>15</span>
              </button>
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
        <div className="row">
          <div className="recipe-sidebar">
            <h2>Ingredients</h2>
            {documentToReactComponents(this.props.recipe.ingredients)}
            <br/>
            <h2>Cookware</h2>
            {documentToReactComponents(this.props.recipe.cookware)}
          </div>
          <div className="recipe-directions">
            <h2>Directions</h2>
            {documentToReactComponents(this.props.recipe.directions)}
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;