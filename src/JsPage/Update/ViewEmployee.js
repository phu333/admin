import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation, updateEmployee } from '../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Space, Card, Button, Form, message, Switch, Col, Row } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined, ReloadOutlined
} from '@ant-design/icons';
import EmployeeTable from '../views/EmployeeTable'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import "../Column.css"
import axios from 'axios'
import { getKeyThenIncreaseKey } from 'antd/lib/message';
const style = {  border: '5px solid rgb(8, 59, 102)', padding: '8px 10px' };

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 12,
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 2,
        span: 10,
    },
};
class ViewEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            finish: false,
            EmployeeReciceve: [],
            currentPermission: this.props.employee.permissions,
            permissionsReciceve: [
                // {
                //     name: "signPermission",
                //     lable: "Quyền ký",
                // },
                // {
                //     name: "contractManagePermision",
                //     lable: "Quyền quản lý hợp đồng",
                // },
                // {
                //     name: "customerManagePermission",
                //     lable: "Quyền quản lý khách hàng",
                // },
                // {
                //     name: "contractTypeManagePermission",
                //     lable: "Quyền quản lý loại hợp đổng",
                // },
                // {
                //     name: "employeeManagePermission",
                //     lable: "Quyền quản lý nhân viên",
                // },
                // {
                //     name: "signatureManagePermission",
                //     lable: "Quyền quản lý chữ ký",
                // },
                // {
                //     name: "editCompanyInformationPermission",
                //     lable: "Quyền chỉnh sửa thông tin doanh nghiệp",
                // },

            ]
        };


        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);
        // this.setState({
        //     isEdit: false
        // })



    };
    handleChange(index, info) {
        if (info == false) { info = true }
        else { info = false }
        let permission = {
            userId: this.props.employee.id,

            permissionId: index,
            enabled: info
        }
        console.log(permission)
        axios({
            url: '/api/Account/permission',
            data: permission,
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
                message.success("quyền đã được cập nhật")

            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

            });

    }
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };

    render() {
        // var currentPermissions = this.props.employee.permissionList.map((permisssion) => {
        //     return (
        //         <List.Item>{permisssion}</List.Item>
        //     )
        // })
        var permissionsT = this.state.currentPermission.map((permisssion) => {
            return (
                <Col span={10}><div style={style}><strong>
                    {permisssion.permissionName==="UpdateCompany"?"Quyền Cập nhật thông tin công ty":null}
                    {permisssion.permissionName==="AddCustomer"?"Quyền thêm khách hàng":null}
                    {permisssion.permissionName==="Sign"?"Quyền ký":null}
                    {permisssion.permissionName==="GetContractList(ByCompanyId)"?"Xem thông tin hợp đồng bằng Id công ty":null}
                    {permisssion.permissionName==="GetContractList"?"Quyền coi thông tin hợp đồng":null}
                    {permisssion.permissionName==="ActiveDeactiveContract"?"Quyền cập nhật trạng thái hợp đồng":null}
                    {permisssion.permissionName==="UpdateContract"?"Quyền cập nhật hợp đồng":null}
                    {permisssion.permissionName==="CreateContract"?"Quyền tạo hợp đồng":null}
                    {permisssion.permissionName==="GetAllCompanyTemplate(ByCompanyId)"?"Xem loại hợp đồng đã lưu với Id công ty":null}
                    {permisssion.permissionName==="GetAllCompanyTemplate"?"Quyền lấy tất cả danh sách loại hợp đồng":null}
                    {permisssion.permissionName==="ActiveDeactiveTemplate"?"Quyền cập nhật trạng thái loại hợp đồng":null}
                    {permisssion.permissionName==="UpdateTemplate"?"Quyền cập nhật loại hợp đồng":null}
                    {permisssion.permissionName==="UpdateCustomer"?"Quyền Cập nhật thông tin khách":null}
                    {permisssion.permissionName==="CreateTemplate"?"Quyền tạo loại hợp đồng":null}
                    {permisssion.permissionName==="GetCompanyAdminList(ByRole)"?"Xem thông tin admin bằng chức danh":null}
                    {permisssion.permissionName==="GetCompanyAdminList"?"Quyển coi thông tin admin":null}
                    {permisssion.permissionName==="ActiveDeactiveAccount"?"Quyền cập nhật trạng thái tài khoản":null}
                    {permisssion.permissionName==="GetCompanyAccountListByCompanyId"?"Quyền coi tài khoản công ty":null}
                    {permisssion.permissionName==="UpdateAccountPermission"?"Quyền cập nhật tài khoản công ty":null}
                    {permisssion.permissionName==="CreateAccount"?"Quyền tạo tài khoản của công ty":null}
                    {permisssion.permissionName==="ActiveDeactiveSignature"?"Quyền cập nhật trạng thái chữ ký":null}
                    {permisssion.permissionName==="UpdateSignature"?"Quyền cập nhật thông tin chữ ký":null}
                    {permisssion.permissionName==="CreateSignature"?"Quyền tạo chữ ký":null}
                    {permisssion.permissionName==="GetAllCompanyList"?"Quyền lấy tất cả thông tin công ty":null}
                    {permisssion.permissionName==="GetAllCompanyAccount(ByCompanyId)"?" Quyền lấy tài khoản công ty bằng Id công ty":null}
                    {permisssion.permissionName==="GetAllCompanyAccount"?"Quyền lấy tất cả tài khoản công ty":null}
                    {permisssion.permissionName==="ActiveDeactiveCustomer"?"Quyền cập nhật trạng thái khách":null}

                </strong>:
                    {this.props.employee.permissions.some(item => permisssion.enabled === true) ?//hàm lấy permission
                        <div style={{ float: 'right' }}><Switch style={{ fontSize: '30px' }} onChange={() => this.handleChange(permisssion.permissionId, permisssion.enabled)} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked /></div>
                        :
                        <div  style={{ float: 'right' }}><Switch style={{ fontSize: '30px' }} onChange={() => this.handleChange(permisssion.permissionId, permisssion.enabled)} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultunChecked /></div>
                    }
                </div></Col>)
        })
        {/* <Button type="primary" onClick={() => {
                        this.setState({
                            currentPermission: [...this.state.currentPermission, permisssion.name]
                        })
                        const contract2 = {
                            id: "A2",
                            name: 'John wasdzxczxc',
                            email: "some email",
                            address: '10 Downing Street',
                            status: "deactive",
                            role: "secrectery",
                            phone: 123123123,
                            permissionList: this.state.currentPermission,
                        }
                        this.props.onSubmit(contract2)
                    }} className="employee-form">
                        {permisssion.lable}
                    </Button> */}

        var Viewpermission = this.state.currentPermission.map((permisssion) => {
            return (
                <Col span={6}><div style={style}><strong>
                    {permisssion.permissionName==="UpdateCompany"?"Quyền Cập nhật thông tin công ty":null}
                    {permisssion.permissionName==="AddCustomer"?"Quyền thêm khách hàng":null}
                    {permisssion.permissionName==="Sign"?"Quyền ký":null}
                    {permisssion.permissionName==="GetContractList(ByCompanyId)"?"Xem thông tin hợp đồng bằng Id công ty":null}
                    {permisssion.permissionName==="GetContractList"?"Quyền coi thông tin hợp đồng":null}
                    {permisssion.permissionName==="ActiveDeactiveContract"?"Quyền cập nhật trạng thái hợp đồng":null}
                    {permisssion.permissionName==="UpdateContract"?"Quyền cập nhật hợp đồng":null}
                    {permisssion.permissionName==="CreateContract"?"Quyền tạo hợp đồng":null}
                    {permisssion.permissionName==="GetAllCompanyTemplate(ByCompanyId)"?"Xem loại hợp đồng đã lưu với Id công ty":null}
                    {permisssion.permissionName==="GetAllCompanyTemplate"?"Quyền lấy tất cả danh sách loại hợp đồng":null}
                    {permisssion.permissionName==="ActiveDeactiveTemplate"?"Quyền cập nhật trạng thái loại hợp đồng":null}
                    {permisssion.permissionName==="UpdateTemplate"?"Quyền cập nhật loại hợp đồng":null}
                    {permisssion.permissionName==="UpdateCustomer"?"Quyền Cập nhật thông tin khách":null}
                    {permisssion.permissionName==="CreateTemplate"?"Quyền tạo loại hợp đồng":null}
                    {permisssion.permissionName==="GetCompanyAdminList(ByRole)"?"Xem thông tin admin bằng chức danh":null}
                    {permisssion.permissionName==="GetCompanyAdminList"?"Quyển coi thông tin admin":null}
                    {permisssion.permissionName==="ActiveDeactiveAccount"?"Quyền cập nhật trạng thái tài khoản":null}
                    {permisssion.permissionName==="GetCompanyAccountListByCompanyId"?"Quyền coi tài khoản công ty":null}
                    {permisssion.permissionName==="UpdateAccountPermission"?"Quyền cập nhật tài khoản công ty":null}
                    {permisssion.permissionName==="CreateAccount"?"Quyền tạo tài khoản của công ty":null}
                    {permisssion.permissionName==="ActiveDeactiveSignature"?"Quyền cập nhật trạng thái chữ ký":null}
                    {permisssion.permissionName==="UpdateSignature"?"Quyền cập nhật thông tin chữ ký":null}
                    {permisssion.permissionName==="CreateSignature"?"Quyền tạo chữ ký":null}
                    {permisssion.permissionName==="GetAllCompanyList"?"Quyền lấy tất cả thông tin công ty":null}
                    {permisssion.permissionName==="GetAllCompanyAccount(ByCompanyId)"?" Quyền lấy tài khoản công ty bằng Id công ty":null}
                    {permisssion.permissionName==="GetAllCompanyAccount"?"Quyền lấy tất cả tài khoản công ty":null}
                    {permisssion.permissionName==="ActiveDeactiveCustomer"?"Quyền cập nhật trạng thái khách":null}
                    </strong>:
                    {this.props.employee.permissions.some(item => permisssion.enabled === true) ?//hàm lấy permission
                        <div style={{ float: 'right' }}>Có quyền sử dụng</div>
                        :
                        <div style={{ float: 'right' }}>Không có quyền sử dụng</div>
                    }


                </div></Col>)
        })
        var information = this.props.myLoginReducer.map((login, index) => {
            return (<Space>
                 {
                    login.UpdateAccountPermission === true ?<Row  gutter={[16, 24]}>{permissionsT}</Row>
                        : <Row  gutter={[16, 24]}>{Viewpermission}</Row>
                }</Space>)
        })
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/admin/employee"} />
                <Route exact path="/admin/employee" render={() => <EmployeeTable  token={this.props.token} role={this.props.role} />} /></Router>);
        } else {
            return (

                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
          </Button>
                    <h2 style={{ textAlign: 'center' }}> Quyền hạn của nhân viên</h2>
                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >
                    
                        {information}
                        </Form>
                        {/* <List
                            size="large"
                            header={<div>danh sách quyền hiện tại</div>}
                            footer={<div></div>}
                            bordered
                        >{currentPermissions}</List> */}








                </Card >
            );
        }

    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(updateEmployee(token))
        }
    }
}
var mapStateToProps = state => {

    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);