import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import axios from 'axios'
import { Form, Input, Button, message, Card, Space } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCustomer } from '../actions/CustomerAction';
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
        return (
            <Card>
                <br />
                <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Thông tin khách hàng</h2>

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

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.name} /> :
                            <Input defaultValue={this.props.customer.name} />}
                    </Form.Item>
                    <Form.Item
                        label="Mã số thuế"
                        name="taxCode"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.taxCode} /> :
                            <Input defaultValue={this.props.customer.taxCode} />}
                    </Form.Item>

                    <Form.Item
                        label="Giấy phép kinh doanh"
                        name="businessLicense"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.businessLicense} /> :
                            <Input defaultValue={this.props.customer.businessLicense} />}
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phoneNumber"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.phoneNumber} /> :
                            <Input defaultValue={this.props.customer.phoneNumber} />}
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.address} /> :
                            <Input defaultValue={this.props.customer.address} />}
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.email} /> :
                            <Input defaultValue={this.props.customer.email} />}
                    </Form.Item>
                    <Form.Item
                        label="Số tài khoản"
                        name="bankAccount"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue={this.props.customer.bankAccount} /> :
                            <Input defaultValue={this.props.customer.bankAccount} />}
                    </Form.Item>
                    <Form.Item
                        label="Người đại diện"
                        name="role"

                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="Nguyen Van B" /> :
                            <Input defaultValue="Nguyen Van B" />}
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
                                Tạo
                            </Button> : null}
                            {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                Reset
                            </Button> : null}
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