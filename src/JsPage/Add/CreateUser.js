import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Form, Checkbox, Button, Row, Col,message } from 'antd';
import { CloudUploadOutlined,ReloadOutlined } from "@ant-design/icons"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormControlLabel';
import Popup from 'reactjs-popup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./Column.css"
import 'reactjs-popup/dist/index.css';
import LoginPage from '../Login/LoginPage'
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


class SendJoinRequest extends React.Component {

    constructor() {
        super();

        this.state = {
            finish: false,
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        this.setState({
            finish: true,
        })




    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {

        if (this.state.finish) {
            return (<LoginPage />);
        } else {
            var i = 0;
            function onChange(e) {
                if (e.target == "checked") { i--; }
                else { i++ }
                console.log(`checked = ${e.target.checked}`);
            }
            function requirement() { if (i == 0) { } }
            return (

                <React.Fragment>
                    <br/>
                    <h2 style={{ textAlign: 'center' }}>Tạo người dùng</h2>
                    <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                        <Col span={10} >
                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="company"
                                        name="Tên doanh nghiệp"
                                        label="Tên doanh nghiệp"
                                        fullWidth
                                        autoComplete="Tên doanh nghiệp"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="taxCode"
                                        name="Mã số thuế"
                                        label="Mã số thuế"
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="faxCode"
                                        name="số fax"
                                        label="số fax"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                    <TextField
                                        id="email"
                                        name="địa chỉ mail"
                                        label="địa chỉ mail"
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address"
                                        name="địa chỉ"
                                        label="địa chỉ"
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                    />
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="presentor"
                                        name="Người đại diện"
                                        label="Người đại diện"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <b>Quyền Hạn</b>
                                    <br />
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox onChange={onChange}>Ký</Checkbox>
                                            <p></p>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox onChange={onChange}>Quản lý hợp đồng</Checkbox>
                                            <p></p>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox onChange={onChange}>Quản lý nhân viên</Checkbox>
                                            <p></p>
                                        </Col>                               
                                                 <Col span={8}>
                                            <Checkbox onChange={onChange}>Quản lý loại hợp đồng</Checkbox>
                                            <p></p>  
                                            </Col>   
                                                                                 <Col span={8}>
                                            <Checkbox onChange={onChange}>Quản lý chữ ký</Checkbox>
                                            <p></p>
                                            </Col>
                                    </Row>
                                </Grid>

                            </Grid>
                            <div></div><br />
                            <Grid item xs={12} sm={6}>
                                <Popup trigger={<Button type="primary" >
                                <CloudUploadOutlined />  Tạo
                            </Button>} position="right center">
                                    <div>The sytem admin will contact you within 3 days</div>
                                    <Button onClick={this.onFinish} type="primary" >
                                        Xác nhận
                            </Button>
                                </Popup>

                                <Button type="primary" style={{
                                    margin: '0 8px',
                                }} htmlType="button">
                                 <ReloadOutlined />   Reset
                            </Button>
                            </Grid>
                        </Col>
                    </Row>
                </React.Fragment >
            );
        }
    }
}


export default SendJoinRequest;