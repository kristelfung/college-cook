import React from 'react';

const RecipeCard = (props) => {
  return (
    <div className="column">
      <div className="recipe-card">
        <h3>{props.data.name}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;