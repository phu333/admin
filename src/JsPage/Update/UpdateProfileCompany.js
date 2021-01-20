import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import '../../index.css';




const layout = {
    labelCol: {
        span: 7,

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

); const ValidationPresentor = (

    <p>Người đại diện cho công ty </p>

); const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

); const ValidationEmail = (

    <p>Địa chỉ email của google</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty nhập dưới 10 ký tự</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

); const ValidationPhone = (

    <p>Số điện thoại công ty dưới 10 ký tự</p>

); const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ công ty có thể để trắng</p>

);


class UpdateProfileCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            isEdit: false,
            value: 'date',
            company: {},
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Company/' + this.state.company.id,
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: values
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {

            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });

        this.setState({
            finish: true
        })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })


    }; onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    componentDidMount() {
        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    company: data.data
                })
                console.log(this.state.company)
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
        console.log(this.state.company.name)
        const name = "hello"


        return (


            <React.Fragment>
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                <Space direction="horizontal" align="start"  >


                    <Card style={{ width: 1000, minHeight: 600 }}>

                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"
                            hideRequiredMark
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >
                            <Form.Item

                                name="id"
                                initialValue={this.state.company.id}
                            >

                            </Form.Item>
                            <Form.Item
                                label="Tên doanh nghiệp"
                                name="name"

                            >
                                {this.state.isEdit === false ?

                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.name} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.name} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="taxCode"
                                rules={[

                                    {

                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.taxCode} /></Col>    <Popover content={ValidationTax} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.taxCode} /></Col>    <Popover content={ValidationTax} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phoneNumber"
                                rules={[

                                    {

                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.phoneNumber} /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.phoneNumber} /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.address} /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.address} /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.email} /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.email} /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="businessLicense"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input type="number" disabled defaultValue={this.state.company.businessLicense} /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input type="number" defaultValue={this.state.company.businessLicense} /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankAccount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số tài khoản',

                                    }, {

                                        message: 'Vui lòng nhập 8 ký tự',
                                        min: 8,
                                        max: 8,
                                    },
                                ]}
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input type="number" disabled defaultValue={this.state.company.bankAccount} /></Col>    <Popover content={ValidationBank} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input type="number" defaultValue={this.state.company.bankAccount} /></Col>    <Popover content={ValidationBank} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="representaive"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.name} /></Col>    <Popover content={ValidationPresentor} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.name} /></Col>    <Popover content={ValidationPresentor} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>



                            {/* <Form.Item
                                label="Chức vụ"
                                name="role"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item> */}




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
                            <Form.Item>

                            </Form.Item>




                        </Form>

                    </Card></Space>
            </React.Fragment>


        );
    }
}



export default UpdateProfileCompany;
