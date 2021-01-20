import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'

import { MailOutlined, PrinterOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BankOutlined, ContactsOutlined } from '@ant-design/icons';
import { Card, Button, Space, Checkbox, Descriptions, Select, Form, Input, message } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FormBuilder } from 'react-formio';
import axios from 'axios'
import 'reactjs-popup/dist/index.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ContractTypeTable from '../Table/ContractTypeTable'
import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";
import e from 'cors';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;
class TemplateUpload extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        this.state = {
            contractContent: "",
            templateName: "",
            contractName: "",
            finish: false
        };

        this.rteChange = this.rteChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    rteChange = (value) => {
        console.log(value)
        this.setState({
            contractContent: value
        })

    }
    nameChange = (value) => {

        this.setState({
            contractName: value
        })
        console.log(this.state.contractName)
    }
    onFinish = (values) => {
        console.log(this.state.contractName)
        const template = {
            name: this.state.contractName,
            content: JSON.stringify(this.state.contractContent)
        }
        axios({
            url: '/api/v1/ContractType',
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: template
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



            });

    };
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={'/admin/contractType'} />
                    <Route exact path='/admin/contractType' render={() => <ContractTypeTable token={this.props.token} role={this.props.role} />
                    } /></Router>
            );
        } else {

            return (
                <div style={{ fontSize: 14 }} >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
      </Button>

                    <Space direction="vertical" align="center" >

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                            <Card bordered={false}>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />

                                <h1 style={{ textAlign: 'center', fontSize: 14 }}><Input
                                    onChange={(e) => { this.nameChange(e.target.value) }} style={{ width: "100px" }} size="small" /></h1>
                                <h6 style={{ textAlign: 'center', fontSize: 14, fontWeight: "bold" }}>Số.../...</h6>
                                <h6 style={{ fontSize: 14, fontWeight: "bold" }}>Hôm nay, ngày...tháng...năm....,
                                tại........, chúng tôi gồm
                            </h6>

                            </Card>

                            <Card bordered={false}>
                                <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                    <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>

                                    <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>

                                    <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                        ........làm đại diện
                                </Descriptions.Item>
                                </Descriptions>


                                <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                                >

                                    <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>

                                    <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>

                                    <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                        ........làm đại diện
                </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                            <JoditEditor


                                config={config}


                                onChange={this.rteChange}
                            />
                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                <Card bordered={false}>

                                    <Form

                                        name="basic"
                                        className="lcontract-form"

                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}

                                    >
                                        Giá trị hợp đồng:........
                                        
                                    <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                        ngày ... tháng ... năm ....
                            </h6>
                                        <Space size="large">

                                            <Button type="primary" htmlType="submit" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Tạo
                                                    </Button>

                                            <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Lưu
                                                    </Button>


                                        </Space>
                                    </Form>

                                </Card>
                            </Space>
                        </Space>

                    </Space>
                </div>
            );


        }
    }
}
var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(TemplateUpload)