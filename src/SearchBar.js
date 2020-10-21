import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <form className="filters" onSubmit={e => { e.preventDefault();}}>
        <div className="row row--filter">
          <div className="column column--search">
            <span role="img" aria-label="magnifying-glass" className="emoji-magnifying">🔍</span>
            <input type="text" placeholder="Search..."
              onChange={(e) => props.addNameFilter(e.target.value)}
            />
          </div>
          <div className="column column--filter">
            <select onChange={(e) => props.addTimeFilter(e.target.value)}>
              <option value="50">⏰ Duration</option>
              <option value="20">⏰ &#8804; 20 min</option>
              <option value="30">⏰ &#8804; 30 min</option>
              <option value="40">⏰ &#8804; 40 min</option>
            </select>
          </div>
          <div className="column column--filter">
            <select onChange={(e) => props.addCostFilter(e.target.value)}>
              <option value="7.00">💸 Cost</option>
              <option value="3.00">💸 &#8804; $3.00</option>
              <option value="4.00">💸 &#8804; $4.00</option>
              <option value="5.00">💸 &#8804; $5.00</option>
              <option value="6.00">💸 &#8804; $6.00</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;