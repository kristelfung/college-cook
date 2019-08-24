import React, { Component } from 'react';

class RecipeCard extends Component {
  handleClickLike = (e) => { 
    e.preventDefault()
    this.props.changeLike(this.props.urlify(this.props.recipe.name))
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
              <span style={
                this.props.liked ? {color: '#ff9e88'} : {color: '#ffffff'}
              }>
                {this.props.recipe.likes || 0}
              </span>
            </button>
          </div>
        </a>
      </div>
    )
  }
}

export default RecipeCard;