import React,{Component} from 'react'
import {Route,IndexRoute} from 'react-router'
import App from '../containers/App'
import Demo from '../components/Demo'
import Demo2 from '../components/Demo2'


export const routes = (
	        <Route path="/" component={App}>
	              <IndexRoute component={Demo}/>
                  <Route path="/Demo" component = {Demo} />
                  <Route path="/Demo2" component = {Demo2} />
	        </Route>
	    

)

