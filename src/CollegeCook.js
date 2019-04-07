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
      recipes: [],
      loading: true
    }
  }

  client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  })
  componentDidMount() {
    this.setState({ loading: true })
    this.fetchPosts().then(this.setPosts);
  }
  fetchPosts = () => this.client.getEntries()
  setPosts = response => {
    this.setState({
      recipes: response.items,
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <p>loading</p>
      )
    }
    return (
      <div>
        <Router>
          <nav className="navbar">
            <div className="container">
              <div class="navbar__left">
                <span className="navbar__item">LOGO</span>
              </div>
              <div className="navbar__right">
                <Link to="/" className="navbar__item">Home</Link>
                <Link to="/faq/" className="navbar__item">FAQ</Link>
              </div>
            </div>
          </nav>
          <Route exact path="/" component={Home}/>
          <Route path="/faq/" component={FAQ}/>
        </Router>
        {this.state.recipes.map(({fields}, i) => 
          <div>
            <p key={i}>{fields.name}</p>
          </div>
        )}
      </div>
    )
  }
}

export default CollegeCook;