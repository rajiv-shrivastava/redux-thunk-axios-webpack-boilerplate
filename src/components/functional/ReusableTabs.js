import React,{Component} from 'react';
import {Link} from  'react-router';
import Demo from '../../Demo'
import Demo2 from '../../Demo2'

import {Nav,NavItem,MenuItem} from 'react-bootstrap'

export default class ReusableTabs extends Component
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
      
     <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
        <NavItem eventKey="1" href=""> <Link to="/Demo"> demo  </Link></NavItem>
        <NavItem eventKey="2" title="Item"><Link to="/Demo2"> demo 2 </Link></NavItem>
        <NavItem eventKey="3">NavItem 3 content</NavItem>
      </Nav>

    )
  }
}

