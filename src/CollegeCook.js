import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as contentful from 'contentful';
import Home from './Home';
import FAQ from './FAQ';
import Submit from './Submit';
import Recipe from './Recipe';
import Firebase from 'firebase';
import config from './config';
import logo from './images/logo.svg';
import "./scss/styles.scss";

class CollegeCook extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config)

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
    this.fetchPosts().then(this.setPosts)
    this.startSession()  // create instance of user session w/ their likes!
    this.getTotalLikes()  // get total likes
    this.setState({ loading: false })
  }

  fetchPosts = () => this.client.getEntries()

  setPosts = (response) => {
    this.setState({
      recipes: response.items.filter(item => item.sys.contentType.sys.id === "recipe"),
      faq: response.items.find(item => item.sys.contentType.sys.id === "faq")
    })
  }

  getTotalLikes = () => {
    const ref = Firebase.database().ref('/')
    ref.on('value', snapshot => {
      const likesDictionary = snapshot.val() // this is a dictionary
      for (let i = 0; i < this.state.recipes.length; i++) {
        const recipeName = this.urlify(this.state.recipes[i].fields.name)
        if (likesDictionary[recipeName]) { // if recipe found in firebase likes dict
          this.setState(() =>
            this.state.recipes[i].fields['likes'] = (likesDictionary[recipeName])
          )
        }
      }
    })
  }

  startSession = () => {
    // start the session
    Firebase.auth().signInAnonymously().catch((err) => {
      console.log(err.name + err.message)
    })
    Firebase.auth().onAuthStateChanged(user => {
      Firebase.database().ref('users/' + user.uid).once('value', snapshot => {
        // if (!snapshot.exists()) {
        //   console.log("create user")
        // }
        // this.getUserLikes(user.uid) 
      })
    })
  }

  // getUserLikes = (uid) => {
  //   // get current user likes and store in state (rerender occurs on state change)
  //   const ref = Firebase.database().ref('users/' + uid)
  //   ref.on('value', snapshot => {
  //     const liked = snapshot.val()
  //     // NEED TO GET USER LIKES. FIRST DO CHANGELIKE TO ADD LIKES
  //   })
  // }

  changeLike = (recipeName) => {
    // modify current session
    Firebase.auth().onAuthStateChanged((user) => {
      const ref = Firebase.database().ref('users/' + user.uid)
      ref.once('value').then(snapshot => {
        if (snapshot.exists()) { // if user has likes already!
          for (const [key, value] of Object.entries(snapshot.val())) {
            if (recipeName === value) {
              ref.child(key).remove()
              this.decrementTotalLikes(recipeName)
              return
            }
          }
          ref.push(recipeName) // if not found in user likes, push.
          this.incrementTotalLikes(recipeName)
        }
        else { // create this user in the db (first like!)
          ref.push(recipeName)
          this.incrementTotalLikes(recipeName)
        }
      })
    })
  }

  decrementTotalLikes = (recipeName) => {
    let ref = Firebase.database().ref('/' + recipeName)
    ref.transaction((current_value) => {
      return (current_value || 0) - 1
    })
  }

  incrementTotalLikes = (recipeName) => {
    let ref = Firebase.database().ref('/' + recipeName)
    ref.transaction((current_value) => {
      return (current_value || 0) + 1
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
            <Route exact path="/" component={() => (
              <Home recipes={this.state.recipes} 
                urlify={this.urlify}
                changeLike={this.changeLike}
              />
            )}/>
            <Route path="/faq/" component={() => (<FAQ data={this.state.faq.fields} />)}/>
            <Route path="/submit/" component={Submit}/>
            {this.state.recipes.map(({fields}, i) =>
              <Route path={"/" + this.urlify(fields.name) + "/"}
                key={this.urlify(fields.name)}
                component={() => (
                <Recipe recipe={fields} 
                  urlify={this.urlify} 
                  changeLike={this.changeLike}
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