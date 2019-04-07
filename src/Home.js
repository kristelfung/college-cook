import React from 'react';

const Home = (props) => {
    return (
      <div className="container">
        <div className="banner">
          <h1>Recipes for college</h1>
          <p>Affordable recipes that use the least amount of ingredients 
          and cookware possible.</p>
        </div>
        {props.recipes.map(({fields}, i) => 
          <div>
            <p key={i}>{fields.name}</p>
          </div>
        )}
      </div>
    );
}

export default Home;
