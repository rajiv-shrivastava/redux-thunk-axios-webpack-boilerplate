import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {routes} from './routes/index'
import {hashHistory} from 'react-router'

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
        <Router history={hashHistory}>
          {routes}
        </Router>
      </Provider>
    )
  }
})
