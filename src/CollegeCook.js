import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import FAQ from './FAQ';
import "./scss/styles.scss";

const CollegeCook = () => {
  return (
    <div>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/faq/">FAQ</Link>
        <Route exact path="/" component={Home}/>
        <Route path="/faq/" component={FAQ}/>
      </Router>
    </div>
  )
}

export default CollegeCook;