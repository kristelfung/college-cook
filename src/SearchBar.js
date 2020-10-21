import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <form className="filters">
        <div className="filters--search">
          <span role="img" aria-label="magnifying-glass" className="emoji-magnifying">🔍</span>
          <input type="text" placeholder="Search..."
            onChange={(e) => props.addSearchFilter(e.target.value)}
          />
        </div>
        <div className="filters--dropdown">
          <select>
            <option value="0" className="option-one">⏰ Duration</option>
            <option value="1">⏰ &#8804; 20 min</option>
            <option value="2">⏰ &#8804; 30 min</option>
            <option value="3">⏰ &#8804; 40 min</option>
          </select>
        </div>
        <div className="filters--dropdown">
          <select>
            <option value="0" className="option-one">💸 Cost</option>
            <option value="1">💸 &#8804; $3.00</option>
            <option value="2">💸 &#8804; $4.00</option>
            <option value="3">💸 &#8804; $5.00</option>
            <option value="4">💸 &#8804; $6.00</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;