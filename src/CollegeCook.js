import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as contentful from 'contentful';
import Home from './Home';
import FAQ from './FAQ';
import Submit from './Submit';
import Recipe from './Recipe';
import logo from './images/logo.svg';
import "./scss/styles.scss";

class CollegeCook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      faq: {},
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
      recipes: response.items.filter(item => item.sys.contentType.sys.id === "recipe"),
      faq: response.items.find(item => item.sys.contentType.sys.id === "faq"),
      loading: false
    })
  }
  
  urlify = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  render () {
    if (this.state.loading) {
      return (
        <p>loading</p>
      )
    }
    return (
      <div className="body-wrap">
        <div className="content">
          <Router>
            <nav className="navbar">
              <div className="container">
                <div className="navbar__left">
                  <a href="/" className="link-wrapper logo">
                    <img src={logo} className="logo__image" alt="logo"/>
                    <span className="logo__text">collegecook</span>
                  </a>
                </div>
                <div className="navbar__right">
                  <Link to="/" className="navbar__item">Home</Link>
                  <Link to="/faq/" className="navbar__item">FAQ</Link>
                  <Link to="/submit/" className="navbar__item button button--primary">Submit a recipe</Link>
                </div>
              </div>
            </nav>
            <Route exact path="/" component={() => (<Home recipes={this.state.recipes} />)}/>
            <Route path="/faq/" component={() => (<FAQ data={this.state.faq.fields} />)}/>
            <Route path="/submit/" component={Submit}/>
            {this.state.recipes.map(({fields}, i) =>
              <Route path={"/" + this.urlify(fields.name) + "/"} 
                component={() => (<Recipe recipe={fields}/>)}
                key={i}/>
            )}
          </Router>
        </div>
        <footer className="container footer">
          <p>Made with <span role="img" aria-label="heart">❤️</span> by <a href="https://kristelfung.com/">Kristel Fung</a>.</p>
        </footer>
      </div>
    )
  }
}

export default CollegeCook;