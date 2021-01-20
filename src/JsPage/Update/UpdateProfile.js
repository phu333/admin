import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'
import axios from 'axios'
import { Space, Card, Button, Descriptions,Select, Avatar, Form, Input, Popover, Row, Col, message } from 'antd';
import {
    QuestionCircleOutlined, UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'

import "../Column.css"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

const layout = {
    labelCol: {
        span: 6,

    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const name = (

    <p>Mật khẩu được đặt 8-12 ký tự</p>

);
const ValidationLName = (

    <p>Tên nhân viên</p>

);
const ValidationFName = (

    <p>Họ  nhân viên</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationPhone = (

    <p>Số điện thoại </p>

); const ValidationEmail = (

    <p>Địa chỉ email</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

);

class UpdateProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false,
            Account: {},
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        this.setState({
            isEdit: !this.state.isEdit
        })




    };
    onEdit = (values) => {
        this.setState({
            isEdit: !this.state.isEdit
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    componentWillMount(){
        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {
                console.log(data)

            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
    }
    render() {
        console.log(this.props.myLoginReducer)
        var information = this.props.myLoginReducer.map((login, index) => {
            return (

                <React.Fragment>

                    <h2 style={{ textAlign: 'center' }}>Thông tin cá nhân</h2>
                    <Space direction="horizontal" align="start"  >


                        <Card style={{ width: 400, minHeight: 100 }}>
                            <Row gutter={8}>
                                <Col flex={2}> <Avatar size={100} icon={<UserOutlined />} /> </Col>
                                <Col flex={3}>  <br />
                                    <b >Người dùng: </b>{login.username}<br />

                                    <b>Email: </b>{login.email}<br />
                                    <b >Chức vụ: </b>{login.role}
                                </Col>
                            </Row>
                        </Card>

                        <Card style={{ width: 600, height: 600 }}>
                            <Form
                                {...layout}
                                name="basic"
                                className="employee-form"
                                hideRequiredMark
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >

                                <Form.Item
                                    label=" tên"
                                    name="firstName"
                                    rules={[

                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên ',
                                        },
                                    ]}
                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled placeholder="Tên" /> </Col>    <Popover content={ValidationLName} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> : <Row gutter={8}> <Col span={20}><Input placeholder="Tên" /> </Col>    <Popover content={ValidationLName} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item>
                                <Form.Item
                                    label="Họ "
                                    name="lastName"
                                    rules={[

                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ ',
                                        },
                                    ]}
                                >
                                    {this.state.isEdit === false ? <Row gutter={8}> <Col span={20}><Input disabled placeholder="Họ" /> </Col>    <Popover content={ValidationFName} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> : <Row gutter={8}> <Col span={20}><Input placeholder="Họ" /> </Col>    <Popover content={ValidationFName} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                                </Form.Item>
                                {/* <Form.Item
                                    label="Tên người dùng"
                                    name="username"
                                    required
                                ><Row gutter={8}> <Col span={20}><Input disabled defaultValue="Ak95" /></Col>    <Popover content={name} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                                </Form.Item> */}

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    required
                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}>  <Input.Password disabled defaultValue="123" /> </Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}>  <Input.Password defaultValue="123" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}

                                </Form.Item>
                                {this.state.isEdit === false ?
                                   <p></p>: <Form.Item
                                        label="Xác nhận mật khẩu"
                                        name="Cpassword"
                                        required
                                    >
                                        <Row gutter={8}> <Col span={20}>  <Input.Password defaultValue="123" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>
                                    </Form.Item> }


                                <Form.Item
                                    label="Điện thoại"
                                    name="phone"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue="123123" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue="123123" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item>


                                {/* <Form.Item
                                    label="Địa chỉ"
                                    name="address"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue="12/3/4" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue="12/3/4" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item> */}
                                <Form.Item
                                    label="Email"
                                    name="email"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue={login.email} /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue={login.email} /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item>
                                <Form.Item
                                    label="Chức vụ"
                                    name="role"
                                    required
                                >

                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}>
                                            {login.role === 2 ? <Input disabled defaultValue="giám đốc" /> :
                                                <Input disabled defaultValue="nhân viên" />}
                                        </Col>    <Popover content={ValidationRole} trigger="hover">
                                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                            </Popover></Row>
                                        : <Row gutter={8}> <Col span={20}>
                                            <Select>
                                                <Select.Option value={2}>giám đốc</Select.Option>
                                                <Select.Option value={3}>nhân viên</Select.Option>
                                            </Select></Col>    <Popover content={ValidationRole} trigger="hover">
                                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                            </Popover></Row>
                                    }</Form.Item>



                                <Form.Item {...tailLayout}>
                                    <Space size="large">
                                        {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                            Tạo
                            </Button> : null}
                                        {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                            Reset
                            </Button> : null}

                                        {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                            Sửa
                            </Button> : null}


                                    </Space>
                                </Form.Item>
               -                 <Form.Item>

                                </Form.Item>




                            </Form>

                        </Card>









                    </Space>
                </React.Fragment >
            );
        })
        if (this.props.myLoginReducer === "Logout") {


        } else {
            return (<div style={{ height: "100vh" }}> {information}</div >);
        }
    }
}
var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(UpdateProfile);