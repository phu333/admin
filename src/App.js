import React from 'react';

import './App.css';
import LoginPage from './JsPage/views/LoginPage'

import Particles from 'react-particles-js';
import { Tabs, Result, Button } from 'antd';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Offline, Online } from "react-detect-offline";
const { TabPane } = Tabs;
class App extends React.Component {
  state = {
    currentTab: "Login",
    showTab: true
  }
  changeTab = activeKey => {
    console.log(activeKey);
    this.setState({
      currentTab: activeKey,

    });
  };
  render() {
    console.log(this.props.myLoginReducer)
    // var information = this.props.myLoginReducer.map((login, index) => {
    //   this.setState({
    //     showTab:false
    //   })

    // })
    // console.log(JSON.parse(reactLocalStorage.get('login', true)))
    return (
      <div >
        <Online><Particles
          style={{ position: "absolute" }}
          height="95%"
          width="95%"
          params={{
            particles: {
              color: {
                value: "#000000"
              },
              line_linked: {
                color: {
                  value: "#000000"
                }
              },
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            }
          }}
        />
          <Router>
            
             
                  <Redirect push to={"/admin/" + this.state.currentTab} />

                  <Route exact path="/admin/Login" component={LoginPage} />
                
               


            {/* {information} */}
          </Router></Online>
        <Offline><Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Back Home</Button>}
        /></Offline>





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
