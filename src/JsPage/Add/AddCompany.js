import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import '../../index.css';
import axios from 'axios'
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
const name = (

    <p>Nên để họ tên thật</p>

);


const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class AddCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    
    onFinish = (values) => {
        console.log( values);
        axios({
            url: '/api/v1/company',
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
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    

    render() {



        return (


            <Card>
                    <br />
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                


                  
                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >
                        
                            <Form.Item
                                label="Tên doanh nghiệp"
                                name="name"
                                required
                            >
                                <Row gutter={8}> <Col span={20}><Input   defaultValue="HiSign" /></Col>    <Popover content={name} trigger="hover">
                                    <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="taxCode"
                                required
                            >
                                    <Row gutter={8}> <Col span={20}><Input   defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> 
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phoneNumber"

                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                required
                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="12/10/4/8" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"

                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Email" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="businessLicense"
                                required
                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankAccount"

                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="comRepresentative"
                                required
                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Nguyen Van A" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>



                            <Form.Item
                                label="Chức vụ"
                                name="comRepresentativeRole"
                                required
                            >
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
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
                            <Form.Item>

                            </Form.Item>




                       

                   </Form>
            </Card>


        );
    }
}



export default AddCompany;
