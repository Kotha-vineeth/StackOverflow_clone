import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { render } from "react-dom";
import { legacy_createStore as createStore,applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers'


const store = createStore( Reducers, compose(applyMiddleware(thunk)));
/*
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
*/
render(<><Provider store={store}><App /></Provider></>, document.getElementById("root"));


