import React from 'react';
import { createContract, contractInformation, } from '../actions/ContractAction'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Form, Table, Input, Col, Card, message } from 'antd';
import { connect } from 'react-redux'
import ContractTable from '../views/ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import JoditEditor from 'jodit-react';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const options = [
    {
        value: 'Công ty tnhh Microsoft',
    },
    {
        value: 'Công ty tnvh google',
    },
    {
        value: 'Công ty cổ phần amazon',
    },
];

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
class CreateContract extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ "font": [] }],
                [{ "size": ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline"],
                [{ "list": "ordered" }, { "list": "bullet" }],
                [{ "align": [] }],
                [{ "color": [] }, { "background": [] }],
                ["clean"]
            ]
        };

        this.formats = [
            "font",
            "size",
            "bold", "italic", "underline",
            "list", "bullet",
            "align",
            "color", "background"
        ];
        this.state = {
            
            BSide: {
                id: 0,
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",

                BankAccount: "",
            },
            ASide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",

                BankAccount: "",
            },
            finish: false,
            contractNum: "",
            contractName: "",
            contractValue: 0,
            contractContent: "",
           
            contractTitle: "",
            contractPlace: "",
            contractExpiredDate: "",
            customers: [],
            company: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);

        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (value) => {
        this.setState({
            contractContent: value.replace(/"/g, "\'")
        })

    }
    componentDidMount() {
        // axios({
        //     url: '/api/v1/Company',
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Bearer ' + this.props.token,

        //     }
        // })
        //     .then((response) => {

        //         return response.data;
        //     })
        //     .then((data) => {
        //         console.log(data)
        //         this.setState({
        //             company: data.data,
        //         })


        //     })
        //     .catch(error => {
        //         console.log(error)
        //         if (error.response.status === 500) {
        //             message.error(error.response.status + ' Server under maintainence');
        //         } else if (error.response.status === 404) {
        //             message.error(error.response.status + ' Server not found');
        //         }

        //     });
        axios({
            url: "/api/v1/Customer",
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    customers: data.data,
                })


            })
            .catch(error => {
                console.log(error)


            });
        axios({
            url: "/api/v1/Company/info",
            method: "PUT",
            headers: {
                Authorization: "Bearer " + this.props.token,

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


            });

    }
    onFinish = (values) => {
        var header = "<p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'>Độ<u style='margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: baseline;'>c lập - Tự do - Hạnh ph</u>úc</span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: right;'><br></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>" + this.props.template.name + "</strong></span></p></br><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'>Số<span>&nbsp;</span>" + this.state.contractNum + "</h6><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Hôm nay, ngày 3 tháng 11 năm 2020, tại<span>&nbsp;</span>" + this.state.contractPlace + ", chúng tôi gồm</h6>"
        var aInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên A : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.phoneNumber + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.businessLicense + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.taxCode + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.bankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
        var bInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên B : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Phone + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.BusinessLicensce + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.MST + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.BankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Representative + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
        var value = "<p><strong style='margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Giá trị hợp đồng : (</strong><span style='color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>" + this.state.contractValue + "</span><strong style='margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>)</strong></p>"

        var footer = '<p>footer</p>'
        const contract = {
            contractTitle: this.props.template.name,
            contractNum: this.state.contractNum,
            contractName: this.props.template.name,
            contractPlace: this.state.contractPlace,
            contractExpiredDate: this.state.contractExpiredDate + 'T13:55:57.445Z',
            contractValue: this.state.contractValue,
            contractContent: this.state.contractContent,
            contractTypeId: this.props.template.id,
            customerId: this.state.BSide.id,
            header: header,
            aInformation: aInformation.replace(/"/g, "\'"),
            bInformation: bInformation.replace(/"/g, "\'"),
            value: value,
            contractLaw: this.state.contractContent,
            footer: footer,
            isMainContract:true,
        }
        console.log(contract)
        axios({
            url: "/api/v1/Contract",
            method: "POST",
            headers: {
                Authorization: "Bearer " + this.props.token,

            },
            data: contract
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                this.setState({
                    finish: true
                })
                message.success("tao thanh cong")

            })
            .catch(error => {
                message.error("vui long kiem tra thong tin va ket noi mang")
                console.log(error)

            });





    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value) {
        console.log(value);
        const company = JSON.parse(value)
        this.setState({
            BSide: {
                id: company.id,
                Name: company.name,
                MST: company.taxCode,
                Phone: company.phoneNumber,
                Address: company.address,
                Email: company.email,
                Representative: company.name,
                Position: 'giám đốc',
                BusinessLicensce: company.businessLicense,

                BankAccount: '123123123213',
            },
        })
    }
    handleValue(value) {
        console.log(value)
        this.setState({
            contractValue: parseFloat(value.target.value)
        })
    }
    render() {
        var today = new Date()
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }

        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={'/admin/contract'} />
                    <Route exact path='/admin/contract' render={() => <ContractTable token={this.props.token} role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div style={{ fontSize: 14, height: '100vh' }} >
                    <Button type='primary' value='cancel' onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Space direction='vertical' align='center' style={{ backgroundColor: 'white' }} >

                        <Space direction='vertical' align='center' style={{ backgroundColor: 'white' }}  >
                            <Card bordered={false} >
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{this.props.template.name}</h2>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số id/<Input style={{ width: '100px' }} size='small'
                                        onChange={(value) => {
                                            this.setState({
                                                contractNum: value.target.value
                                            })
                                        }} />
                                </h6>
                                <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                tại<Input style={{ width: '100px' }} size='small'
                                        onChange={(value) => {
                                            this.setState({
                                                contractPlace: value.target.value
                                            })
                                        }} />, chúng tôi gồm
                            </h6>
                            </Card>
                            <Card bordered={false}>
                                <Descriptions size='small' column={2} title={'Thông tin bên A'}  >
                                    <Descriptions.Item label={(<><b>{'Công ty/Tổ chức'}</b></>)}>{this.state.company.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ'}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Điện thoại'}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ Email'}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Giấy phép kinh doanh'}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Mã số thuế'}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Tài khoản số'}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{'Số Fax:'}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{'Do ông(bà)'}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{'Chức vụ'}</b></>)} span={2}>
                                        Giám đốc làm đại diện
                        </Descriptions.Item>


                                </Descriptions>


                                <Descriptions title='' size='small' column={2} title='Thông tin bên B'

                                >

                                    <Descriptions.Item label={(<><b>{'Công ty/Tổ chức'}</b></>)}>
                                        <Select
                                            showSearch
                                            style={{ width: 400 }}
                                            placeholder='chọn khách hàng'
                                            optionFilterProp='customer'
                                            onChange={this.handleChange}
                                            onSearch={this.handleChange}

                                        >
                                            {this.state.customers.map((customer) => (
                                                <Option value={JSON.stringify(customer)} >{customer.name}</Option>
                                            ))}
                                        </Select></Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ'}</b></>)}>{this.state.BSide.Address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Điện thoại'}</b></>)}>{this.state.BSide.Phone}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ Email'}</b></>)}>{this.state.BSide.Email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Giấy phép kinh doanh'}</b></>)}>{this.state.BSide.BusinessLicensce}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Mã số thuế'}</b></>)}>{this.state.BSide.MST}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Tài khoản số'}</b></>)}>{this.state.BSide.BankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{'Số Fax:'}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{'Do ông(bà):'}</b></>)} span={2}>{this.state.BSide.Representative}</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{'Chức vụ'}</b></>)} span={2}>
                                        {this.state.BSide.Position} làm đại diện
                        </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction='vertical' style={{ backgroundColor: 'white' }} >

                            <h6 style={{ fontSize: 16 }}>Chúng tôi thỏa thuận với các điều khoản sau
                            </h6>
                            <JoditEditor

                                value={this.props.template.content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea

                                onChange={this.rteChange}
                            />
                            <Space direction='vertical' align='center' style={{ backgroundColor: 'white' }} >
                                Giá trị hợp đồng:<input type="text" pattern="[0-9]*" prefix="VND"
                                    onInput={this.handleValue} /> x1000 VNĐ
                                <Card bordered={false}>

                                    <Form

                                        name='basic'
                                        className='contract-form'

                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}

                                    >

                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày(Sẽ hiển thị khi hợp đồng có hiệu lực) đến
                                        <input
                                                type="text"
                                                onChange={value => this.setState({
                                                    contractExpiredDate: value.target.value
                                                })}
                                            />
                                        </h6>
                                        <Space size='large'>

                                            <Button type='primary' htmlType='submit' value='Edit'>{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button>

                                            <Button type='primary' value='Edit'>{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
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
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contract) => {
            dispatch(createContract(contract))
        }
    }
}
export default connect(null, mapDispatchToProps)(CreateContract);