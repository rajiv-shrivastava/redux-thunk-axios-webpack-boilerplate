import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import Demo from '../components/Demo'
import Navigationbar from '../components/Navigationbar'


export const routes = (
  <div>
        <Route path="/" component={App}>
            <Route component={Navigationbar}>
              <IndexRoute component = {Demo} />
              <Route path="/Demo" component = {Demo} />
            </Route>
        </Route>
    
</div>
 
)

