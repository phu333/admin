
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import TabsChart from './TabsChart';
import 'ant-design-pro/dist/ant-design-pro.css';
import axios from 'axios'
import { ChartCard, yuan, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Row, Col, Tooltip,message } from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import numeral from 'numeral';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}
class ChartProfile extends React.Component {
    componentDidMount(){
        axios({
            url: '',
            method: "GET",
            
        })
            .then((response) => {
    
                return response.data;
            })
            .then((data) => {
    
                
    
            })
            .catch(error => {
    
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }
    
            });
    }
    render() {return(
        <Row>
            <Col span={8} style={{ marginTop: 24 }}>
                <ChartCard
                    title="Tổng doanh thu"
                    avatar={<UserOutlined style={{ width: 56, height: 56 }} />}

                    action={
                        <Tooltip title="thuyết minh">
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    }
                    total={() => <span dangerouslySetInnerHTML={{ __html: ('126560VNĐ') }} />}
                    footer={<Field label="Doanh thu tháng này" value={numeral(12423).format('0,0')} />}
                />
            </Col>
            <Col span={8} style={{ marginTop: 24 }}>
                <ChartCard
                    title="Lượng đơn hàng"
                    action={
                        <Tooltip title="thuyết minh">
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    }
                    total={numeral(8846).format('0,0')}
                    footer={<Field label="Đơn hàng tháng này" value={numeral(1234).format('0,0')} />}
                    contentHeight={46}
                >
                    <MiniBar height={46} data={visitData} />
                </ChartCard>
            </Col>
            <Col span={8} style={{ marginTop: 24 }}>
                <ChartCard
                    title="Hiệu quả"
                    action={
                        <Tooltip title="thuyết minh">
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    }
                    total="78%"
                    footer={
                        <div>
                            <span>
                                theo tháng
              <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                                    12%
              </Trend>
                            </span>
                            <span style={{ marginLeft: 16 }}>
                                theo tuần
              <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                                    11%
              </Trend>
                            </span>
                        </div>
                    }
                    contentHeight={46}
                >
                    <MiniProgress percent={78} strokeWidth={8} target={80} />
                </ChartCard>
            </Col><Col span={24} style={{ marginTop: 24 }}>
                <TabsChart />
            </Col>
        </Row >)
    }
} export default ChartProfile