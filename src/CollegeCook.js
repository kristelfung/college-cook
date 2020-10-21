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
      filteredRecipes: [],
      nameFilter: "",
      timeFilter: 50,
      costFilter: 7,
      faq: {},
      loading: true
    }
  }

  client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
  })

  componentDidMount() {
    this.fetchPosts().then(this.setPosts)
  }

  fetchPosts = () => this.client.getEntries()

  setPosts = (response) => {
    this.setState({
      recipes: response.items.filter(item => item.sys.contentType.sys.id === "recipe"),
      filteredRecipes: response.items.filter(item => item.sys.contentType.sys.id === "recipe"),
      faq: response.items.find(item => item.sys.contentType.sys.id === "faq"),
      loading: false
    })
  }

  addNameFilter = (param) => {
    this.setState (
      {
        nameFilter: param.toLowerCase()
      },
      this.filter
    )
  }

  addTimeFilter = (param) => {
    this.setState(
      {
        timeFilter: param
      },
      this.filter
    )
  }

  addCostFilter = (param) => {
    this.setState(
      {
        costFilter: param
      },
      this.filter
    )
  }

  filter = () => {
    let nameFilter = this.state.nameFilter
    let timeFilter = this.state.timeFilter
    let costFilter = this.state.costFilter
    let newRecipes = this.state.recipes
    newRecipes = newRecipes.filter(function(item) {
      const { name, cost, time } = item.fields
      if (name.toLowerCase().includes(nameFilter) &&
          cost <= costFilter &&
          time <= timeFilter) {
          return item
      }
    })
    this.setState({
        filteredRecipes: newRecipes
    })
  }

  urlify = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  render () {
    if (this.state.loading) {
      return (
        <div className="lds-wrapper">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
    return (
      <div className="body-wrap">
        <div className="content">
          <Router>
            <nav className="navbar">
              <div className="container">
                <div className="navbar__left">
                  <Link to="/" className="link-wrapper logo">
                    <img src={logo} className="logo__image" alt="logo"/>
                    <span className="logo__text">collegecook</span>
                  </Link>
                </div>
                <div className="navbar__right">
                  <Link to="/" className="navbar__item">Home</Link>
                  <Link to="/faq/" className="navbar__item">FAQ</Link>
                  <Link to="/submit/" className="navbar__item button button--primary">Submit a recipe</Link>
                </div>
              </div>
            </nav>
            <Route exact path="/" render={() => (
              <Home recipes={this.state.filteredRecipes} 
                urlify={this.urlify}
                addNameFilter={this.addNameFilter}
                addTimeFilter={this.addTimeFilter}
                addCostFilter={this.addCostFilter}
              />
            )}/>
            <Route path="/faq/" render={() => (<FAQ data={this.state.faq.fields} />)}/>
            <Route path="/submit/" render={Submit}/>
            {this.state.recipes.map(({fields}, i) =>
              <Route path={"/" + this.urlify(fields.name) + "/"}
                key={this.urlify(fields.name)}
                render={() => (
                <Recipe recipe={fields} 
                  urlify={this.urlify}
                />)}
              />
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