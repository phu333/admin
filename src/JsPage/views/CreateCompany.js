import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Space, Card, message,Col,Popover } from 'antd';
import CustomerTable from '../Table/CustomerTable'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 8,
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
const names = (

    <p>Tên công ty đối tác nên để tên dưới 250 ký tự</p>

);
const ValidationCompany = (

    <p>Tên công ty khách hàng sẽ được in trên hợp đồng</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty khách hàng sẽ được in trên hợp đồng</p>

);const ValidationPresentor = (

    <p>Người đại diện cho công ty khách</p>

);const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

);const ValidationEmail = (

    <p>Địa chỉ email của khách </p>

);const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng </p>

);const ValidationRole = (

    <p>Chức vụ trong của người đại diện công ty khách</p>

);const ValidationPhone = (

    <p>Số điện thoại công ty khách trong khoảng 10 ký tự</p>

);const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty khách</p>

);
class CreateCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Company?Name=' + values.name,
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },


        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {

                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i]["name"] === values.name) {
                        values.id = data.data[i].id
                        axios({
                            url: '/api/v1/Customer',
                            method: "POST",
                            headers: {
                                Authorization: 'Bearer ' + this.props.token,

                            },
                            data: values
                        })
                            .then((response) => {

                                return response.data;
                            })
                            .then((data) => {

                                message.success("taọ thành công")

                                this.setState({
                                    finish: true
                                })
                            })
                            .catch(error => {

                                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

                            });
                        return true;
                    } else {
                        axios({
                            url: '/api/v1/Customer',
                            method: "POST",
                            headers: {
                                Authorization: 'Bearer ' + this.props.token,

                            },
                            data: values
                        })
                            .then((response) => {

                                return response.data;
                            })
                            .then((data) => {

                                message.success("tao thanh cong")
                                this.setState({
                                    finish: true
                                })

                            })
                            .catch(error => {

                                if (error.response.status === 500) {
                                    message.error(error.response.status + ' Server under maintainence');
                                } else if (error.response.status === 404) {
                                    message.error(error.response.status + ' Server not found');
                                }

                            });
                        return false;
                    }
                }

            })
            .catch(error => {

                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });



        // this.setState({
        //     finish: true
        // })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/customerList"} />
                <Route exact path="/capstone/customerList" render={() => <CustomerTable token={this.props.token} role={this.props.role} />
                } />
            </Router>);
        } else {


            return (
                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Thêm thông tin khách hàng</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"
                        hideRequiredMark
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >

                        <Form.Item
                            label="Tên doanh nghiệp"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên doanh nghiệp',
                                },
                            ]}>
                            <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Tên doanh nghiệp" /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Mã số thuế"
                            name="taxCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã số thuế',
                                },
                                {
                                    min: 10,
                                    max: 10,
                                    message: 'Vui lòng nhập 10 ký tự',
                                },

                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input type="number" placeholder="Mã số thuế" /> </Col>    <Popover content={ValidationTax} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>

                        <Form.Item
                            label="Giấy phép kinh doanh"
                            name="businessLicense"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giấy phép',
                                }, {
                                    min: 10,
                                    max: 10,
                                    message: 'Vui lòng nhập 10 ký tự',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input type="text" placeholder="Giấy phép kinh doanh" /> </Col>    <Popover content={ValidationCertificate} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                                {

                                    message: 'Vui lòng nhập 10 ký tự',
                                    min: 10,
                                    max: 10,
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}> <Input type="number" prefix="+84" placeholder="Điện thoại" /> </Col>    <Popover content={ValidationPhone} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',

                                }, {

                                    message: 'Vui lòng nhập dưới 100 ký tự',
                                    max: 100,
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Địa chỉ" /> </Col>    <Popover content={ValidationAdd} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Email',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Email" /> </Col>    <Popover content={ValidationEmail} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Số tài khoản"
                            name="bankAccount"
                            rules={[{

                                message: 'Vui lòng nhập 8 ký tự',
                                min: 8,
                                max: 8,
                            },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input type='number' placeholder="Số tài khoản" /> </Col>    <Popover content={ValidationBank} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Người đại diện"
                            name="representative"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Người đại diện',
                                },{

                                    message: 'Vui lòng nhập dưới 50 ký tự',
                                    max: 50,
                                }
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Người đại diện" /> </Col>    <Popover content={ValidationPresentor} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Chức vụ"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Chức vụ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Chức vụ" /> </Col>    <Popover content={ValidationRole} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>




                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Tạo
                                </Button>
                                <Button type="primary" htmlType="reset" className="login-form-button">
                                    Xóa dữ liệu đã nhập                                </Button>


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
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (customer) => {
            dispatch(createCustomer(customer))
        }
    }
}

export default connect(null, mapDispatchToProps)(CreateCompany);
