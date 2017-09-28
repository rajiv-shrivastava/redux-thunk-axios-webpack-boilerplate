import React,{Component} from 'react';
import {Link} from  'react-router';

export default class Tabsdash extends Component
{

 
  render () {
    return (
      <div>
         Tab Dash

         <Link to="/Demo2"> UI </Link>

         <div> {this.props.children} </div>
      </div>


    )
  }
}

