import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import Home from '../components/Home/';
import AuthDemo from '../components/AuthDemo/';
import App404Component from '../components/App404Component/';
import { hot } from 'react-hot-loader/root';



function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          {/* this.state.authed is replaced by auth logic */}
          {/* <PrivateRoute authed={this.state.authed} path='/authdemo' component={AuthDemo} /> */}
          {/* in order to make a route private */}

          <PrivateRoute authed={false} path='/authdemo' component={AuthDemo} />

        </Switch>
    </Router>
  );
}



export default hot(Routes)
