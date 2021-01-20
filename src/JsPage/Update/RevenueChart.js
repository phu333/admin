import React from 'react';
import { Line,Pie,Column } from '@ant-design/charts';
import { Space, Card } from 'antd';
import ChartProfile from '../Login/ChartProfile'
const Chart = (props) => {
  const date = [
    { Date: '1/01/2020', Revenue: 3 },
    { Date: '2/02/2020', Revenue: 4 },
    { Date: '3/032020', Revenue: 3.5 },
    { Date: '4/04/2020', Revenue: 5 },
    { Date: '12/05/2020', Revenue: 4.9 },
    { Date: '6/06/2020', Revenue: 6 },
    { Date: '8/08/2020', Revenue: 7 },
    { Date: '9/09/2020', Revenue: 9 },
    { Date: '10/10/2020', Revenue: 13 },
  ];
  const month = [
    { Date: '01', Revenue: 3 },
    { Date: '02', Revenue: 4 },
    { Date: '03', Revenue: 3.5 },
    { Date: '04', Revenue: 5 },
    { Date: '05', Revenue: 4.9 },
    { Date: '06', Revenue: 6 },
    { Date: '07', Revenue: 7 },
    { Date: '8', Revenue: 9 },
    { Date: '9', Revenue: 13 },
    { Date: '10', Revenue: 11 },
    { Date: '11', Revenue: 12 },
    { Date: '12', Revenue: 13 },
  ];
  const year = [
    { Date: '2015', Revenue: 4 },
    { Date: '2016', Revenue: 5 },
    { Date: '2017', Revenue: 6 },
    { Date: '2018', Revenue: 9 },
    { Date: '2019', Revenue: 10 },
    { Date: '2020', Revenue: 5 },
  ];
  let data = [{}];
  if (props.ChartType == "year") {
    data = year
  } else if (props.ChartType == "month") {
    data = month
  } else { data = date }


  const config = {
    data:date,
    height: 400,
    xField: 'Date',
    yField: 'Revenue',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
  return (<ChartProfile/>
    // <Space>
    //   <Card style={{width:400}} >


    //     <Line {...config} />
    //   </Card>
    //   <Card style={{width:400}} >


    //     <Line {...config} />
    //   </Card>
    //   <Card style={{width:400}} >


    //     <Line {...config} />
    //   </Card>
    // </Space>
  );
};
export default Chart;