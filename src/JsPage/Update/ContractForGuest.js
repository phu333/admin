import { Button, Card, DatePicker, Descriptions, Form, Input, Select, Space, Table } from 'antd';
import axios from 'axios';
import JoditEditor from "jodit-react";
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const { Option } = Select;


class ContractForGuest extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [

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


            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
            currentPage: 1,
            creator: "",
            isEdit: false,
            company: {},
            BSide: {
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
            customers: [],
            validSignature: false,
            contract:{},
        };

        this.OpenExtension = this.OpenExtension.bind(this)

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    onEditorStateChange(editorState) {
        console.log(editorState)
        this.setState({
            editorState: editorState,
        });
    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    componentDidMount() {
        axios({
            url: '/api/v1/Contract/'+this.props.match.params.id,
            method: "GET",

        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                  contract:data.data
                })


            })
            .catch(error => {
                console.log(error)


            });


        axios({
            url: '/api/v1/Contract/a-side-info',
            method: "GET",

            params: {
                id: this.props.match.params.id,
            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    creator: data.companyId
                })

                


            })
            .catch(error => {
                console.log(error)


            });


    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    OpenExtension() {
        this.setState({
            openExtension: true
        })
    }
    OpenCommentSection() {
        this.setState({
            openCommentSection: true
        })
    }
    onFinish = () => {

        console.log(this.state.customers[0].taxCode)
        if (this.state.company.id !== undefined) {
            axios({
                url: "https://localhost:44338/api/Signature/PostContract",
                method: "POST",
                data: {
                    Info: this.state.company.taxCode,

                }
            })
                .then((response) => {


                })
                .then((data) => {

                })
                .catch(error => {
                    console.log(error)


                });
            if (this.props.contract.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + this.props.contract.id,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',

                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, this.props.contract.id + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(this.props.contract.fileUrl, "_blank")
                // axios({
                //     url: this.props.contract.fileUrl,
                //     method: "GET",
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.token,
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/docx'
                //     },
                //     responseType: 'arraybuffer',

                // })
                //     .then((response) => {

                //         return response.data;
                //     })
                //     .then((data) => {
                //         console.log(data.data)

                //     })
                //     .catch(error => {
                //         console.log(error)


                //     });
            }
        } else {
            axios({
                url: "https://localhost:44338/api/Signature/PostContract",
                method: "POST",
                data: {
                    Info: this.state.customers[0].taxCode,

                }
            })
                .then((response) => {


                })
                .then((data) => {

                })
                .catch(error => {
                    console.log(error)


                });
            if (this.props.contract.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + this.props.contract.id,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',

                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, this.props.contract.id + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(this.props.contract.fileUrl, "_blank")
                // axios({
                //     url: this.props.contract.fileUrl,
                //     method: "GET",
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.token,
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/docx'
                //     },
                //     responseType: 'arraybuffer',

                // })
                //     .then((response) => {

                //         return response.data;
                //     })
                //     .then((data) => {
                //         console.log(data.data)

                //     })
                //     .catch(error => {
                //         console.log(error)


                //     });
            }
        }




    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {


        console.log(this.state.customers)

        const aside = this.state.customers.map(customer => (
            <Descriptions title="" size="small" column={2} title="Thông tin bên A"

            >

                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                    {customer.name}
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{customer.address}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{customer.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{customer.email}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{customer.businessLicense}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{customer.taxCode}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{customer.bankAccount}</Descriptions.Item>
                {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{customer.name}</Descriptions.Item>

                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                    làm đại diện
                        </Descriptions.Item>


            </Descriptions>
        ))
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar: false
        }




        return (

            <div style={{ height: "100vh", fontSize: 14 }}>
                <Button type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
                            </Button>

                <Space direction="vertical" align="center" >

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                        <Card bordered={false} >
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                            <br />
                            <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>{this.state.contract.contractName}</h2>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số {this.state.contract.contractNum}</h6>
                            <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                    tại {this.state.contract.contractPlace}, chúng tôi gồm
                            </h6>
                        </Card>

                        <Card>
                            {aside}
                            {/* <Descriptions size="small" column={2} title={"Thông tin bên B"}  >
                                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.company.name}
                                </Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                               
                                <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                    Giám đốc làm đại diện
                    </Descriptions.Item>


                            </Descriptions> */}



                        </Card>


                    </Space>
                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                    <h6 style={{ fontSize: 14 }}> Giá trị hợp đồng:{this.state.contract.contractValue}</h6>
                        <JoditEditor

                            value={this.state.contract.contractContent}
                            config={config}
                            tabIndex={1} // tabIndex of textarea


                        />
                    </Space>
                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                        <Card>

                            <Form

                                name="basic"
                                className="lcontract-form"

                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                             {this.state.contract.contractExpiredDate}
                                </h6>
                                <Space size="large">


                                    <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Tải về
                                                    </Button>



                                    <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Reject
                                                        </Button>
                                </Space>
                            </Form>

                        </Card>
                    </Space>
                </Space>
            </div>

        );
    }
}







export default ContractForGuest