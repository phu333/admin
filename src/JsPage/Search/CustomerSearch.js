import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Form, Input, PageHeader, Radio, Select, Space } from 'antd';
import axios from 'axios';
import React from "react";
import { connect } from 'react-redux';
import { createCustomer } from '../actions/CustomerAction';
const { Option } = Select;
class CustomerSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            SearchBy: "all",
            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
            SearchValue: "",
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            SearchBy: value.target.value
        })
    }
    onFinish = (values) => {
        console.log(this.state.SearchValue)
        if (this.state.SearchBy === "SearchByCompanyName") {
            let custometSearchList = this.props.customerList.filter(customer => customer.name.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        } else if (this.state.SearchBy === "SearchByTaxCode") {
            let custometSearchList = this.props.customerList.filter(customer => customer.taxCode.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        } else {
            axios({
                url: '/api/v1/Customer',
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + this.props.token,

                }
            })
                .then((response) => {

                    return response.data;
                })
                .then((data) => {


                    this.props.onSubmit(data.data)


                })
                .catch(error => {

                });
        }

    };
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    onFinishFailed = (errorInfo) => {

    };
    onChangeFirstSearchValue = e => {
        this.setState({
            firstSearchValue: e.target.value
        })
    }
    onChangeSecondSearchValue = e => {
        this.setState({
            secondSearchValue: e.target.value
        })
    }
    onChangeThirdSearchValue = e => {
        this.setState({
            thirdSearchValue: e.target.value
        })
    }

    render() {
        const radioStyle = {

        };
        const dropDown = (
            <Space direction="horizontal">
                <Card>
                    <Radio.Group onChange={this.handleChange} value={this.state.SearchBy}>
                        
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
        </Radio>
        <Radio style={radioStyle} value={"SearchByCompanyName"}>
                            tìm kiếm tên doanh nghiệp
        </Radio>
                        <Radio style={radioStyle} value={"SearchByTaxCode"}>
                            tìm kiếm mã số thuế
        </Radio>

                    </Radio.Group>
                </Card>
                {/* <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>

                        <Radio style={radioStyle} value={"SearchByName"}>
                            tìm kiếm bằng tên
        </Radio>

                    </Radio.Group>
                </Card> */}

            </Space>
        )
        return (
            <div className="container">


                <PageHeader
                    className="site-page-header"

                    title={[<Space size="large">



                    </Space>]}
                    extra={[

                        <Form
                            name="basic"
                            className="search-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}>
                            <Space size="large">
                                <Dropdown overlay={dropDown} placement="bottomCenter" arrow>
                                    <Button icon={<MenuOutlined />}>Tìm kiếm bằng</Button>
                                </Dropdown>

                                {/* <Form.Item name="Search"> */}
                                    {this.state.SearchBy === "SearchByCompanyName" ? <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                    </> : null}
                                    {this.state.SearchBy === "SearchByTaxCode" ?
                                        <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                        </>
                                        : null}
                                {/* </Form.Item> */}
                                <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined style={{verticalAlign:'baseline'}} />} />


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>

        );
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(createCustomer(token))
        }
    }
}
export default connect(null, mapDispatchToProps)(CustomerSearch);