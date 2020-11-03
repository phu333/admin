import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import UserTable from './UserTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Form, Input, Button, Space,Card } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};

class ViewUser extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false,
            finish: false,
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);
        this.setState({
            isEdit: false
        })



    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };


    render() {



        if (this.state.finish) {
            return ( <Router>
                <Redirect push to={"/admin/users" } />
                <Route exact path="/admin/users" component={UserTable} />
              </Router>);
        } else {
            return (

                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Thông tin nhân viên</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"

                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >

                        <Form.Item
                            label="Họ và tên"

                            name="name"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="Nguyen Van A" /> :
                                <Input defaultValue="Nguyen Van A" />}


                        </Form.Item>
                        <Form.Item
                            label="Tên người dùng"
                            name="username"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="Ak47" /> :
                                <Input defaultValue="Ak47" />}
                        </Form.Item>


                        <Form.Item
                            label="Điện thoại"
                            name="phone"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="3242424" /> :
                                <Input defaultValue="3242424" />}
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="12/3/6/8" /> :
                                <Input defaultValue="12/3/6/8" />}
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="Email"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="Some email" /> :
                                <Input defaultValue="Some email" />}
                        </Form.Item>
                        <Form.Item
                            label="Chức vụ"
                            name="role"

                        >
                            {this.state.isEdit === false ?
                                <Input disabled defaultValue="Some email" /> :
                                <Input defaultValue="Some email" />}
                        </Form.Item>
                        {/* <Form.Item {...middleLayout} name="signPermission" valuePropName="unchecked" >
                            {this.state.isEdit === false ? <Checkbox disabled>Quyền ký</Checkbox> : <Checkbox >Quyền ký</Checkbox>}


                        </Form.Item>
                        <Form.Item {...middleLayout} name="employeePermission" valuePropName="checked" >

                            {this.state.isEdit === false ? <Checkbox disabled >Quyền quản lý nhân viên</Checkbox> : <Checkbox>Quyền quản lý nhân viên</Checkbox>}
                        </Form.Item>
                        <Form.Item {...middleLayout} name="contractPermission" valuePropName="checked" >

                            {this.state.isEdit === false ? <Checkbox disabled >Quyền quản lý hợp đồng(Bao gồm quyền quản lý loại hợp đồng)</Checkbox> : <Checkbox>Quyền quản lý hợp đồng(Bao gồm quyền quản lý loại hợp đồng)</Checkbox>}
                        </Form.Item>
                        <Form.Item {...middleLayout} name="customerPermission" valuePropName="checked" >

                            {this.state.isEdit === false ? <Checkbox disabled >Quyền quản lý khách hàng</Checkbox> : <Checkbox>Quyền quản lý khách hàng</Checkbox>}
                        </Form.Item>
                        <Form.Item {...middleLayout} name="companyInfoPermission" valuePropName="unchecked" >

                            {this.state.isEdit === false ? <Checkbox disabled >Quyền chỉnh sửa thông tin doanh nghiệp</Checkbox> : <Checkbox>Quyền chỉnh sửa thông tin doanh nghiệp</Checkbox>}
                        </Form.Item> */}



                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                    Nộp
                                </Button> : null}
                                {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                    Reset
                                </Button> : null}

                                {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                    Sửa
                                </Button> : null}


                            </Space>
                        </Form.Item>
                        <Form.Item>

                        </Form.Item>




                    </Form>




                </Card >
            );
        }

    }
}

export default ViewUser;