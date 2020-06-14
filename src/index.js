import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

let store = configureStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
