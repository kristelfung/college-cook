import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as contentful from 'contentful';
import Home from './Home';
import FAQ from './FAQ';
import Submit from './Submit';
import Recipe from './Recipe';
import Firebase from 'firebase';
import logo from './images/logo.svg';
import "./scss/styles.scss";

class CollegeCook extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    this.state = {
      recipes: [],
      faq: {},
      userlikes: {},
      totallikes: {},
      loading: true
    }
  }

  client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
  })

  componentDidMount() {
    this.fetchPosts().then(this.setPosts)
    this.getTotalLikes()  // get total likes
    this.startSession()  // create instance of user session w/ their likes!
  }

  componentWillUnmount() {
    // fetch previous user data + compare to curr data to update globals
    const uid = Firebase.auth().currentUser.uid
    const ref = Firebase.database().ref('users/' + uid)

    // update user likes in Firebase
  }

  testing = () => {
    // fetch previous user data + compare to curr data to update globals
    const uid = Firebase.auth().currentUser.uid
    const ref = Firebase.database().ref('users/' + uid)
    ref.once('value').then(snapshot => {
      if (snapshot.exists()) { // if user has previously liked items...
        // minus all previous session likes from global to "reset"
        for (const key in snapshot.val()) {
          const currRecipe = snapshot.val()[key]
          const globalRef = Firebase.database().ref('/' + currRecipe)
          globalRef.transaction((current_value) => {
            return (current_value || 0) - 1
          })
        }
        // add all local likes to global
        for (const currRecipe in this.state.userlikes) {
          const globalRef = Firebase.database().ref('/' + currRecipe)
          globalRef.transaction((current_value) => {
            return (current_value || 0) + 1
          })
        }
        // update user's personal likes (first delete all, then push)
        console.log(snapshot.val())
      }
      else if (Object.entries(this.state.userlikes).length >= 0) { // new user
        for (const key in this.state.userlikes) {
          ref.push(key)
          let globalRef = Firebase.database().ref('/' + key)
          globalRef.transaction((current_value) => {
            return (current_value || 0) + 1
          })
        }
      }// do nothing if user hasn't liked anything
    })
    // update user likes in Firebase
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
    ref.once('value').then(snapshot => {
      const totallikes = snapshot.val() // [recipeName]: num of likes
      this.setState({
        totallikes,
        loading: false
      })
    })
  }

  // getTotalLikes = () => {
  //   const ref = Firebase.database().ref('/')
  //   ref.once('value').then(snapshot => {
  //     const likesDictionary = snapshot.val() // dict. [recipeName]: num of likes
  //     const newRecipes = this.state.recipes
  //     for (let i = 0; i < this.state.recipes.length; i++) {
  //       const recipeName = this.urlify(this.state.recipes[i].fields.name)
  //       if (likesDictionary[recipeName]) { // if recipe has likes
  //         newRecipes[i].fields['likes'] = likesDictionary[recipeName]
  //       } 
  //       else { // recipe has no likes
  //         newRecipes[i].fields['likes'] = 0
  //       }
  //     }
  //     this.setState({
  //       recipes: newRecipes
  //     })
  //   })
  // }

  startSession = () => {
    // start the session
    Firebase.auth().signInAnonymously().catch((err) => {
      console.log(err.name + err.message)
    })
    Firebase.auth().onAuthStateChanged(user => {
      try {
        Firebase.database().ref('users/' + user.uid).once('value').then(snapshot => {
          if (snapshot.exists()) {
            this.getUserLikes(user.uid) 
          }
        })
      } catch (e) {}
    })
  }

  getUserLikes = (uid) => {
    // get current user likes and store in state
    const ref = Firebase.database().ref('users/' + uid)
    const userlikes = {}
    ref.once('value').then(snapshot => {
      const snapshotDict = snapshot.val()
      for (const key in snapshotDict) {
        userlikes[snapshotDict[key]] = 1
      }
    })
    this.setState({
      userlikes
    })
  }

  changeLike = (recipeName) => {
    if (recipeName in this.state.userlikes) {
      const userlikes = this.state.userlikes
      delete userlikes[recipeName]
      const totallikes = this.state.totallikes
      totallikes[recipeName] = totallikes[recipeName] - 1
      this.setState({
        totallikes,
        userlikes
      })
    }
    else {
      const userlikes = this.state.userlikes
      userlikes[recipeName] = 1
      const totallikes = this.state.totallikes
      totallikes[recipeName] = totallikes[recipeName] + 1
      this.setState({
        totallikes,
        userlikes
      })
    }
  }

  // changeLike = (recipeName) => {
  //   // modify current session
  //   Firebase.auth().onAuthStateChanged((user) => {
  //     const ref = Firebase.database().ref('users/' + user.uid)
  //     ref.once('value').then(snapshot => {
  //       if (snapshot.exists()) { // if user has likes already!
  //         for (const [key, value] of Object.entries(snapshot.val())) {
  //           if (recipeName === value) {
  //             ref.child(key).remove()
  //             this.decrementTotalLikes(recipeName)
  //             // change state
  //             const newLikes = this.state.userlikes
  //             delete newLikes[recipeName]
  //             this.setState({
  //               userlikes: newLikes
  //             })
  //             return
  //           }
  //         }
  //       }
  //       // if not found in user likes, push!
  //       ref.push(recipeName)
  //       this.incrementTotalLikes(recipeName)
  //       // change state
  //       const newLikes = this.state.userlikes
  //       newLikes[recipeName] = 1
  //       this.setState({
  //         userlikes: newLikes
  //       })
  //     })
  //   })
  // }

  // decrementTotalLikes = (recipeName) => {
  //   let ref = Firebase.database().ref('/' + recipeName)
  //   ref.transaction((current_value) => {
  //     return (current_value || 0) - 1
  //   })
  // }

  // incrementTotalLikes = (recipeName) => {
  //   let ref = Firebase.database().ref('/' + recipeName)
  //   ref.transaction((current_value) => {
  //     return (current_value || 0) + 1
  //   })
  // }
  
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
            <Route exact path="/" component={() => (
              <Home recipes={this.state.recipes} 
                userlikes={this.state.userlikes}
                urlify={this.urlify}
                changeLike={this.changeLike}
                totallikes={this.state.totallikes}
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
                  liked={this.urlify(fields.name) in this.state.userlikes}
                  totallikes={this.state.totallikes[this.urlify(fields.name)]}
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