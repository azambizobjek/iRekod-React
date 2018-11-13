import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './store'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/seaTheme.css';
import './css/style.css';

import ViewPort from '../src/components/ViewPort';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ViewPort></ViewPort>
      </Provider>
    );
  }
}

export default App;
