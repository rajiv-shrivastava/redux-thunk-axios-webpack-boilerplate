import React,{Component} from 'react';
import {Link} from  'react-router';
import ReusableTabs from './ReusableTabs'
export default class Header extends Component
{

constructor(props) {
  super(props);
  this.state = {
    activeTab: "1"
  }
  this.handleSelect = this.handleSelect.bind(this)
}
  
handleSelect(selectedKey) {
    this.setState({
      activeTab: selectedKey.toString()
    })
 } 
 
render () {
    return (
      <div>
       <nav className="navbar  navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">React Redux Thunk</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
          </ul>
        </div>
       </nav>
      </div>
    )
  }
}

