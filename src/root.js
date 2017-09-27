import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Route,Router, browserHistory} from 'react-router'
import {routes} from './routes/index'
import Navigationbar from './components/Navigationbar'


export default React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    devTools: PropTypes.bool
  },
  render () {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <Router routes={routes} history={browserHistory}>

      </Router>     
      </Provider>
    )
  }
})
