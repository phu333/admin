import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './App.css';
import LoginPage from './JsPage/views/LoginPage'

import { Tabs, Result, Button } from 'antd';
import FadeIn from 'react-fade-in'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ContractForGuest from './JsPage/Update/ContractForGuest'
import { Offline, Online } from "react-detect-offline";
const { TabPane } = Tabs;
class App extends React.Component {
 
  render() {
   
    return (
      <div >
        <FadeIn>
          {/* <Online> */}

            <Router>
             
                <Router>
                {window.location.href !="http://localhost:3000/admin/Contract/:id" ?
                <><Redirect exact from="/" to={"/admin/Login"} />

                <Route exact path="/admin/Login" component={LoginPage} /></>
                :<Route exact path="/admin/Contract/:id" component={ContractForGuest} />}
                  
                  
                </Router>

              {/* {information} */}
            </Router>
            {/* </Online> */}
          {/* <Offline><Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."

          /></Offline> */}

        </FadeIn>



      </div>
    );
  }
}
var mapStateToProps = state => {

  return {
    myLoginReducer: state.myLoginReducer
  }
}
export default connect(mapStateToProps, null)(App);
