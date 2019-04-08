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
          <h3>{props.recipe.name}</h3>
        </div>
      </a>
    </div>
  )
}

export default RecipeCard;