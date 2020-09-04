import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import signInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component {

  constructor() {
    super();

    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      //this.setState({currentUser: user})
      
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log(snapshot);
          this.setState({
            currentUser: {
             id: snapShot.id,
             ...snapShot.data()
            }
          });
          console.log(this.state);
        });
        
      } 
      
      this.setState({ currentUser: userAuth});

    });

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  path="/signin" component={signInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
