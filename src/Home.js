import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FAQ from './FAQ';

class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to="/">Home</Link>
          <Link to="/faq/">FAQ</Link>
          <Route path="/faq/" component={FAQ}></Route>
        </Router>
        <p>sdklfjads;lkfdlsfsd</p>
      </div>
    );
  }
}

export default Home;
