import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { PageHeader, Avatar, Descriptions, Space, Tag, Affix, Button } from 'antd';
import React from 'react';
import { Badge } from 'antd';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import { UserOutlined, ToolOutlined, NotificationOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import CompanyTable from './CompanyTable'
import ContractTable from './ContractTable'
import Header from './Header'
import { createFromIconfontCN } from '@ant-design/icons';
import { connect } from 'react-redux'
import "../Column.css"
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const permission = [
  'signPermission',
  'contractManagePermision',
  'customerManagePermission',
  'contractTypeManagePermission',
  'employeeManagePermission',
  'signatureManagePermission',
  'editCompanyInformationPermission',];
class EmployeeSideMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      showComponent: "companys",
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
  //     <Redirect push to="/capstone/SideMenu" />

  //     <Route exact path="/capstone/SideMenu" component={EmployeeSideMenu} />
  //   </Router>);
  // }
  render() {



    if (this.props.myLoginReducer !== "logout") {

      var information = this.props.myLoginReducer.map((login, index) => {
        return (

          <Layout style={{ height: "100vh" }}>

            <Layout style={{ height: "100vh" }}>

              <Sider width={250} className="site-layout-background"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={() => this.setState({
                  collapsed: !this.state.collapsed
                })}
                style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "sticky",
                  top: 0,
                  left: 0
                }}
              >

                <IconFont type="icon-javascript" style={{ fontSize: '60px', color: '#08c', marginLeft: "40%" }} />


                <Menu
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <SubMenu key="sub1" icon={<ToolOutlined />} title="Quản lý">
                  {permission.includes('customerManagePermission') ?
                          <Menu.Item key="companys">danh sách công ty</Menu.Item>
                  : null}
                  {permission.includes('customerManagePermission') ?
                          <Menu.Item key="companys">danh sách công ty</Menu.Item>
                  : null}






                  </SubMenu>
                  <SubMenu key="sub2" icon={<UserOutlined />} title="Thông tin cá nhân">


                    <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>

                  </SubMenu>
                  {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                  </Button> */}
                </Menu>

              </Sider>
              <Layout style={{ padding: "0 24px 24px", height: "110vh" }}>
                <Affix >

                  <Header></Header>
                </Affix>









                {this.state.showComponent === "companys" ?
                  <Router>
                    <Redirect push to={"/admin/" + this.state.showComponent} />
                    <Route exact path="/admin/companys" component={CompanyTable} />
                  </Router>
                  : null}

                {this.state.showComponent === "users" ?
                  <Router>
                    <Redirect push to={"/admin/" + this.state.showComponent} />
                    <Route exact path="/admin/users/" component={ContractTable} />
                  </Router>
                  : null}




              </Layout>
            </Layout>
          </Layout>
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