import 'antd/dist/antd.css';
import { Table, Space, Tag,Button } from 'antd';
import UpdateCompanyProfile from './UpdateProfileCompany'
import React from 'react';
import ReactDOM from 'react-dom';
import ContractSearch from './ContractSearch'
import { createCompany, companyInformation } from '../actions/CompanyAction'
import { connect } from 'react-redux'
import { FileAddOutlined, FileOutlined, DeleteOutlined, UserOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import LoginPage from './LoginPage'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import CreateCompany from './CreateCompany'
const { Column, ColumnGroup } = Table;


class CompanyTable extends React.Component {
    constructor() {
        super();

        this.state = {
            openViewCom: false,
            openAddCom:false
        };


    }
    componentDidMount() {

        if (this.props.newUser.length === 0) {
            const contract1 = {

                name: 'John',
                email: "some email",
                address: '10 Downing Street',
                status: "deactive",
                company: "Some Company",
                role: "Some role",

            }
            const contract2 = {

                name: 'Mike',
                email: "some email",
                address: '10 Downing Street',
                status: "active",
                company: "Some Company",
                role: "Some role",

            }

            this.props.onSubmit(contract1)
            this.props.onSubmit(contract2)

        }

    }
    OpenViewUser() {
        this.setState({
            openViewUser: true,
        })
    }
    render() {
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/admin/companys" } />
                <Route exact path="/admin/companys" component={CompanyTable} />
            </Router>);
        } else {

            var information = this.props.myLoginReducer.map((login, index) => {
                return (
                    <div style={{ height: "100vh" }}>
                        <Space size="large">
                            <Button type="primary" icon={<FileAddOutlined />} onClick={()=>{
                                            this.setState({
                                                openAddCom : !this.state.openAddCom
                                            })
                                        }}>Thêm doanh nghiệp</Button>
                            
                        </Space>
                        <ContractSearch />
                        <Table dataSource={this.props.newUser}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >

                            <Column title="Tên" dataIndex="name" key="name" render={(text, record) => (

                                <b>{text}</b>

                            )} />
                            <Column title="email" dataIndex="email" key="email" render={(text, record) => (

                                <a>{text}</a>

                            )} />
                            <Column title="địa chỉ" dataIndex="address" key="address" render={(text, record) => (

                                <b>{text}</b>

                            )} />

                            <Column title="doanh nghiệp" dataIndex="company" key="company" render={(text, record) => (

                                <b>{text}</b>

                            )} />
                            <Column title="chức vụ" dataIndex="role" key="role" render={(text, record) => (

                                <b>{text}</b>

                            )} />
                            <Column title="trạng thái" dataIndex="status" key="status"
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
                                        {text.toUpperCase()}
                                    </Tag>);
                                }}
                            />

                            <Column
                                title="Xem chi tiết"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={()=>{
                                            this.setState({
                                                openViewCom : !this.state.openViewCom
                                            })
                                        }}>Sửa</EyeOutlined>
                                    </Space>
                                )}
                            />
                            <Column
                                title="Chức năng"
                                dataIndex="status"
                                key="status"
                                render={(text, record) => (
                                    <Space size="middle">
                                        {text === "active" ? <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>Vô hiệu hóa</DeleteOutlined> : null}
                                        {text === "deactive" ? <UserOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>kích hoạt</UserOutlined> : null}
                                    </Space>
                                )}
                            />
                        </Table></div>
                );
            })
            if (information.length === 0) {
                return (<LoginPage />);
            } else {
                return (<div> {information}</div >);
            }
        }
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (company) => {
            dispatch(createCompany(company))
        }
    }
}
var mapStateToProps = state => {


    return {
        newUser: state.myCompanyReducer,
        myLoginReducer: state.myLoginReducer
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyTable)