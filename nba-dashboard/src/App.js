import logo from './logo.svg';
import './App.css';
import Homepage from './components/homepage';
import Teams from './components/teams';
import Players from './components/players';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';


function App() {
  return (
    <Router>
      {/* <li>
        <Link to="/about">About</Link>
      </li> */}
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Homepage /> }
        />
        <Route
          path="/teams"
          exact
          render={(props) => <Teams /> }
        />
        <Route
          path="/players"
          exact
          render={(props) => <Players /> }
        />

        <Route render={()=> <Redirect to="/" />} />
      </Switch>
    </Router>  
  );
}

export default App;
