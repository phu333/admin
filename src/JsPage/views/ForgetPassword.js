import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox,Col,Row } from 'antd';

const layout = {
    labelCol: {
        span: 6,
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

class ForgetPassword extends React.Component {
    constructor() {
        super();

        this.state = {

        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);



    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    render() {


        return (
            <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                <Col span={10} >
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                
            >
                <Form.Item
                    label="Địa chỉ Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

               



                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Nộp
                            </Button>
                    
                </Form.Item>

            </Form></Col></Row>
        );
    }

}


export default ForgetPassword;