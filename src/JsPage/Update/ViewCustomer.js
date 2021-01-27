import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import axios from 'axios'
import { Form, Input, Button, message, Card, Space,Popover,Row,Col } from 'antd';
import {
    QuestionCircleOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCustomer } from '../actions/CustomerAction';
import CustomerTable from '../views/CompanyTable'
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
        offset: 8,
        span: 10,
    },
};
const ValidationCompany = (

    <p>Tên công ty khách hàng sẽ được in trên hợp đồng</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty khách hàng sẽ được in trên hợp đồng</p>

); const ValidationPresentor = (

    <p>Người đại diện cho công ty khách</p>

); const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

); const ValidationEmail = (

    <p>Địa chỉ email của khách </p>

); const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng </p>

); const ValidationRole = (

    <p>Chức vụ trong của người đại diện công ty khách</p>

); const ValidationPhone = (

    <p>Số điện thoại công ty khách trong khoảng 10 ký tự</p>

); const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty khách</p>

);

class ViewCustomer extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Customer/' + this.props.customer.id,
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
                message.success("thông tin chỉnh sửa thành công")
                this.setState({
                    isEdit: false
                })
            })

            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

            });





    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChangeS(index, info) {
        if (info == "0") { info = 1 }
        else { info = 0 }
        let Status = {
            enabled: info
        }
        axios({
            url: '/api/v1/Customer/' + index + '/change-status',
            data: Status,
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
                message.success("Trạng thái đã được cập nhật")

            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

            });

    }
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        console.log(this.props.customer)
        var ButtonFix = this.props.myLoginReducer.map((login, index) => {
            return (
                <div> {
                    login.UpdateCustomer === true ? <div>
                        {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                            Sửa
            </Button> : null}</div>
                        : null
                }</div>)
        })
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/admin/customerList"} />
                <Route exact path="/admin/customerList" render={() => <CustomerTable token={this.props.token} role={this.props.role} />
                } />
            </Router>);
        }
        else {
            return (
                <Card>
                    <br />
                    <span ><Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Button style={{ width: '80px' }} textAlign="right" type="primary" onChange={() => this.handleChangeS(this.props.customer.id, this.props.customer.status)}  >{"something" + this.props.customer.status + ""} </Button>
                    </span>
                    <h2 style={{ textAlign: 'center' }}>Thông tin khách hàng</h2>

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
                                }, {

                                    message: 'Vui lòng nhập dưới 250 ký tự',
                                    max: 250,
                                }
                            ]}
                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><TextArea autoSize disabled defaultValue={this.props.customer.name} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><TextArea autoSize defaultValue={this.props.customer.name} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
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
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.taxCode} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.taxCode} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
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
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.businessLicense} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.businessLicense} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
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
                                    min: 6,
                                    max: 10,
                                },
                            ]}
                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.phoneNumber} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.phoneNumber} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
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
                                    max: 250,
                                },
                            ]}
                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.address} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}> <Input defaultValue={this.props.customer.address} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Email"
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
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.email} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.email} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Số tài khoản"
                            name="bankAccount"
                            rules={[
                                {

                                    message: 'Vui lòng nhập 8 ký tự cuối',
                                    min: 8,
                                    max: 8,
                                },
                            ]}
                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.bankAccount} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.bankAccount} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Người đại diện"
                            name="presentore"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập người đại diện',

                                }, {

                                    message: 'Vui lòng nhập dưới 50 ký tự',
                                    max: 50,
                                },]}
                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.Presentor} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row> :
                                <Row gutter={8}> <Col span={20}>  <Input defaultValue={this.props.customer.Presentor} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>}
                        </Form.Item>
                        {/* <Form.Item
                        label="Chức vụ"
                        name="role"
                        
                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="Giám đốc" /> :
                            <Input defaultValue="Giám đốc" />}
                    </Form.Item> */}




                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sửa
                            </Button> : null}
                                {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                    Xóa dữ liệu đã nhập                                </Button> : null}
                                {ButtonFix}



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
        onSubmit: (token) => {
            dispatch(updateCustomer(token))
        }
    }
}
var mapStateToProps = state => {

    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomer);