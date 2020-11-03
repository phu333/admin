import { Menu, Layout } from 'antd';
import { PageHeader, Avatar, Dropdown, Space } from 'antd';
import React, { Component } from 'react';
import { Badge } from 'antd';
import { UserOutlined, DownOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import { logout, login } from '../actions/loginAction'



class Header extends Component {
    constructor() {
        super();

        this.state = {
            showComponent: "",
            logoutAction:false
        };

        this.Logout = this.Logout.bind(this);
    }
    Logout ()  {
        this.setState({
            logoutAction : true
        })
        this.props.onSubmit()
        
    }
    render() {
       

        var information = this.props.myLoginReducer.map((login, index) => {

            const notifications = (
                <Menu >

                    <Menu.Item  key="2" >
                       
                      Some notifications
             
                    </Menu.Item>
                   
    
                </Menu >
            );
            const menu = (
                <Menu >

                    <Menu.Item onClick={this.Logout} key="2" icon={ <LogoutOutlined style={{ color: '#08c' }} key="1" type="primary" />} > 
                       
                        Đăng xuất
             
                    </Menu.Item>
                   
    
                </Menu >
            );
        return (<div>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title={[
                ]}
                extra={[
                    <Space direction="horizontal" size="large" >
                        <b>Thời hạn còn lại của tài khoản : 25 ngày</b>
                    <Dropdown overlay={notifications} placement="bottomCenter" trigger={['click']}>
                    <Badge count={1}><BellOutlined style={{ fontSize: '20px', color: '#08c' }} /></Badge>
                    </Dropdown>
                    <Space direction="horizontal" size="small" >
                    <Avatar size={30} icon={<UserOutlined />} />
                    <Dropdown overlay={menu} trigger={['click']}>
                    <h className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {login.username} <DownOutlined />
                    </h>
                    </Dropdown>
                    </Space>
                    </Space>
                ]}
            >

            </PageHeader>
        </div>);
    })
    if(this.state.logoutAction){
        
    }else{
        return(<div> { information }</div >);
    }
    
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: () => {
            dispatch(logout())
        }
    }
}
var mapStateToProps = state => {
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default (connect(mapStateToProps, mapDispatchToProps))(Header);
