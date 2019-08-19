import React, { Component } from 'react';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ffffff'
    }
  }

  componentDidMount () {
    try {
      const like = localStorage.getItem(this.urlify(this.props.recipe.name))
      if (like === '1') {
        this.setState(() => ({color: '#ff9e88'}))
      }
    } 
    catch (e) {}
  }

  urlify = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  handleClickLike = () => {
    if (this.state.color === '#ffffff') {
      this.setState(() => ({color: '#ff9e88'}))
      localStorage.setItem(this.urlify(this.props.recipe.name), 1)
      // ADD 1 TO STATE
      // SEND UPDATE TO FIREBASE
    } else {
      this.setState(() => ({color: '#ffffff'}))
      localStorage.setItem(this.urlify(this.props.recipe.name), 0)
      // DEDUCT 1 FROM STATE
      // SEND UPDATE TO FIREBASE
    }
  }

  render() {
    return (
      <div className="column">
        <a href={this.urlify(this.props.recipe.name)} className="link-wrapper">
          <div className="recipe-card" 
            style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + this.props.recipe.image.fields.file.url + ")"}}>
            <span role="img" aria-label="clock" className="emoji emoji--clock">⏰</span>
            <span className="time">{this.props.recipe.time} mins</span>
            <span className="cost">${this.props.recipe.cost}</span>
            <h2>{this.props.recipe.name}</h2>
            <div className="like-button" onClick={this.handleClickLike}>
              <span role="img" 
                aria-label="thumbs-up" 
                className="emoji emoji--thumb"
              >👍</span>
              <span className="likes" style={{color: this.state.color}}>15</span>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default RecipeCard;