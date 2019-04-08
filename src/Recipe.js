import React from 'react';

const Recipe = (props) => {
  return (
    <div>
      <p>{props.recipe.name}</p>
    </div>
  )
}

export default Recipe;