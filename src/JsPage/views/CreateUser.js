import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../actions/UserAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Space, Card } from 'antd';

import axios from 'axios'
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
class CreateUser extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false
        };
        this.onFinish = this.onFinish.bind(this);
        
    }
    onFinish = (values) => {
        console.log( values);
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: values
        })
            .then( (response)=> {

                return response.data.data;
            })
            .then( (data)=> {
      



            })
            .catch(error => {
                console.log(error)
            });


    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {

        return (
            <Card>
                <br />
                <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Tạo thông tin user</h2>

                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"

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
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        label="Họ "
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        label="cmnd/cmt"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập cmnd/cmt ',
                            },
                        ]}
                    >
                        <Input placeholder="cmnd/cmt" />
                    </Form.Item>
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người dùng',
                            },
                        ]}
                    >
                        <Input placeholder="tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Mật khẩu',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Mật khẩu',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="userPhone"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập sdt',
                            },
                        ]}
                    >
                        <Input placeholder="Điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="userAddress"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Địa chỉ',
                            },
                        ]}
                    >
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Email',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Chức vụ"
                        name="userRole"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Chức vụ',
                            },
                        ]}
                    >
                        <Input placeholder="Chức vụ" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space size="large">
                            <Button type="primary" htmlType="submit" >
                                Nộp
                                </Button>
                            <Button type="primary" htmlType="reset" >
                                Reset
                                </Button>


                        </Space>
                    </Form.Item>









                </Form>


            </Card >
        );
    }
}


export default CreateUser;