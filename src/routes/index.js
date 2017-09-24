import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './../containers/App';


export const routes = (
  <div>
    <Route component={App}>
      <Route path="/" >
        <IndexRoute component={App}/>
      </Route>
    </Route>
</div>
 
)
