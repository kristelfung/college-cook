import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
    return (
    <div className="column">
      <Link to={props.urlify(props.recipe.name)} className="link-wrapper">
        <div className="recipe-card" 
          style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + props.recipe.image.fields.file.url + ")"}}>
          <span role="img" aria-label="clock" className="emoji emoji--clock">⏰</span>
          <span className="time">{props.recipe.time} mins</span>
          <span className="cost">${props.recipe.cost}</span>
          <h2>{props.recipe.name}</h2>
          <button className="recipe-card__like">
            <span role="img" aria-label="thumbs-up" className="emoji">👍</span>
            <span>0</span>
          </button>
        </div>
      </Link>
    </div>
  )
}

export default RecipeCard;