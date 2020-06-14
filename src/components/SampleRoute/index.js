import React,{Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './sampleRoute.css'

export default class SampleRoute extends Component {
  render(){
    return(
              <h2> I am sample route Component</h2>
      )
  }
}
