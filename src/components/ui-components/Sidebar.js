import React,{Component} from 'react';
import  '../../assets/sidebar.css';

import ReusableTabs from './ReusableTabs'


export default class Sidebar extends Component 
  {

    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this)
    }


    toggleClass(){
     $("#wrapper").toggleClass("toggled");
    }



    render () {
    return (
      <div>
      <div id="wrapper">

        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        Start Bootstrap
                    </a>
                </li>
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#">Shortcuts</a>
                </li>
                <li>
                    <a href="#">Overview</a>
                </li>
                <li>
                    <a href="#">Events</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>
        <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Simple Sidebar</h1>
                        <ReusableTabs />
                    </div>
                </div>
            </div>
        </div>

    </div>
      </div>
    )
  }
}

