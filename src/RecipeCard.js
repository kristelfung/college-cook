import React, { Component } from 'react';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ffffff'
    }
  }

  // componentDidMount () {
    // try {
    //   const like = localStorage.getItem(this.props.urlify(this.props.recipe.name))
    //   if (like === '1') {
    //     this.setState(() => ({color: '#ff9e88'}))
    //   }
    // } 
    // catch (e) {}
  // }

  handleClickLike = (e) => { 
    e.preventDefault()
    this.props.changeLike(this.props.urlify(this.props.recipe.name))
    // const like = localStorage.getItem(this.props.urlify(this.props.recipe.name))
    // if (like === '1') {
    //   this.setState(() => ({color: '#ffffff'}))
    //   localStorage.setItem(this.props.urlify(this.props.recipe.name), 0)
    //   // DEDUCT 1 FROM STATE + UPDATE FIREBASE
    //   this.props.decrementLikes(this.props.recipe.name)
    // } 
    // else if (like === '0') {
    //   this.setState(() => ({color: '#ff9e88'}))
    //   localStorage.setItem(this.props.urlify(this.props.recipe.name), 1)
    //   // ADD 1 TO STATE + UPDATE FIREBASE
    //   this.props.incrementLikes(this.props.recipe.name)
    // }
  }

  render() {
    return (
      <div className="column">
        <a href={this.props.urlify(this.props.recipe.name)} className="link-wrapper">
          <div className="recipe-card" 
            style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + this.props.recipe.image.fields.file.url + ")"}}>
            <span role="img" aria-label="clock" className="emoji emoji--clock">⏰</span>
            <span className="time">{this.props.recipe.time} mins</span>
            <span className="cost">${this.props.recipe.cost}</span>
            <h2>{this.props.recipe.name}</h2>
            <button className="recipe-card__like" onClick={this.handleClickLike}>
              <span role="img" aria-label="thumbs-up" className="emoji">👍</span>
              <span style={{color: this.state.color}}>{this.props.recipe.likes || 0}</span>
            </button>
          </div>
        </a>
      </div>
    )
  }
}

export default RecipeCard;