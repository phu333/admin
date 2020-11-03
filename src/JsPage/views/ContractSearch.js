import React from "react";
import { SearchOutlined,MenuOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Dropdown, Card, Radio } from 'antd';

import Form from "antd/lib/form/Form";
const { Option } = Select;
const { RangePicker } = DatePicker;
class ContractSearch extends React.Component {
    constructor() {
        super();

        this.state = {


            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            SearchBy: value
        })
    }
    onFinish = (values) => {
        console.log(values)


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
                    <Radio.Group onChange={this.onChangeFirstSearchValue} value={this.state.firstSearchValue}>
                        <Radio style={radioStyle} value={"SearchByContractId"}>
                            tìm kiếm bằng số doanh nghiệp
        </Radio>
                        <Radio style={radioStyle} value={"SearchByCustomerTaxCode"}>
                            tìm kiếm theo mã số thuế
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractValue"}>
                            tìm kiếm theo tên doanh nghiệp
        </Radio>

                        <Radio style={radioStyle} value={"all"}>
                            tất cả
        </Radio>

                    </Radio.Group>
                </Card>
                <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractDuration"}>
                            tìm kiếm theo thời hạn
                        </Radio>
                        
                        <Radio style={radioStyle} value={"SearchByContractDeadline"}>
                            tìm kiếm theo ngày hết hạn
        </Radio>
                        <Radio style={radioStyle} value={"SearchByContractCreatedDate"}>
                            tìm kiếm theo ngày tạo
        </Radio>
                    </Radio.Group>
                </Card>
                <Card>
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
                </Card>
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

                                {this.state.firstSearchValue === "SearchByContractId" ?
                                    <> <Input name="searchValue" />
                                    </>
                                    : null}
                                {this.state.firstSearchValue === "SearchByCustomerTaxCode" ? <> <Input name="searchValue" />
                                </> : null}
                                {this.state.firstSearchValue === "SearchByContractValue" ? <> <InputNumber

                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                />
                                </>
                                    : null}
                                {this.state.secondSearchValue === "SearchByContractDuration" ? <><RangePicker
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
                                    : null}
                                <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} />
                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>

        );
    }
}
export default ContractSearch;