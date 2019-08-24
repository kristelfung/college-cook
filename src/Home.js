import React from 'react';
import RecipeCard from './RecipeCard';

const Home = (props) => {
    return (
      <div className="container">
        <div className="banner">
          <h1>Recipes for college</h1>
          <p>Affordable recipes that use the least amount of ingredients 
          and cookware possible.</p>
        </div>
        <div className="row">
          {props.recipes.map(({fields}, i) => 
            <RecipeCard recipe={fields} 
              key={props.urlify(fields.name)} 
              urlify={props.urlify}
              changeLike={props.changeLike}
              liked={props.urlify(fields.name) in props.userlikes}>
            </RecipeCard>
          )}
        </div>
      </div>
    );
}

export default Home;
