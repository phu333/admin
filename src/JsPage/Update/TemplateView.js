import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'

import { MailOutlined, PrinterOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BankOutlined, ContactsOutlined } from '@ant-design/icons';
import { Card, Button, Space, Checkbox, Descriptions, Select, Form, Input } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FormBuilder } from 'react-formio';

import 'reactjs-popup/dist/index.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;
class TemplateView extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        this.state = {
            contractContent: '<p class="ql-align-justify"><strong>Điều 1. Đối tượng của hợp đồng:</strong></p><p class="ql-align-justify">Theo yêu cầu của bên A về việc thực hiện hoạt động môi giới thương mại … (ghi rõ các nội dung hoạt động môi giới thương mại, như: làm trung gian cho các bên mua bán hàng hoá, cung ứng dịch vụ trong việc đàm phán, giao kết hợp đồng mua bán hàng hoá, dịch vụ, …), bên B đảm nhận và thực hiện …</p><p class="ql-align-justify">(Đối tượng của hợp đồng môi giới thương mại là công việc có thể thực hiện được, không vi phạm điều cấm của luật, không trái đạo đức xã hội).</p><p class="ql-align-justify"><strong>Điều 2. Thời hạn thực hiện hợp đồng:</strong></p><p class="ql-align-justify">Hợp đồng này được thực hiện kể từ ngày … / …/ …</p><p class="ql-align-justify">Thời gian dự kiến hoàn thành: là … ngày, kể từ ngày …/ …/ … đến hết ngày ngày …/ …/ …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận thời hạn cụ thể và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 3. Nghĩa vụ và quyền của bên A:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên A:</strong></p><p class="ql-align-justify">a) Cung cấp các thông tin, tài liệu, phương tiện cần thiết liên quan đến hàng hoá, dịch vụ;</p><p class="ql-align-justify">b) Trả thù lao môi giới và các chi phí hợp lý khác cho bên môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên A:</strong></p><p class="ql-align-justify">Yêu cầu bên B thực hiện hoạt động môi giới thương mại theo đúng các nội dung đã thỏa thuận tại Điều 1 của hợp đồng này.</p><p class="ql-align-justify">Trường hợp bên B vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này, thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 4. Nghĩa vụ và quyền của bên B:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên B:</strong></p><p class="ql-align-justify">Bảo quản các mẫu hàng hoá, tài liệu được giao để thực hiện việc môi giới và phải hoàn trả cho bên được môi giới sau khi hoàn thành việc môi giới;</p><p class="ql-align-justify">Không được tiết lộ, cung cấp thông tin làm phương hại đến lợi ích của bên được môi giới;</p><p class="ql-align-justify">Chịu trách nhiệm về tư cách pháp lý của các bên được môi giới, nhưng không chịu trách nhiệm về khả năng thanh toán của họ;</p><p class="ql-align-justify">Không được tham gia thực hiện hợp đồng giữa các bên được môi giới, trừ trường hợp có uỷ quyền của bên được môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên B:</strong></p><p class="ql-align-justify">Yêu cầu bên A cung cấp thông tin, tài liệu và phương tiện để thực hiện công việc.</p><p class="ql-align-justify">Được tiến hành các nghiệp vụ trung gian môi giới thương mai, như: … (tuỳ theo từng nội dung hoạt động môi giới thương mại quy định tại Điều 1 của hợp đồng này).</p><p class="ql-align-justify">Yêu cầu bên A trả tiền thù lao môi giới theo quy định tại Điều 5 của hợp đồng này.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 5. Tiền thù lao môi giới và phương thức thanh toán:</strong></p><p class="ql-align-justify">1. Tiền thù lao môi giới: Thực hiện công việc tại Điều 1 là: … đồng (Bằng chữ: …), đã bao gồm … % tiền thuế giá trị gia tăng.</p><p class="ql-align-justify">2. Phương thức thanh toán: …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận cụ thể về phương thức thanh toán và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 6. Chi phí khác:</strong></p><p class="ql-align-justify">Bên A phải thanh toán các chi phí phát sinh hợp lý liên quan đến việc môi giới, kể cả khi việc môi giới không mang lại kết quả cho bên A.</p><p class="ql-align-justify">Chi phí khác hai bên thỏa thuận bổ sung nếu xét thấy cần thiết và đúng quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 7. Đơn phương chấm dứt thực hiện hợp đồng:</strong></p><p class="ql-align-justify">1. Trường hợp việc tiếp tục thực hiện hoạt động môi giới thương mại hoặc công việc không có lợi cho bên A thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng, nhưng phải báo cho bên B biết trước … ngày. Bên A phải trả tiền thù lao môi giới theo phần hoạt động môi giới thương mại hoặc công việc mà bên B đã thực hiện và bồi thường thiệt hại (theo thoả thuận nếu có).</p><p class="ql-align-justify">2. Trường hợp bên A vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này thì bên B có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify"><strong>Điều 8. Phương thực giải quyết tranh chấp:</strong></p><p class="ql-align-justify">Trong quá trình thực hiện hợp đồng, nếu có vấn đề phát sinh cần giải quyết, thì hai bên tiến hành thỏa thuận và thống nhất giải quyết kịp thời, hợp tình và hợp lý. Trường hợp không thỏa thuận được thì một trong các bên có quyền khởi kiện tại tòa án có thẩm quyền giải quyết vụ việc theo quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 9. Các thoả thuận khác:</strong></p><p class="ql-align-justify">Bên A và bên B đồng ý đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết hợp đồng này.</p><p class="ql-align-justify">Bên A và bên B đồng ý thực hiện theo đúng các điều khoản trong hợp đồng này và không nêu thêm điều kiện gì khác.</p><p class="ql-align-justify">Hợp đồng này được lập thành … bản, mỗi bản gồm … trang, có giá trị pháp lý như nhau và được giao cho bên A … bản, bên B … bản./.</p><p><br></p>',

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.rteChange = this.rteChange.bind(this);

    }
    // handleEditorChange(e) {
    //     console.log('Content was updated:', e.target.getContent());
    //     this.setState({ content: e.target.getContent() });
    // }
    // onEditorStateChange(editorState) {
    //     console.log(editorState)
    //     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    //     this.setState({
    //         editorState: editorState,
    //     });
    // };
    rteChange = (value) => {
        console.log(value); // HTML/rich text
        this.setState({
            contractContent: value
        })

    }
    onFinish = (values) => {


    };
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        // const content = <p>This is the initial content of the editor</p>;

        // const EDITOR_JS_TOOLS = {
        //     embed: Embed,
        //     table: Table,

        //     list: List,
        //     warning: Warning,
        //     Paragraph: Paragraph,
        //     linkTool: LinkTool,


        //     header: Header,



        // };


        return (
            <div style={{ fontSize: 14 }} >
                <Button type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
      </Button>

                <Space direction="vertical" align="center" >
                    <Input placeholder="tên template" />
                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                        <Card bordered={false}>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                            <br />
                            <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>Hợp đồng.......</h2>
                            <h6 style={{ textAlign: 'center', fontSize: 14, fontWeight: "bold" }}>Số.../...</h6>
                            <h6 style={{ fontSize: 14, fontWeight: "bold" }}>Hôm nay, ngày...tháng...năm....,
                            tại........, chúng tôi gồm
                            </h6>

                        </Card>

                        <Card bordered={false}>
                            <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Số Fax:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Năm sinh:"}</b>)} span={2}>
                                    ....
                                </Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                    ........làm đại diện
                                </Descriptions.Item>


                            </Descriptions>


                            <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                            >

                                <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Số Fax:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Năm sinh:"}</b>)} span={2}>
                                    ....
                                </Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                    ........làm đại diện
                </Descriptions.Item>


                            </Descriptions>
                        </Card>
                    </Space>

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                        <JoditEditor

                            value={this.state.contractContent}
                            config={config}
                            tabIndex={1} // tabIndex of textarea

                            onChange={this.rteChange}
                        />
                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                            <Card bordered={false}>

                                <Form

                                    name="basic"
                                    className="lcontract-form"

                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}

                                >

                                    <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày ... tháng ... năm .... đến
                                    ngày ... tháng ... năm ....
                            </h6>
                                    <Space size="large">

                                        <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Tạo
                                                    </Button>

                                        <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Lưu
                                                    </Button>


                                    </Space>
                                </Form>

                            </Card>
                        </Space>
                    </Space>

                </Space>
            </div>
        );


    }
}

var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(TemplateView)