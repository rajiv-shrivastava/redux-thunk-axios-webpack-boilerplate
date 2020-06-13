import React,{Component} from 'react';
import {Link} from  'react-router';

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
        <h1> i am header </h1>
      </div>
    )
  }
}

