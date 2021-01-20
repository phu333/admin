//chua xong
import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { Breadcrumb, Avatar, Descriptions, Space, Tag, Affix, Button } from 'antd';
import React from 'react';
import { Badge } from 'antd';
import AddCompany from './AddCompany'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Chart from './ChartProfile'
import { UserOutlined, ToolOutlined, NotificationOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ContractTable from './ContractTable'
import CompanyTable from './CompanyTable'
import UpdateProfile from '../Update/UpdateProfile'
import UpdateProfileCompany from '../Update/UpdateProfileCompany'

import Header from './Header'
import { createFromIconfontCN } from '@ant-design/icons';
import { connect } from 'react-redux'
import "../Column.css"
import FadeIn from 'react-fade-in'
import logo from '../logo/Capture.PNG'
import { addLogin, login } from '../actions/loginAction'

import axios from 'axios'
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class EmployeeSideMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      showComponent: "Chart",
      collapsed: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick = e => {

    this.setState({
      showComponent: e.key
    })

  };
  // componentDidMount() {
  //   return (<Router>
  //     <Redirect push to="/admin/SideMenu" />

  //     <Route exact path="/admin/SideMenu" component={EmployeeSideMenu} />
  //   </Router>);
  // }
  render() {



    if (this.props.myLoginReducer !== "logout") {

      var information = this.props.myLoginReducer.map((login, index) => {
        return (
          <FadeIn>

            <Layout style={{ minHeight: "130vh" }}>


              <Sider width={250} className="site-layout-background"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={() => this.setState({
                  collapsed: !this.state.collapsed
                })}
                style={{
                  overflow: "auto",
                  minHeight: "92vh",
                  position: "sticky",
                  top: 0,
                  left: 0
                }}
              >

                <img src={logo} type="icon-javascript" style={{ height: '100px', width: '100%', fontSize: '60px', color: '#08c' }} />


                <Menu
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <SubMenu key="sub1" icon={<ToolOutlined />} title="Quản lý">
                    {login.companyId !== null ? <>
                      <Menu.Item active={true} key="Chart">Doanh thu</Menu.Item>
                      {login.customerManagePermission === true ?
                        <Menu.Item key="Company">danh sách công ty</Menu.Item>
                        : null}
                      {login.contractManagePermision === true ?
                        <Menu.Item key="Contract">danh sách hợp đồng</Menu.Item>
                        : null} </> :
                      <Menu.Item key="addCompany" name="Tạo doanh nghiệp">Tạo doanh nghiệp</Menu.Item>}






                  </SubMenu>
                  <SubMenu key="sub2" icon={<UserOutlined />} title="Thông tin cá nhân">

                    {login.companyId !== null ? <>
                      {login.editCompanyInformationPermission === true ? <Menu.Item key="companyProfile">Thông tin công ty</Menu.Item> : null} </> : null}
                    <Menu.Item key="profile" >Thông tin cá nhân</Menu.Item>

                  </SubMenu>
                  {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
</Button> */}
                </Menu>

              </Sider>
              <Layout style={{ minHeight: "100vh" }}>
                <Affix >

                  <Header></Header>
                </Affix>
                <Breadcrumb style={{ margin: '26px ', fontSize: '20px' }}>
                  <Breadcrumb.Item>{login.companyId !== null ?
                    <>{this.state.showComponent === "Company" ? "Danh sách khách hàng" : null}
                      {this.state.showComponent === "Chart" ? "Doanh thu" : null}
                      {this.state.showComponent === "contractType" ? "Danh sách loại hợp đồng" : null}
                      {this.state.showComponent === "Contract" ? "Danh sách hợp đồng" : null}
                      {this.state.showComponent === "profile" ? "Thông tin cá nhân" : null}
                    </> : this.state.showComponent === "addCompany" ? "Tạo doanh nghiệp" : null}

                  </Breadcrumb.Item>
                </Breadcrumb>



                <Content style={{
                  padding: 24,
                  margin: 0,
                  minHeight: "100vh",
                  maxHeight: "100%",

                }}>
                  {login.companyId !== null ? <>
                    {this.state.showComponent === "Company" ?
                      <Router>
                        <Redirect push to={"/admin/" + this.state.showComponent} />
                        <Route exact path="/admin/Company" render={() => <CompanyTable token={login.jwToken} role={login.role} />} />
                      </Router>
                      : null}

                    {this.state.showComponent === "Contract" ?
                      <Router>
                        <Redirect push to={"/admin/" + this.state.showComponent} />
                        <Route exact path="/admin/Contract/" render={() => <ContractTable token={login.jwToken} role={login.role} />} />
                      </Router>
                      : null}
                    {this.state.showComponent === "profile" ?
                      <Router>
                        <Redirect push to={"/admin/" + this.state.showComponent} />
                        <Route exact path="/admin/profile/" render={() => <UpdateProfile token={login.jwToken} role={login.role} />} />
                      </Router>
                      : null}
                    {this.state.showComponent === "companyProfile" ?
                      <Router>
                        <Redirect push to={"/admin/" + this.state.showComponent} />
                        <Route exact path="/admin/companyProfile/" render={() => <UpdateProfileCompany token={login.jwToken} role={login.role} />} />
                      </Router>
                      : null}
                    {this.state.showComponent === "Chart" ?
                      <Router>
                        <Redirect push to={"/admin/" + this.state.showComponent} />
                        <Route exact path="/admin/Chart/" render={() => <Chart token={login.jwToken} role={login.role} />} />
                      </Router> : null}
                  </> :

                    <Router>
                      <Redirect push to={"/capstone/addCompany"} />
                      <Route exact path="/capstone/companyProfile" render={() => <AddCompany token={login.jwToken} role={login.role} />} /></Router>
                  }
                </Content>


              </Layout>
            </Layout>
          </FadeIn>
        );
      })

      if (this.props.myLoginReducer === "Logout") {


      } else {
        return (<div style={{ height: "100vh" }}> {information}</div >);
      }
    } else {

    }


  }
}
var mapStateToProps = state => {
  console.log(state.myLoginReducer)
  return {
    myLoginReducer: state.myLoginReducer
  }
}
export default connect(mapStateToProps, null)(EmployeeSideMenu);
