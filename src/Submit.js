import React from 'react';

const Submit = () => {
  return (
    <div className="container">
      <div className="banner">
        <h1>Submit</h1>
        <p>Send in a recipe which may or may not be published!</p>
      </div>
      <form name="recipe-submit" method="post" action="/submit/">
        <input type="hidden" name="form-name" value="recipe-submit" />
        <p>
          <label>
            Recipe name
            <input type="text" name="recipe-name" placeholder="Avocado pasta"/>
          </label>
        </p>
        <p>
          <label>
            Author
            <input type="text" name="author" placeholder="John"/>
          </label>
        </p>
        <p>
          <label>
            Time
            <input type="text" name="time" placeholder="20 min"></input>
          </label>
        </p>
        <p>
          <label>
            Cost
            <input type="text" name="cost" placeholder="$3.50"></input>
          </label>
        </p>
        <p>
          <label>
            Cookware needed
            <input type="number" name="cookware-number" placeholder="4"></input>
          </label>
        </p>
        <p>
          <label>
            Servings
            <input type="number" name="servings" placeholder="4"></input>
          </label>
        </p>
        <p>
          <label>
            Ingredients
            <textarea rows="10" name="ingredients" placeholder="1 avocado, 1 box of pasta..."></textarea>
          </label>
        </p>
        <p>
          <label>
            Cookware
            <textarea rows="10" name="cookware" placeholder="1 frying pan, 1 pasta pot..."></textarea>
          </label>
        </p>
        <p>
          <label>
            Directions
            <textarea rows="10" name="directions" placeholder="1. Cut open avocado and mash contents in pan. 2. Add olive oil..."></textarea>
          </label>
        </p>
        <p>
          <button type="submit" className="button button--primary">Send</button>
        </p>
      </form>
    </div>
  )
}

export default Submit;