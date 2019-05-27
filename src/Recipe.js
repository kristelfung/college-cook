import React from 'react';

const Recipe = (props) => {
  return (
    <div className="container">
      <p>{props.recipe.name}</p>
    </div>
  )
}

export default Recipe;