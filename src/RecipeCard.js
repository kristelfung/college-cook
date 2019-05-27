import React from 'react';

const urlify = (name) => {
  return name.replace(/\s+/g, '-').toLowerCase();
}

const RecipeCard = (props) => {
  return (
    <div className="column">
      <a href={urlify(props.recipe.name)} className="link-wrapper">
        <div className="recipe-card" 
          style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + props.recipe.image.fields.file.url + ")"}}>
          <span role="img" aria-label="clock" className="emoji emoji--clock">⏰</span>
          <span className="time">{props.recipe.time} mins</span>
          <span className="cost">${props.recipe.cost}</span>
          <h2>{props.recipe.name}</h2>
          {/* <span role="img" aria-label="thumbs-up" className="emoji emoji--thumb">👍</span> */}
          {/* <span className="likes">15</span> */}
        </div>
      </a>
    </div>
  )
}

export default RecipeCard;