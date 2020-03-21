import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
  render() {
    return (
      <div className="column">
        <Link to={this.props.urlify(this.props.recipe.name)} className="link-wrapper">
          <div className="recipe-card" 
            style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + this.props.recipe.image.fields.file.url + ")"}}>
            <span role="img" aria-label="clock" className="emoji emoji--clock">⏰</span>
            <span className="time">{this.props.recipe.time} mins</span>
            <span className="cost">${this.props.recipe.cost}</span>
            <h2>{this.props.recipe.name}</h2>
          </div>
        </Link>
      </div>
    )
  }
}

export default RecipeCard;