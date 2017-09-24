import React,{Component} from 'react';
import {Nav, NavItem } from 'react-bootstrap';
import {Link} from  'react-router';
import Demo from './Demo'

export default class Navigationbar extends Component
{
  
   handleSelect(selectedKey) {
   alert('selected ' + selectedKey);
 } 


 
  render () {
    return (
      <div>
      <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
        <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
        <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
        <NavItem eventKey={3} >NavItem 3 content</NavItem>
      </Nav>

      <Link to="/Demo"> Home </Link>

        <div className="content">
          {this.props.children}
        </div>


      </div>
    )
  }
}

