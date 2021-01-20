import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Form, Input, Button, Card, Col, Row } from 'antd';

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
<Card style={{ height: "100vh", backgroundColor: 'rgb(8, 59, 102)' }}>
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <br />
                    <br />
            <Row type="flex" justify="center" align="middle" >

                <Col span={10} >

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        hideRequiredMark
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >
                        <Form.Item
                            label={<label style={{ color: "White" }}>Địa chỉ Email</label>}
                            name="email"
                            rules={[
                                {
                                    required: true,

                                    message: <label style={{ backgroundColor: "White" }}>Vui lòng nhập email</label>,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>





                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Tạo
                            </Button>

                        </Form.Item>

                    </Form></Col></Row></Card>
        );
    }

}


export default ForgetPassword;