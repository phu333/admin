import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Popover, Row, Space, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import FadeIn from 'react-fade-in';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import '../../index.css';
import "../Column.css";
import LoginPage from '../views/LoginPage';

const { TextArea } = Input;

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
const ValidationCompany = (

    <p>Tên công ty được in trên hợp đồng nên để tên dưới 250 ký tự</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationFPresentor = (

    <p>Tên người đại diện cho công ty </p>

);
const ValidationLPresentor = (

    <p>Họ người đại diện cho công ty </p>

); const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

); const ValidationCmt = (

    <p>Số chứng minh thư của người đại diện do nhà nước cấp</p>

); const ValidationEmail = (

    <p>Địa chỉ email của google</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty nhập dưới 10 ký tự</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

); const ValidationPhone = (

    <p>Số điện thoại công ty dưới 10 ký tự</p>

); const ValidationPass = (

    <p>Vui lòng nhập password với it nhất 6 ký tự có chữ hoa chữ thường số và ký tự đặc biệt</p>

); const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty</p>

);


class AddUserAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false
        };
        this.onFinish = this.onFinish.bind(this);

    }
    onFinish = (values) => {
        console.log(values);
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: values
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {
                this.setState({
                    finish: true
                })
                message.success("Đăng ký thành công")


            })
            .catch(error => {
                console.log(error)
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")
            });


    };

    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        if (this.state.finish) {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/admin/Login"} />

                    <Route exact path="/admin/Login" component={LoginPage} />
                </Router></FadeIn>
            );
        } else {
            return (
                <Card style={{ backgroundColor: 'rgb(8, 59, 102)' }}>
                <br />
                <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
          </Button>
                <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin Admin</h2>

                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"
                    hideRequiredMark

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <div style={{ backgroundColor: 'whitesmoke' }}>
                        <br />
                        <Row gutter={2}>
                            <Col span={12} >
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Họ </label>}
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ',
                                        },

                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input placeholder="Tên" /></Col>    <Popover content={ValidationLPresentor} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>


                                </Form.Item>
                            </Col><Col span={12}>
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Tên</label>}
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên ',
                                        },

                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input placeholder="Tên" /></Col>    <Popover content={ValidationFPresentor} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>                    </Form.Item>

                            </Col></Row>
                        <Row gutter={2}>
                            <Col span={12} >
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Chứng minh nhân dân</label>}
                                    name="userId"
                                    rules={[

                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Chứng minh nhân dân ',
                                            min: 10,
                                            max: 10,
                                        },
                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input type="number" placeholder="Chứng minh nhân dân" /> </Col>    <Popover content={ValidationCmt} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>

                                </Form.Item>

                            </Col><Col span={12}>
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Chức vụ</label>}
                                    name="userRole"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Chức vụ',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Select.Option value={2}>giám đốc</Select.Option>
                                        <Select.Option value={3}>nhân viên</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col></Row>

                        <Row gutter={2}>
                            <Col span={12} >
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Mật khẩu</label>}
                                    name="password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',

                                        },
                                        {

                                            message: 'Vui lòng nhập dưới 6 kí tự',
                                            min: 6,
                                        }, {
                                            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                                            message: "Xin hãy nhập có ít nhất 1 ký tự hoa,1 ký tự thường,1 số, 1 dấu đặc biệt"
                                        }
                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input.Password /></Col>    <Popover content={ValidationPass} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>
                                </Form.Item>
                            </Col><Col span={12}>
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Xác nhận mật khẩu</label>}
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('Vui lòng nhập lại Mật khẩu');
                                            },
                                        }),
                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input.Password /></Col>    <Popover content={ValidationPass} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>

                                </Form.Item>
                            </Col></Row>
                        <Row gutter={2}>
                            <Col span={12} >
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Email</label>}
                                    name="email"
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
                                    <Row gutter={8}> <Col span={22}><Input placeholder="Email" /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>

                                </Form.Item>
                            </Col><Col span={12}>
                                <Form.Item
                                    label={<label style={{ color: "blue" }}>Điện thoại</label>}
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập sdt',
                                            min: 10,
                                            max: 10,
                                        },
                                    ]}
                                >
                                    <Row gutter={8}> <Col span={22}><Input type="number" prefix="+84" placeholder="Điện thoại" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                    </Popover></Row>
                                </Form.Item></Col></Row>
                    </div>
                    <br />
                    <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin công ty</h2>
                    <div style={{ backgroundColor: 'whitesmoke' }} >

                        <br />
                        <Form.Item
                            label={<label style={{ color: "blue" }}>Tên doanh nghiệp</label>}
                            name="companyName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên ',
                                },
                                {
                                    max: 50,
                                    message: 'Vui lòng không nhập quá 50 ký tự'
                                }
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><TextArea autoSize /></Col>
                                <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                                </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label={<label style={{ color: "blue" }}>Mã số thuế</label>}
                            name="taxCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mst ',

                                },

                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationTax} trigger="hover">
                                <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label={<label style={{ color: "blue" }}>Giấy phép kinh doanh</label>}
                            name="businessLicense"
                            required
                        >
                            <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label={<label style={{ color: "blue" }}>Tài khoản ngân hàng</label>}
                            name="bankAccount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Số tài khoản',

                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationBank} trigger="hover">
                                <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                            </Popover></Row>
                        </Form.Item>

                        <Form.Item
                            label={<label style={{ color: "blue" }}>Địa chỉ</label>}
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Địa chỉ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Địa chỉ" /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white', verticalAlign: 'center' }} />} />
                            </Popover></Row>
                        </Form.Item>
                    </div>
                    <Form.Item {...tailLayout}>
                        <Space size="large">
                            <Button type="primary" htmlType="submit" >
                                Tạo
                            </Button>
                            <Button type="primary" htmlType="reset" >
                                Xóa dữ liệu đã nhập                                </Button>


                        </Space>
                    </Form.Item>


                </Form>

            </Card >

            );
        }
    }
}

export default AddUserAdmin;