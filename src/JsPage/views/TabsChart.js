import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tabs, List, Typography,Row, Col} from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';

const { TabPane } = Tabs;
const salesMonth = [];
for (let i = 0; i < 12; i += 1) {
  salesMonth.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const salesYear = [];
for (let i = 2015; i < 2020; i += 1) {
  salesYear.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const data = [
  {
    title: '1',
    content: "content"
  },
  {
    title: '2',
    content: "content"
  },
  {
    title: '3',
    content: "content"
  },
  {
    title: '4',
    content: "content"
  },
  {
    title: '5',
    content: "content"
  },
  {
    title: '6',
    content: "content"
  },
];

class TabsChart extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "white", paddingRight: "-10px" }}>
        
          < Tabs defaultActiveKey="1" >
            <TabPane tab=" doanh thu theo tháng" key="1">
            <Row>
              <Col span={18}>
                <Bar height={200} title=" doanh thu theo tháng" data={salesMonth} />
              </Col>
              <Col span={6}>
                <List
                  header={<div>Khách hàng của tháng</div>}
                  bordered
                  dataSource={data}
                  renderItem={item => <List.Item>{item.title} {item.content}</List.Item>

                  }
                /></Col></Row>
            </TabPane>
            <TabPane tab=" doanh thu theo năm" key="2">
              <Row>
              <Col span={18}>
                <Bar height={200} title=" doanh thu theo năm" data={salesYear} />
              </Col>             <Col span={6}>
                <List
                  header={<div>Khách hàng của năm</div>}
                  bordered
                  dataSource={data}
                  renderItem={item =><List.Item>{item.title} {item.content}</List.Item>/* {
                    (() => {
                      if (item.title == "1" || item.title == "2" || item.title == "3") {
                        return (<List.Item><Typography.Text mark>{item.title}</Typography.Text>{item.content}</List.Item>)
                      } else { return (<List.Item>{item.title} {item.content}</List.Item>) }
                    }
                    )(<List.Item>{item.title} {item.content}</List.Item>)}*/
                  }
                /></Col></Row>
            </TabPane>
          </Tabs ></div>)
  }
}

export default TabsChart