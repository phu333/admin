import { Menu, Layout } from 'antd';
import { PageHeader, Avatar, Dropdown, Space,Row,Col,Divider } from 'antd';
import React, { Component } from 'react';
import { Badge } from 'antd';
import { UserOutlined, DownOutlined,CloseCircleTwoTone , BellOutlined,FormOutlined, LogoutOutlined,ExclamationCircleTwoTone,CheckCircleTwoTone  } from "@ant-design/icons";
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
                <Menu  >
                    <Divider orientation="left"  style={{ fontSize: '15px' }} >Chưa coi </Divider >
                        <Menu.Item  style={{whiteSpace: 'normal', height: '100px',width:'300px'}} >
                            <Row wrap >
                                <Col span={6}><CheckCircleTwoTone  style={{ fontSize: '30px', color: '#blue' }}  /></Col>
                                    <Col  span={14}><h5><b>anh@gmail.com</b> đã chấp nhận mẫu hợp đồng của bạn</h5></Col>
                             </Row>
                            <Row><h5 style={{color:"green"}}>ngày 20 tháng 12 năm 2020</h5></Row>
                        </Menu.Item>    <Menu.Divider />
    
                    <Divider orientation="left" style={{ fontSize: '15px' }}>Đã coi </Divider >
    
                         <Menu.Item  style={{whiteSpace: 'normal', height: '100px',width:'300px',backgroundColor:"lightgrey"}} >
                            <Row wrap >
                                <Col span={6}><FormOutlined  style={{ fontSize: '30px', color: '#08c' }}  /></Col>
                                <Col  span={14}><h5><b>anh@gmail.com</b> đã yêu cầu bạn tạo mẫu hợp đồng</h5></Col>
                            </Row>
                            <Row><h5 style={{color:"blue"}}>ngày 20 tháng 12 năm 2020</h5></Row>
                        </Menu.Item>    <Menu.Divider />

                        <Menu.Item  style={{whiteSpace: 'normal', height: '100px',width:'300px',backgroundColor:"lightgrey"}} >
                            <Row wrap >
                                <Col span={6}><CloseCircleTwoTone   twoToneColor='red'  style={{ fontSize: '30px',  }}  /></Col>
                                <Col  span={14}><h5><b>anh@gmail.com</b> đã Từ chối yêu cầu của bạn</h5></Col>
                            </Row>
                            < Row><h5 style={{color:"blue"}}>ngày 20 tháng 12 năm 2020</h5></Row>
                        </Menu.Item>    <Menu.Divider />    
                        <Menu.Item  style={{whiteSpace: 'normal', height: '100px',width:'300px',backgroundColor:"lightgrey"}} >
                            <Row wrap >
                                <Col span={6}><ExclamationCircleTwoTone twoToneColor="orange"  style={{ fontSize: '30px' }}  /></Col>
                                <Col  span={14}><h5><b>anh@gmail.com</b> đã yêu cầu bạn kiểm tra mẫu hợp đồng</h5></Col>
                            </Row>
                            <Row><h5 style={{color:"blue"}}>ngày 20 tháng 12 năm 2020</h5></Row>
                        </Menu.Item>    <Menu.Divider />
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
                style={{backgroundColor:'rgb(8, 59, 102)'}}
                title={[
                ]}
                extra={[
                    <Space  direction="horizontal" size="large" >
                        <b style={{color:'white'}}>Xin chào admin Hisign</b>
                    <Dropdown style={{flexGrow: 0,maxHeight: 50,overflow: "auto"}} overlay={notifications}  placement="bottomCenter" >{/* trigger={['click']} */}
                    <Badge count={1}><BellOutlined style={{ fontSize: '20px', color: 'whitesmoke' }} /></Badge>
                    </Dropdown>
                    <Space direction="horizontal" size="small" >
                    <Avatar size={30} icon={<UserOutlined />} />
                    <Dropdown overlay={menu} trigger={['click']}>
                    <h style={{color:'white'}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
