import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select,Form, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Dropdown, Card, Radio } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSignature } from '../actions/SignatureAction';
const { RangePicker } = DatePicker;
class SignatureSearch extends React.Component {
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
        if (this.state.SearchBy === "SearchByProvider") {
            let SignatureSearchList = this.props.SignatureList.filter(Signature => Signature.provider.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(SignatureSearchList)
            this.props.onSubmit(SignatureSearchList)
        } else if (this.state.SearchBy === "SearchBySerial") {
            let SignatureSearchList = this.props.SignatureList.filter(Signature => Signature.Serial.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(SignatureSearchList)
            this.props.onSubmit(SignatureSearchList)
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
                        <Radio style={radioStyle} value={"SearchByProvider"}>
                            tìm kiếm nhà cung cấp
        </Radio>
                        <Radio style={radioStyle} value={"SearchBySerial"}>
                            Số serial
        </Radio>



                    </Radio.Group>
                </Card>
                {/* <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>

                        <Radio style={radioStyle} value={"SearchByGivenDate"}>
                            Ngày cấp
        </Radio>
                        <Radio style={radioStyle} value={"SearchByDeadline"}>
                            Ngày hết hạn
        </Radio>
                        <Radio style={radioStyle} value={"SearchInAPeriod"}>
                            Trong khoản thời gian
        </Radio>
                    </Radio.Group>
                </Card> */}
                {/* <Card>
                    <Radio.Group onChange={this.onChangeThirdSearchValue} value={this.state.thirdSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>
                        <Radio style={radioStyle} value={"active"}>
                            đang có hiệu lực
        </Radio>

                        <Radio style={radioStyle} value={"deactive"}>
                            hết hiệu lực
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


                                {this.state.SearchBy === "SearchByProvider" ? <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                    </> : null}
                                {this.state.SearchBy === "SearchBySerial" ?
                                   <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                   </> : null}
                                {this.state.SearchBy === "SearchByGivenDate" ? <> 
                                <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                </> : null}
                                {this.state.secondSearchValue === "SearchByDeadline" ?
                                    <> <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                    </>
                                    : null}
                                {this.state.secondSearchValue === "SearchInAPeriod" ? <> <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                />
                                </> : null}
                                
                                <Button  type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined style={{verticalAlign:'baseline'}} />} />


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>);
    }
}var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(createSignature(token))
        }
    }
}
export default connect(null, mapDispatchToProps)( SignatureSearch);