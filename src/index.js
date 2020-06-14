import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

let store = configureStore()

ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('app'));
