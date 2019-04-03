import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as contentful from 'contentful';
import Home from './Home';
import FAQ from './FAQ';
import "./scss/styles.scss";

class CollegeCook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }

  client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  })
  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }
  fetchPosts = () => this.client.getEntries()
  setPosts = response => {
    this.setState({
      recipes: response.items
    })
  }

  render () {
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
}

export default CollegeCook;