import React from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

const Home = (props) => {
    return (
      <div className="container">
        <div className="banner">
          <h1>Recipes for college</h1>
          <p>Affordable recipes that use the least amount of ingredients 
          and cookware possible.</p>
        </div>
        <SearchBar 
          addNameFilter={props.addNameFilter}
          addTimeFilter={props.addTimeFilter}
          addCostFilter={props.addCostFilter}
        />
        <div className="row">
          {props.recipes.map(({fields}, i) => 
            <RecipeCard recipe={fields} 
              key={props.urlify(fields.name)} 
              urlify={props.urlify}>
            </RecipeCard>
          )}
        </div>
      </div>
    );
}

export default Home;
