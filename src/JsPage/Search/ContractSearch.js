import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Dropdown, Card, Radio } from 'antd';
import axios from 'axios'
import Form from "antd/lib/form/Form";
import { connect } from 'react-redux';
import { createContract } from '../actions/ContractAction';
const { Option } = Select;
const { RangePicker } = DatePicker;
class ContractSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            SearchBy: "all",
            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
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
        if (this.state.SearchBy === "SearchByContractId") {
            let contractSearchList = this.props.contractList.filter(contract => contract.contractNum.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(contractSearchList)
            this.props.onSubmit(contractSearchList)
        } else if (this.state.SearchBy === "SearchByContractTitle") {
            let contractSearchList = this.props.contractList.filter(contract => contract.contractTitle.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(contractSearchList)
            this.props.onSubmit(contractSearchList)
        } else if (this.state.SearchBy === "SearchByContractValue") {
            let contractSearchList = this.props.contractList.filter(contract => contract.contractValue == this.state.SearchValue)
            console.log(contractSearchList)
            this.props.onSubmit(contractSearchList)
        } else if (this.state.SearchBy === "SearchByContractCus") {
            let contractSearchList = this.props.contractList.filter(contract => contract.customer.companyName.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(contractSearchList)
            this.props.onSubmit(contractSearchList)
         }
       //  else if (this.state.SearchBy === "SearchActive") {
        //     let contractSearchList = this.props.contractList.filter(contract => contract.customer.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
        //     console.log(contractSearchList)
        //     this.props.onSubmit(contractSearchList) } 
        // else if (this.state.SearchBy === "SearchPending") {
        //     let contractSearchList = this.props.contractList.filter(contract => contract.statusAsString.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
        //     console.log(contractSearchList)
        //     this.props.onSubmit(contractSearchList)
        // } else if (this.state.SearchBy === "SearchWaiting") {
        //     let contractSearchList = this.props.contractList.filter(contract => contract.statusAsString.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
        //     console.log(contractSearchList)
        //     this.props.onSubmit(contractSearchList)
        // } else if (this.state.SearchBy === "SearchDeactive") {
        //     let contractSearchList = this.props.contractList.filter(contract => contract.statusAsString.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
        //     console.log(contractSearchList)
        //     this.props.onSubmit(contractSearchList)
        // } 
        else {
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
    onOk(value) {
        console.log('onOk: ', value);
    }
    onFinishFailed = (errorInfo) => {

    };

    render() {
        const radioStyle = {

        };
        const dropDown = (
            <Space direction="horizontal">
                <Card>
                    <Radio.Group onChange={this.handleChange} value={this.state.SearchBy}>
                        <Radio style={radioStyle} value={"SearchByContractId"}>
                            tìm kiếm bằng mã hợp đồng
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractTitle"}>
                            tìm kiếm theo tên hợp đồng
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractValue"}>
                            tìm kiếm theo giá trị hợp đồng
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractCus"}>
                            tìm kiếm theo đối tác
        </Radio>
                         <Radio style={radioStyle} value={"ShowAll"}>
                            tất cả
        </Radio> 

                    </Radio.Group>
                </Card>
                {/* <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractDuration"}>
                            tìm kiếm theo thời hạn
                        </Radio>
                        <Radio style={radioStyle} value={"1Month"}>
                            1 tháng
        </Radio>
                        <Radio style={radioStyle} value={"1Quarter"}>
                            1 quý
        </Radio>
                        <Radio style={radioStyle} value={"1Year"}>
                            1 năm
        </Radio> */}
                {/* <Radio style={radioStyle} value={"SearchByContractDeadline"}>
                            tìm kiếm theo ngày hết hạn
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractCreatedDate"}>
                            tìm kiếm theo ngày tạo
        </Radio> */}
                {/* </Radio.Group>
                </Card>                 <Card>
                    <Radio.Group onChange={this.handleChange} value={this.state.SearchBy}>
                         <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio> 
                        <Radio style={radioStyle} value={"SearchActive"}>
                            đang có hiệu lực
        </Radio>
                        <Radio style={radioStyle} value={"SearchPending"}>
                            đang chờ duyệt
        </Radio>
                        <Radio style={radioStyle} value={"SearchWaiting"}>
                            đang chờ ký
        </Radio>
                        <Radio style={radioStyle} value={"SearchDeactive"}>
                            hết hiệu lực
        </Radio>
                    </Radio.Group>
                </Card>*/}
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

                                {this.state.SearchBy === "SearchByContractId" ?
                                    <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                    </> : null}
                                {this.state.SearchBy === "SearchByContractTitle" ? <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                </> : null}
                                {this.state.SearchBy === "SearchByContractCus" ? <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                </> : null}

                                {this.state.SearchBy === "SearchByContractValue" ? <> <InputNumber
                                    onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                </> : null}
                                {/* {this.state.SearchBy === "SearchActive" ? <> <Input onInput={values => this.setState({ SearchValue: "Active" })} style={{ width: '300px',visibility:'hidden' }} />
                                </> : null}                                    
                                 {this.state.SearchBy === "SearchPending" ? <> <Input onInput={values => this.setState({ SearchValue: "Draft" })} style={{ width: '300px',visibility:'hidden' }} />
                                </> : null}                                    
                                 {this.state.SearchBy === "SearchWaiting" ? <> <Input onInput={values => this.setState({ SearchValue: "waiting for customer" })} style={{ width: '300px',visibility:'hidden' }} />
                                </> : null}
                                {this.state.SearchBy === "SearchDeactive" ? <> <Input onInput={values => this.setState({ SearchValue: "rejected" })} style={{ width: '0px',visibility:'hidden' }} />
                                </> : null} */}
                                {/* {this.state.secondSearchValue === "SearchByContractDuration" ? <><RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                />
                                </>
                                    : null}
                                {this.state.secondSearchValue === "SearchByContractDeadline" ? <>
                                    <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                </>
                                    : null}
                                {this.state.secondSearchValue === "SearchByContractCreatedDate" ? <>
                                    <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />

                                </>
                                    : null} */}
                                <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined style={{verticalAlign:'baseline'}} />} />
                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>

        );
    }
} var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(createContract(token))
        }
    }
}
export default connect(null, mapDispatchToProps)(ContractSearch);