import {
    ContainerOutlined, EyeOutlined, FileAddOutlined, FileExcelOutlined,
    FileProtectOutlined, FormOutlined, UploadOutlined
} from "@ant-design/icons";
import { Button, Popover, Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import ContractSearch from './ContractSearch';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

const { Column } = Table;



const dataSource = []
for (var i = 0; i < 100; i++) {

    const contract = {
        key: i,
        contract_type: 'Hop dong lao dong',
        status: ['pending', 'Received', 'Rejected', 'Signed'],
        ben_tao_hd: 'HiSign',
        ben_tham_gia: 'cty 369',
        nguoi_tao_hd: "Nguyen Ngoc Phu",
        deadline: "12/12/2022",
        color: "#fff"
    }
    dataSource.push(contract)




}

class ContractTable extends Component {
    constructor() {
        super();

        this.state = {
            showCreateContract: false,
            showContract: false,
            contract: {}
        };
        this.onOpenCreateContract = this.onOpenCreateContract.bind(this);
        this.viewContract = this.viewContract.bind(this);



    }
        onOpenCreateContract() {
        this.setState({
            showCreateContract: true
        })
    }
    viewContract() {

        this.setState({

            showContract: true
        })
    }
    render() {
        const content = (
            <div style={{display:"inline-block"}}>
               <span> <Button
                    title="Xem chi tiết"
                    key="action"
                    onClick={
                        () => this.setState({
                            
                            showContract: true
                        })
                    }
                ><EyeOutlined/> Xem chi tiết</Button></span>
                <span><Button
                    title="Vô hiệu hóa"
                    key="action"
                    onClick={this.viewContract}
                    
                ><FileExcelOutlined /> Vô hiệu hóa</Button></span>
                 <span><Button
                    title="Ký"
                    key="action"
                    onClick={this.viewContract}
                ><FormOutlined /> Ký</Button> 
</span>
            </div>
        );
        if (this.state.finish) {
            return ( <Router>
                <Redirect push to={"/admin/users" } />
                <Route exact path="/admin/users" component={ContractSearch} />
              </Router>);
        } else {
            return (
                <div style={{ height: "100vh" }}>
                    <Space size="large">
                        <Button type="primary" icon={<FileAddOutlined />} onClick={this.onOpenCreateContract}>Tạo hợp đồng</Button>
                        <Button type="primary" icon={<UploadOutlined />} >Tải lên hợp đồng</Button>
                    </Space>
                    <ContractSearch />
                    <Table dataSource={dataSource}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="Mã hợp đồng" dataIndex="id" key="id"
                            render={(text, record) => (
                                <a><FileProtectOutlined /> {text}</a>
                            )}
                        />
                        <Column title="tên hợp đồng" dataIndex="contract_name" key="contract_name"
                            render={(text, record) => (

                                <a><ContainerOutlined /> {text}</a>

                            )}
                        />

                        <Column title="bên đối tác" dataIndex="ben_tham_gia" key="ben_tham_gia"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="Ngày hết hạn" dataIndex="deadline" key="deadline"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="trạng thái" dataIndex="status" key="status"
                            sorter={(a, b) => a.status.localeCompare(b.status)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => {
                                let color = 'pink'
                                if (text === 'deactive') {
                                    color = 'red'
                                } else if (text === 'active') {
                                    color = 'green'
                                } else if (text === 'pending') {
                                    color = 'blue'
                                } else if (text === 'waiting for customer') {
                                    color = 'pink'
                                } else if (text === 'rejected') {
                                    color = 'grey'
                                }
                                return (<Tag color={color} key={text}>
                                    {text}
                                </Tag>);
                            }}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (

                               <Popover content={content} title="please chose your action">
                                <Button type="primary">Action</Button>
                            </Popover>
                             ) } />

                    </Table></div>
            );
        }

    
}
}
export default ContractTable