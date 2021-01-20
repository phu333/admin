import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd'
import vnVN from 'antd/lib/locale/vi_VN'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from "redux"
import allReducers from "./JsPage/reducers/myReducers"
import { BrowserRouter } from 'react-router-dom'
const store = createStore(allReducers)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={vnVN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
