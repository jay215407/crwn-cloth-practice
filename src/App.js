import React from 'react';
import HomePage from '../src/pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';

import './App.css';

const HatsPage = () => {
  return (
    <div>
      <h1>HATS</h1>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/hats" component={HatsPage} />
      </Switch>
      
      {/* <HomePage />       */}
    </div>
  );
}

export default App;
