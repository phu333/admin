import axios from 'axios'
import { Table, Space, Button, message } from 'antd';
import CreateContract from '../Add/CreateContract';
import React from 'react';
import ContractTypeSearch from '../Search/ContractTypeSearch'
import ContractTable from '../views/ContractTable'
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import JoditEditor from "jodit-react";
import FadeIn from 'react-fade-in'
const { Column } = Table;
const dataSource = [
    {
        key: '1',
        contract_type: 'Hop dong lao dong',

        fileName: 'template1.dot',
    },
    {
        key: '2',
        contract_type: 'Hop dong lao dong',

        fileName: 'template1.dot',
    },
];


class ChooseContractTemplate extends React.Component {
    constructor() {
        super();

        this.state = {
            showTemplateCreate: false,
            template:{},
            finish: false,
            templateList:[]
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            showTemplateCreate: true,
            template:value,
        })
        console.log(this.state.template)
    }
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    componentDidMount(){
        axios({
            url: '/api/v1/ContractType',
            method: "GET",
            headers: {
              Authorization: 'Bearer ' + this.props.token,
      
            }
        })
            .then((response) => {
    
                return response.data;
            })
            .then((data) => {
    
                this.setState({
                  templateList:data.data
                })
    
            })
            .catch(error => {
    
               
            });
    }
    render() {
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar:false
        }
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/admin/contract"} />
                <Route exact path="/admin/contract" render={() => <ContractTable token={this.props.token} role={this.props.role} />
                } /></Router>);
        } else {
            if (this.state.showTemplateCreate) {
                return (
                    <Router>
                        <Redirect push to={"/admin/createContract"} />
                        <Route exact path="/admin/createContract" render={() => <CreateContract template={this.state.template} token={this.props.token} role={this.props.role} />
                        } /></Router>

                );
            } else {
                return (
                    <div style={{ height: "100vh" }}>
                        <Button type="primary" value="cancel" onClick={this.Cancel}>
                            Trở về
                    </Button>
                        <ContractTypeSearch /><FadeIn>
                        <Table dataSource={this.state.templateList} >
                        <Column title="Stt" dataIndex="id" key="id" />
                            <Column title="loại hợp đồng" dataIndex="name" key="name" />
                            
                            

                            <Column
                                title="Xem trước"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Popup trigger={<Button type="primary" icon={<FileOutlined />} >Xem trước</Button>} position="right center">
                                            <JoditEditor

                                                value={text.content}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea


                                            />
                                        </Popup>

                                    </Space>
                                )}
                            />
                            <Column
                                title="Chọn hợp đồng"
                                key="action"
                                fixed="right"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button type="primary" icon={<FileOutlined />} onClick={()=>{
                                            this.setState({
                                                showTemplateCreate: true,
                                                template:text,
                                            })
                                            console.log(this.state.template)
                                        }}>Tạo hợp đồng với mẫu này</Button>
                                    </Space>
                                )}
                            />
                        </Table></FadeIn></div>
                );
            }

        }
    }
}
export default ChooseContractTemplate