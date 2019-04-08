import React from 'react';

const RecipeCard = (props) => {
  return (
    <div>
      <p>{props.data.name}</p>
    </div>
  )
}

export default RecipeCard;