import axios from 'axios'
import { Table, Button, Tag, message, Space } from 'antd';
import ContractSearch from '../Search/ContractSearch'
import { FolderViewOutlined, UploadOutlined, DownloadOutlined, FileAddOutlined, ContainerOutlined } from "@ant-design/icons"
import AddContractExtension from './AddContractExtension'
import UpdateContractExtension from '../Update/UpdateContractExtension'
import ViewContractPage from '../Update/ViewContractPage'
import React from 'react';
import { createcontractExtension, contractExtensionInformation } from '../actions/ContractExtension'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import "../Column.css"
const { Column } = Table;
var hash = require('object-hash')
class ContractExtensionTable extends React.Component {
    constructor() {
        super();

        this.state = {
            showCreateContractExtension: false,
            showContractExtension: false,
            contract: {},
            contractsCreate: [],
            contractsReciceve: [],
            contractsTotal: [],
            ompany: {},
            finish: false,
            loading: false,
        };

        this.onOpenCreateContractExtension = this.onOpenCreateContractExtension.bind(this);
        this.viewContractExtension = this.viewContractExtension.bind(this);
        this.Donwload = this.Donwload.bind(this);
        this.onFinish = this.onFinish.bind(this)
    }
    onFinish() {
        this.setState({
            finish: true
        })
    }
    componentDidMount() {

        this.setState({
            loading: true
        })
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
                this.setState({
                    company: data.data
                })
                console.log(data.data.taxCode)
                axios({
                    url: '/api/v1/Contract/get-by-taxcode?taxCode=' + data.data.taxCode,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,

                    }
                })
                    .then((response) => {

                        return response.data;
                    })
                    .then((data) => {
                        console.log(data)
                        this.setState({
                            contractsReciceve: data.data.filter(values => values.statusAsString !== "Draft")
                        })
                        axios({
                            url: '/api/v1/Contract',
                            method: "GET",
                            headers: {
                                Authorization: 'Bearer ' + this.props.token,

                            }
                        })
                            .then((response) => {

                                return response.data;
                            })
                            .then((data) => {
                                console.log(data)
                                this.setState({
                                    contractsCreate: data.data,

                                })
                                this.setState({

                                    contractsTotal: [...this.state.contractsCreate, ...this.state.contractsReciceve].filter(values => values.isMainContract !== true)
                                })

                                for (let i = 0; i < this.state.contractsTotal.length; i++) {
                                    axios({
                                        url: '/api/v1/Company/info/guest?id=' + this.state.contractsTotal[i].companyId,
                                        method: "PUT",


                                    })
                                        .then((response) => {

                                            return response.data;
                                        })
                                        .then((data) => {

                                            this.state.contractsTotal[i]['ASide'] = data.data.name




                                        })
                                        .catch(error => {
                                            console.log(error)


                                        });
                                }

                                setTimeout(function () {
                                    this.setState({
                                        loading: false,
                                        contractsTotal: [...this.state.contractsTotal]
                                    })
                                    this.props.onSubmit(this.state.contractsTotal)
                                }.bind(this), 5000)

                            })

                            .catch(error => {


                            });
                    })

