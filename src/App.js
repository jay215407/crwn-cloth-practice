import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { addCollectionAndDocuments } from './firebase/firebase.utils'; to add data in firebase
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'; to add data in firebase


import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
        
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      //this.setState({currentUser: user})
      
      
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log(snapshot);
          setCurrentUser ({
             id: snapShot.id,
             ...snapShot.data()
            })
          });  
      } 
      
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=> ({title, items}))) to add data in firebase

    });
      
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  exact path="/checkout" component={CheckoutPage} />
          <Route  path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
  
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview  to add data in firebase
})


// const mapStateToProps = ({ user }) => {
//   return {
//     currentUser: user.currentUser
//   }
// }

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
