import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div> <Home title={"Sample React redux webpack axios thunk and promise middleware"}/> </div>
  }
}

export default hot(App);