                    .catch(error => {


                    });

            })
            .catch(error => {
                console.log(error)


            });
    }
    onOpenCreateContractExtension() {
        this.setState({
            showCreateContractExtension: true
        })

    }
    viewContractExtension() {
        this.setState({
            showContractExtension: true
        })
    }
    Donwload(text) {
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
            if (text.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + text.id,
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
                        fileDownload(response.data, text.id + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(text.fileUrl, "_blank")

            }
        } else {

        }
    }

    render() {

        if (this.state.showCreateContractExtension) {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/admin/viewContract/" + hash.sha1(this.props.contract.id) + "/createExtension"} />
                    <Route exact path="/admin/viewContract/:id/createExtension" render={() => <AddContractExtension token={this.props.token} contractId={this.props.contractId} contract={this.props.contract} role={this.props.role} />
                    } /></Router></FadeIn>


            );
        } else if (this.state.showContractExtension) {
            return (<FadeIn>

                <Router>
                    <Redirect push to={"/admin/viewContract/" + hash.sha1(this.props.contract.id) + "/updateExtension" + hash.sha1(this.state.contract.id)} />
                    <Route exact path="/admin/viewContract/:id/updateExtension/:exId" render={() => <UpdateContractExtension ismycontract={this.props.ismycontract} token={this.props.token} contractId={this.props.contractId} contractEx={this.state.contract} contract={this.props.contract} role={this.props.role} />
                    } /></Router></FadeIn>
            );
        } else if (this.state.finish) {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/admin/viewContract/" + hash.sha1(this.state.contract.id)} />
                    <Route exact path="/admin/viewContract/:id" render={() => <ViewContractPage contract={this.props.contract} token={this.props.token} role={this.props.role} />
                    } /></Router></FadeIn>

            );
        }
        else {
             
            return (<FadeIn>
                <div >
                    {this.props.ismycontract ? <Space size="large">
                        <Button type="primary" icon={<FileAddOutlined />} onClick={this.onOpenCreateContractExtension}>Tạo hợp đồng</Button>
                        <Button type="primary" icon={<UploadOutlined />} >Tải lên hợp đồng</Button>
                    </Space> : null}

                    <ContractSearch token={this.props.token} contractList={this.state.contractsTotal} />
                    <Table dataSource={this.props.newContract}
                        
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="Stt" key="Index"

                            render={(text, record, index) => index+1}
                        />
                        <Column title="Tên hợp đồng" dataIndex="contractTitle" key="contractTitle"
                            render={(text, record) => (

                                <a>{text}</a>

                            )}
                        />

                        <Column title="Bên A" dataIndex="ASide" key="ASide"
                            render={(text, record) => (

                                <p>{text}</p>

                            )} />
                        <Column title="Bên B" dataIndex="customer" key="customer"
                            render={(text, record) => (

                                <p>{text.companyName}</p>

                            )} />
                        {/* <Column title="Chủ hợp đồng" dataIndex="customer" key="customer"
                            render={(text, record) => (

                                <p>{text.CreatorcompanyName}</p>

                            )} /> */}
                        {/* <Column title="Ngày hết hạn" dataIndex="contractExpiredDate" key="contractExpiredDate"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <p>{text}</p>

                            )} /> */}
                        {/* <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                            render={(text, record) => (

                                <p>{text}</p>

                            )} /> */}
                        <Column title="Giá trị hợp đồng" dataIndex="contractValue" key="contractValue"
                            align='right'
                            render={(text, record) => `${text} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                        />
                        <Column title="Trạng thái" dataIndex="statusAsString" key="statusAsString"
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => {
                                let color = 'pink'
                                if (text === 'Deactive') {
                                    color = 'red'
                                } else if (text === 'Active') {
                                    color = 'green'
                                } else if (text === 'Draft') {
                                    color = 'blue'
                                } else if (text === 'waiting for customer') {
                                    color = 'pink'
                                } else if (text === 'Hiệu lực') {
                                    color = 'green'
                                } else if (text === 'Vô hiệu hóa') {
                                    color = 'red'
                                } else if (text === 'Chờ bên ta ký') {
                                    color = 'blue'
                                } else if (text === 'Chờ đối tác ký') {
                                    color = 'blue'
                                } else if (text === 'Hoàn thành') {
                                    color = 'yellow'
                                }
                                return (<Tag color={color} key={text}>
                                    {text.toUpperCase()}
                                </Tag>);
                            }}
                        />
                        <Column
                            title="Chi tiết"
                            key="action"
                            align="center"
                            render={(text, record) => (

                                <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        contract: text,
                                        showContractExtension: true
                                    })
                                } />

                            )}
                        />
                        {/* <Column
                            title="Vô hiệu hóa"
                            key="action"
                            render={(text, record) => (

                                <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.viewContract} />

                            )}
                        /> */}
                        <Column
                            title="Tải về"
                            key="action"
                            align="center"
                            render={(text, record) => (

                                <DownloadOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.Donwload(text)
                                } />

                            )}
                        />

                    </Table></div ></FadeIn>

            );
        }

    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contractExtension) => {
            dispatch(createcontractExtension(contractExtension))
        }
    }
}
var mapStateToProps = state => {


    return {
        newContractExtension: state.myContractExtensionReducer
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(ContractExtensionTable)