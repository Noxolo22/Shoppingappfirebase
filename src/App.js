import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/ui/header/Header'
import Home from './components/pages/home/Home'
import Shop from './components/pages/shop/Shop'
import LoginSignup from './components/pages/loginSignup/LoginSignup'
import './App.css'

import { auth, createUserProfileDocument } from './firebase/firebaseUtils'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
  }

  //Setting Logged in User from firebase to state
  unsubscribeFromAuth = null

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
            () => console.log(this.state)
          )
        })
      }
      this.setState({ currentUser: userAuth })
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' component={LoginSignup} />
        </Switch>
      </div>
    )
  }
}

export default App
