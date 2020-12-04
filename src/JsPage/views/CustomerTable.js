import 'antd/dist/antd.css';
import { Table, Space,Button,Popover } from 'antd';
import AddCustomer from './AddCustomer'
import ViewCustomer from './ViewCustomer'
import React from 'react';
import './Column.css'
import { UserOutlined } from '@ant-design/icons';

const { Column } = Table;

const dataSource = []
for (var i = 0; i < 1000; i++) {
  if (i % 2 == 0) {
    const contract = {
      key: i,
      name: 'Mike',
      company: "cty 369",
      address: '10 Downing Street',
      color: "#fff"
    }
    dataSource.push(contract)
  } else {
    const contract = {
      key: i,
      name: 'John',
      company: "cty 369",
      address: '10 Downing Street',
      color: "#ddd"
    }
    dataSource.push(contract)
  }


}
class CustomerList extends React.Component {
  constructor() {
    super();

    this.state = {
      openCustomer: "",

    };

    this.OpenAddCustomer = this.OpenAddCustomer.bind(this);
    this.OpenViewCustomer = this.OpenViewCustomer.bind(this);

  }
  OpenAddCustomer() {
    this.setState({
      openCustomer: "openAddCustomer",

    })
  }
  OpenViewCustomer() {
    this.setState({
      openCustomer: "openViewCustomer",
    })
  }
  render() {
    const content = (
      <div>
        <button onClick={this.OpenViewCustomer}>Sửa</button>
        <button onClick={this.OpenViewCustomer}>Vô hiệu hóa</button>
      </div>
    );
    if (this.state.openCustomer === "openAddCustomer") {
      return (
        <AddCustomer />
      );
    } else if (this.state.openCustomer === "openViewCustomer") {
      return (<ViewCustomer />);

    }
    else {
      return (
        <div><button onClick={this.OpenAddCustomer}>Tạo khách hàng mới</button>
          <Table dataSource={dataSource}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >


            <Column title="Người đại diện" dataIndex="name" key="name" render={(text => <a><UserOutlined /> {text}</a>)} />
            <Column title="Địa chỉ" dataIndex="address" key="address"  />
            <Column title="Tên doanh nghiệp" dataIndex="company" key="company" />

            <Column
              title="Chức năng"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Popover content={content} title="Xin hãy chọn chức năng" trigger="click">
                    <Button type="primary">...</Button>
                  </Popover>

                </Space>
              )}
            /></Table></div>
      );
    }

  }
}
export default CustomerList