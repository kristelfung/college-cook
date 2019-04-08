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
        {props.recipes.map(({fields}, i) => 
          <RecipeCard data={fields} key={i}>
          </RecipeCard>
        )}
      </div>
    );
}

export default Home;
