import 'antd/dist/antd.css';
import { Table, Space, Tag } from 'antd';
import ViewUser from './ViewUser'
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import { createUser, userInformation } from '../actions/UserAction'
import { connect } from 'react-redux'
import { UploadOutlined, FileOutlined, DeleteOutlined, UserOutlined, EditOutlined } from "@ant-design/icons"
import LoginPage from '../Login/LoginPage'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Column, ColumnGroup } = Table;


class UserList extends React.Component {
  constructor() {
    super();

    this.state = {
      openViewUser: false,

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
    if (this.state.openViewUser) {
      return (<ViewUser />);
    } else {
      var information = this.props.myLoginReducer.map((login, index) => {
        return (
          <div style={{height: "100vh"}}>
            <Header></Header>
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
              <Column title="Trạng thái" dataIndex="status" key="status"
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
                render={(text, record) => (
                  <Space size="middle">
                    <EditOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>Sửa</EditOutlined>
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
    onSubmit: (user) => {
      dispatch(createUser(user))
    }
  }
}
var mapStateToProps = state => {


  return {
    newUser: state.myUserReducer,
    myLoginReducer: state.myLoginReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)